import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './CaseStudy.module.css';

const PAD = 64; // breathing room around the image; matches .zoomScroll padding (2rem × 2)

/**
 * Full-screen viewer for a large static image (e.g. a tall flow chart).
 * Opens FIT-to-screen (never larger than the viewport) and lets the visitor zoom
 * in past fit, then pan both axes:
 *   • mobile → native touch scroll (up/down + left/right)
 *   • desktop → drag-to-pan (grab) once zoomed past fit, plus scroll/wheel
 * Toolbar: −/+ zoom, Fit (reset), ×. Esc closes; keys + − 0 mirror the buttons.
 * Closes only via × / Esc — no click-to-close, so a drag never dismisses it.
 */
export const ImageZoomModal = ({ src, alt = '', onClose, label = 'Image viewer' }) => {
    const scrollRef = useRef(null);
    const drag = useRef(null);
    const [nat, setNat] = useState({ w: 0, h: 0 });
    const [avail, setAvail] = useState({ w: 0, h: 0 });
    const [userZoom, setUserZoom] = useState(1); // 1 = fit-to-screen; up to 6× that

    const zoom = useCallback(
        (d) => setUserZoom((z) => Math.min(6, Math.max(1, +(z + d).toFixed(2)))),
        [],
    );

    // Measure the scroll area so we can fit the image to it (and re-fit on resize).
    useEffect(() => {
        const measure = () => {
            const el = scrollRef.current;
            if (el) setAvail({ w: el.clientWidth, h: el.clientHeight });
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            else if (e.key === '+' || e.key === '=') zoom(0.25);
            else if (e.key === '-' || e.key === '_') zoom(-0.25);
            else if (e.key === '0') setUserZoom(1);
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [onClose, zoom]);

    // Fit = shrink a big chart to the screen; never upscale past natural by default.
    const fit = (nat.w && nat.h && avail.w && avail.h)
        ? Math.min(1, (avail.w - PAD) / nat.w, (avail.h - PAD) / nat.h)
        : 1;
    const scale = fit * userZoom;
    const dispW = nat.w ? nat.w * scale : undefined;
    const dispH = nat.h ? nat.h * scale : undefined;
    const pannable = !!(dispW && (dispW > avail.w - PAD || dispH > avail.h - PAD));

    // Mouse drag-to-pan (only when zoomed past fit); touch uses native scrolling.
    const onPointerDown = (e) => {
        if (e.pointerType !== 'mouse' || !pannable) return;
        const el = scrollRef.current;
        drag.current = { x: e.clientX, y: e.clientY, left: el.scrollLeft, top: el.scrollTop };
        el.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e) => {
        if (!drag.current) return;
        const el = scrollRef.current;
        el.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
        el.scrollTop = drag.current.top - (e.clientY - drag.current.y);
    };
    const endDrag = (e) => {
        if (drag.current && scrollRef.current) {
            try { scrollRef.current.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
        }
        drag.current = null;
    };

    return createPortal(
        <div className={styles.zoomBackdrop} role="dialog" aria-modal="true" aria-label={label}>
            <div className={styles.zoomToolbar}>
                <button type="button" onClick={() => zoom(-0.25)} aria-label="Zoom out" disabled={userZoom <= 1}>−</button>
                <span className={styles.zoomLevel}>{Math.round(scale * 100)}%</span>
                <button type="button" onClick={() => zoom(0.25)} aria-label="Zoom in" disabled={userZoom >= 6}>+</button>
                <button type="button" onClick={() => setUserZoom(1)} aria-label="Fit to screen" disabled={userZoom === 1}>Fit</button>
                <button type="button" className={styles.zoomClose} onClick={onClose} aria-label="Close">×</button>
            </div>
            <div
                ref={scrollRef}
                className={styles.zoomScroll}
                style={{ cursor: pannable ? 'grab' : 'default' }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
            >
                <img
                    src={src}
                    alt={alt}
                    className={styles.zoomImg}
                    style={dispW ? { width: `${dispW}px` } : undefined}
                    onLoad={(e) => setNat({ w: e.currentTarget.naturalWidth || 1200, h: e.currentTarget.naturalHeight || 800 })}
                    draggable="false"
                />
            </div>
        </div>,
        document.body,
    );
};

ImageZoomModal.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    label: PropTypes.string,
};
