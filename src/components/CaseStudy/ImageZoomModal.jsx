import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './CaseStudy.module.css';

const PAD = 64; // breathing room around the image; matches .zoomScroll padding (2rem × 2)
const isSvg = (src) => typeof src === 'string' && /\.svg(\?|#|$)/i.test(src);

/**
 * Full-screen viewer for a large static image (e.g. a tall flow chart).
 * Opens fit-to-WIDTH, capped at the image's native device-pixel resolution, then
 * lets the visitor zoom and pan both axes:
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
    const [userZoom, setUserZoom] = useState(1); // 1 = default fit; 0.25×–6× that
    const isVector = isSvg(src);

    const zoom = useCallback(
        // Zooming OUT below the default matters for tall images, where the default
        // fills the width and runs off the bottom.
        (d) => setUserZoom((z) => Math.min(6, Math.max(0.25, +(z + d).toFixed(2)))),
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

    // Fit to WIDTH, not to both axes. Fitting height too meant a tall image opened
    // SMALLER than it rendered inline, which made "Expand" shrink things; the
    // overflow scrolls instead.
    //
    // The cap is the image's native resolution in DEVICE pixels, not CSS pixels.
    // On a HiDPI screen, 1 image px stretched over 1 CSS px covers `dpr` physical
    // pixels and looks soft, so a 2418px-wide export tops out around 1612 CSS px
    // on a 1.5× display — where it renders exactly 1:1 and stays crisp.
    //
    // Vectors are the exception: an SVG has no native pixel resolution, so the cap
    // is meaningless and was shrinking small diagrams below the size they render at
    // inline. They fill the width and stay sharp at any scale.
    const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) || 1;
    const widthFit = (avail.w - PAD) / nat.w;
    const fit = (nat.w && avail.w)
        ? (isVector ? widthFit : Math.min(1 / dpr, widthFit))
        : 1;
    const scale = fit * userZoom;
    // What the toolbar reports. For a raster, 100% means one image pixel per
    // PHYSICAL pixel — its sharpest possible size — not one per CSS pixel. On a
    // 1.75x display those differ, and reporting the CSS number made a crisp image
    // read as "57%", inviting a zoom to "100%" that upscales past native and
    // pixelates. Vectors keep the conventional meaning: 100% = intrinsic size.
    const shownPct = Math.round(scale * (isVector ? 1 : dpr) * 100);
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
                <button type="button" onClick={() => zoom(-0.25)} aria-label="Zoom out" disabled={userZoom <= 0.25}>−</button>
                <span className={styles.zoomLevel}>{shownPct}%</span>
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
