import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { sectionId } from './sectionId';
import styles from './CaseStudy.module.css';

/**
 * Sticky outline for a case study, derived from the blocks array rather than
 * authored separately — every `type: section` / `type: subsection` becomes an
 * entry, so renaming a heading in index.md renames its nav entry too.
 *
 * Sections are always listed; a section's subsections are revealed only while
 * that section is active, which keeps the rail short on long studies.
 * Hidden below the desktop breakpoint (see .outlineNav in CaseStudy.module.css).
 *
 * Below that breakpoint the same tree drives a pill pinned under the navbar
 * (current section + reading progress) that opens the full outline in a
 * bottom sheet (see .outlineMobile).
 *
 * `summary` adds a leading "Summary" entry for the frontmatter summary and
 * quote, which the page anchors at SUMMARY_ID.
 */
export const SUMMARY_ID = 'sec-summary';

export const OutlineNav = ({ blocks, summary = false }) => {
    // [{ id, number, heading, children: [...] }] — subsections nest under the
    // section they follow.
    const tree = useMemo(() => {
        const out = summary
            ? [{ id: SUMMARY_ID, number: null, heading: 'Summary', intro: true, children: [] }]
            : [];
        for (const b of blocks) {
            if (b?.type === 'section') {
                out.push({ id: sectionId(b.number, b.heading), number: b.number, heading: b.heading, children: [] });
            } else if (b?.type === 'subsection' && out.length) {
                out[out.length - 1].children.push({
                    id: sectionId(b.number, b.heading), number: b.number, heading: b.heading,
                });
            } else if (b?.type === 'impact') {
                // The close-out isn't numbered, but readers should be able to
                // jump straight to it.
                const heading = b.heading || 'Impact';
                out.push({ id: sectionId(null, heading), number: null, heading, children: [] });
            }
        }
        return out;
    }, [blocks, summary]);

    const [activeId, setActiveId] = useState(null);
    // Every id in document order, so we can resolve "which is furthest down but
    // still above the fold" without depending on observer callback ordering.
    const orderedIds = useMemo(
        () => tree.flatMap((s) => [s.id, ...s.children.map((c) => c.id)]),
        [tree],
    );
    const visible = useRef(new Set());

    useEffect(() => {
        if (!orderedIds.length) return undefined;
        const nodes = orderedIds.map((id) => document.getElementById(id)).filter(Boolean);
        if (!nodes.length) return undefined;

        const pick = () => {
            // Prefer the last visible heading; if none are on screen (mid-section
            // scrolling), fall back to the last one we've scrolled past.
            const onScreen = orderedIds.filter((id) => visible.current.has(id));
            if (onScreen.length) { setActiveId(onScreen[onScreen.length - 1]); return; }
            let passed = null;
            for (const id of orderedIds) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= 120) passed = id;
            }
            setActiveId(passed);
        };

        const io = new IntersectionObserver((entries) => {
            for (const e of entries) {
                if (e.isIntersecting) visible.current.add(e.target.id);
                else visible.current.delete(e.target.id);
            }
            pick();
        }, { rootMargin: '-100px 0px -60% 0px', threshold: 0 });

        nodes.forEach((n) => io.observe(n));
        pick();
        window.addEventListener('scroll', pick, { passive: true });
        return () => { io.disconnect(); window.removeEventListener('scroll', pick); };
    }, [orderedIds]);

    // ─── Mobile pill + sheet ───
    const [sheetOpen, setSheetOpen] = useState(false);
    const pillRef = useRef(null);
    const progressRef = useRef(null);
    const sheetRef = useRef(null);
    const sheetListRef = useRef(null);

    // The pill sits just under the sticky navbar, whose height changes with
    // the breakpoint, so measure it. Published on :root because the headings'
    // scroll-margin needs it too. The site navbar is the first <nav> on the page.
    useEffect(() => {
        const navbar = document.querySelector('nav');
        if (!navbar) return undefined;
        const root = document.documentElement;
        const measure = () => root.style.setProperty('--navbar-h', `${navbar.offsetHeight}px`);
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(navbar);
        return () => { ro.disconnect(); root.style.removeProperty('--navbar-h'); };
    }, []);

    // Reading progress along the pill's bottom edge. Written straight to the
    // element so scrolling doesn't re-render the component.
    useEffect(() => {
        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    const closeSheet = ({ returnFocus = true } = {}) => {
        if (sheetRef.current) sheetRef.current.style.transform = '';
        setSheetOpen(false);
        if (returnFocus) pillRef.current?.focus({ preventScroll: true });
    };

    // While the sheet is open: lock the page, close on Escape, and start with
    // the current entry in view and focused. A layout effect, so closing
    // unlocks the page before goFromSheet's jump on the next frame.
    useLayoutEffect(() => {
        if (!sheetOpen) return undefined;
        const body = document.body;
        const prevOverflow = body.style.overflow;
        body.style.overflow = 'hidden';
        const current = sheetListRef.current?.querySelector('[aria-current]');
        current?.scrollIntoView({ block: 'center' });
        (current || sheetRef.current)?.focus({ preventScroll: true });
        const onKey = (e) => { if (e.key === 'Escape') closeSheet(); };
        document.addEventListener('keydown', onKey);
        return () => {
            body.style.overflow = prevOverflow;
            document.removeEventListener('keydown', onKey);
        };
    }, [sheetOpen]);

    const goFromSheet = (e, id) => {
        e.preventDefault();
        closeSheet({ returnFocus: false });
        // Jump on the next frame, once closing has unlocked the page scroll.
        requestAnimationFrame(() => go(null, id));
    };

    // Drag the sheet's header down to dismiss it.
    const drag = useRef(null);
    const onDragStart = (e) => {
        if (e.target.closest('button')) return;
        drag.current = e.clientY;
        sheetRef.current.style.transition = 'none';
        e.currentTarget.setPointerCapture(e.pointerId);
    };
    const onDragMove = (e) => {
        if (drag.current === null) return;
        sheetRef.current.style.transform = `translateY(${Math.max(0, e.clientY - drag.current)}px)`;
    };
    const onDragEnd = (e) => {
        if (drag.current === null) return;
        const dy = e.clientY - drag.current;
        drag.current = null;
        sheetRef.current.style.transition = '';
        if (dy > 80) closeSheet();
        else sheetRef.current.style.transform = '';
    };

    const go = (e, id) => {
        e?.preventDefault();
        const el = document.getElementById(id);
        if (!el) return;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const jump = () => el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        jump();
        // Safety net: images now reserve their space, but anything that still
        // changes height mid-scroll (a Rive canvas, a late font) moves the target.
        // Re-aim whenever the page resizes, for a moment, unless the reader
        // takes over the scroll themselves.
        const ro = new ResizeObserver(jump);
        const stop = () => {
            ro.disconnect();
            window.removeEventListener('wheel', stop);
            window.removeEventListener('touchstart', stop);
        };
        ro.observe(document.body);
        window.addEventListener('wheel', stop, { passive: true, once: true });
        window.addEventListener('touchstart', stop, { passive: true, once: true });
        setTimeout(stop, 1500);
        // Keep the URL shareable without triggering the browser's own jump.
        window.history.replaceState(null, '', `#${id}`);
    };

    if (tree.length < 2) return null; // one section isn't an outline

    // A section counts as active when it, or any of its subsections, is active.
    const activeSection = tree.find(
        (s) => s.id === activeId || s.children.some((c) => c.id === activeId),
    );

    const activeSub = activeSection?.children.find((c) => c.id === activeId);

    // The pill keeps saying "Contents" over the Summary, so it still reads as
    // a menu until the first numbered section.
    const pillSection = activeSection?.intro ? null : activeSection;

    // The rail is always shown on desktop, so readers can see the study's shape
    // from the hero onward. No entry is highlighted until the first section
    // header scrolls past.
    return (
        <>
        <nav className={styles.outlineNav} aria-label="Case study sections">
            <ul className={styles.outlineList}>
                {tree.map((s) => {
                    const isActive = activeSection?.id === s.id;
                    return (
                        <li key={s.id}>
                            <a
                                href={`#${s.id}`}
                                onClick={(e) => go(e, s.id)}
                                className={`${styles.outlineLink} ${isActive ? styles.outlineLinkActive : ''}`}
                                aria-current={activeId === s.id ? 'true' : undefined}
                            >
                                <span className={styles.outlineNumber}>{s.number}</span>
                                <span>{s.heading}</span>
                            </a>
                            {isActive && s.children.length > 0 && (
                                <ul className={styles.outlineSubList}>
                                    {s.children.map((c) => (
                                        <li key={c.id}>
                                            <a
                                                href={`#${c.id}`}
                                                onClick={(e) => go(e, c.id)}
                                                className={`${styles.outlineSubLink} ${activeId === c.id ? styles.outlineSubLinkActive : ''}`}
                                                aria-current={activeId === c.id ? 'true' : undefined}
                                            >
                                                {c.heading}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>

        {/* Mobile: over the hero nothing is active yet, so the pill offers the contents. */}
        <div className={`${styles.outlineMobile} ${sheetOpen ? styles.outlineMobileOpen : ''}`}>
            <button
                ref={pillRef}
                type="button"
                className={styles.outlinePill}
                onClick={() => setSheetOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={sheetOpen}
                aria-controls="outline-sheet"
            >
                {pillSection?.number && (
                    <span className={styles.outlinePillNumber}>{(activeSub || pillSection).number}</span>
                )}
                <span className={styles.outlinePillText}>
                    {pillSection ? pillSection.heading : 'Contents'}
                    {(activeSub || !pillSection) && (
                        <span className={styles.outlinePillSub}>
                            {pillSection ? activeSub.heading : `${tree.length} sections`}
                        </span>
                    )}
                </span>
                <svg className={styles.outlinePillChevron} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span ref={progressRef} className={styles.outlinePillProgress} />
            </button>

            <div className={styles.outlineScrim} onClick={() => closeSheet()} />
            <div
                ref={sheetRef}
                id="outline-sheet"
                className={styles.outlineSheet}
                role="dialog"
                aria-modal="true"
                aria-label="Case study sections"
                tabIndex={-1}
                inert={!sheetOpen}
            >
                <div
                    className={styles.outlineSheetHead}
                    onPointerDown={onDragStart}
                    onPointerMove={onDragMove}
                    onPointerUp={onDragEnd}
                    onPointerCancel={onDragEnd}
                >
                    <div className={styles.outlineSheetHandle} />
                    <div className={styles.outlineSheetTitleRow}>
                        <span className={styles.outlineSheetEyebrow}>Contents</span>
                        <button type="button" className={styles.outlineSheetClose} onClick={() => closeSheet()}>
                            Close
                        </button>
                    </div>
                </div>
                <ul ref={sheetListRef} className={styles.outlineSheetList}>
                    {tree.map((s) => (
                        <li key={s.id}>
                            <a
                                href={`#${s.id}`}
                                onClick={(e) => goFromSheet(e, s.id)}
                                className={`${styles.outlineSheetLink} ${activeId === s.id ? styles.outlineSheetLinkActive : ''}`}
                                aria-current={activeId === s.id ? 'true' : undefined}
                            >
                                <span className={styles.outlineSheetNumber}>{s.number}</span>
                                <span>{s.heading}</span>
                            </a>
                            {s.children.length > 0 && (
                                <ul className={styles.outlineSheetSubList}>
                                    {s.children.map((c) => (
                                        <li key={c.id}>
                                            <a
                                                href={`#${c.id}`}
                                                onClick={(e) => goFromSheet(e, c.id)}
                                                className={`${styles.outlineSheetSubLink} ${activeSection?.id === s.id ? styles.outlineSheetSubLinkInSection : ''} ${activeId === c.id ? styles.outlineSheetLinkActive : ''}`}
                                                aria-current={activeId === c.id ? 'true' : undefined}
                                            >
                                                {c.heading}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    );
};

OutlineNav.propTypes = {
    blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
    summary: PropTypes.bool,
};
