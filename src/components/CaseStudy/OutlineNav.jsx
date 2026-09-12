import { useEffect, useMemo, useRef, useState } from 'react';
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
 */
export const OutlineNav = ({ blocks }) => {
    // [{ id, number, heading, children: [...] }] — subsections nest under the
    // section they follow.
    const tree = useMemo(() => {
        const out = [];
        for (const b of blocks) {
            if (b?.type === 'section') {
                out.push({ id: sectionId(b.number, b.heading), number: b.number, heading: b.heading, children: [] });
            } else if (b?.type === 'subsection' && out.length) {
                out[out.length - 1].children.push({
                    id: sectionId(b.number, b.heading), number: b.number, heading: b.heading,
                });
            }
        }
        return out;
    }, [blocks]);

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

    const go = (e, id) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (!el) return;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        // Keep the URL shareable without triggering the browser's own jump.
        window.history.replaceState(null, '', `#${id}`);
    };

    if (tree.length < 2) return null; // one section isn't an outline

    // A section counts as active when it, or any of its subsections, is active.
    const activeSection = tree.find(
        (s) => s.id === activeId || s.children.some((c) => c.id === activeId),
    );

    // The rail stays hidden over the hero: activeId is null until the first
    // section header scrolls past, so it fades in once the reader is in the body
    // and fades back out if they scroll up to the top.
    const shown = Boolean(activeId);

    return (
        <nav
            className={`${styles.outlineNav} ${shown ? styles.outlineNavVisible : ''}`}
            aria-label="Case study sections"
            aria-hidden={shown ? undefined : 'true'}
        >
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
    );
};

OutlineNav.propTypes = {
    blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
