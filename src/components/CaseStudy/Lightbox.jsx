import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './CaseStudy.module.css';

/**
 * Full-screen high-res image viewer — a close-up "show off the work" modal.
 * Reuses the brand-deck modal chrome. Keyboard: ← → to page, Esc to close.
 * Unlike the brand deck there's no thumbnail and no download — just the pixels.
 */
export const Lightbox = ({ images = [], onClose, label = 'Image viewer', background }) => {
    const [i, setI] = useState(0);
    const count = images.length;
    const go = useCallback((delta) => setI((p) => (p + delta + count) % count), [count]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') go(1);
            if (e.key === 'ArrowLeft') go(-1);
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [go, onClose]);

    if (!count) return null;

    // Portal to <body> so the fixed overlay escapes the case-study grid/stacking
    // context (rendered inline it mis-centred and under-covered on mobile).
    return createPortal(
        <div className={styles.modalBackdrop} onClick={onClose} role="dialog" aria-modal="true" aria-label={label}>
            <div className={styles.modalBody} onClick={(e) => e.stopPropagation()}>
                <button type="button" className={styles.modalClose} onClick={onClose} aria-label="Close">×</button>
                <img
                    src={images[i]}
                    alt={`${label} (${i + 1} of ${count})`}
                    className={styles.modalImg}
                    style={background ? { background, padding: '2.5rem' } : undefined}
                />
                {count > 1 && (
                    <div className={styles.modalNav}>
                        <button type="button" onClick={() => go(-1)} aria-label="Previous">‹</button>
                        <span className={styles.modalCount}>{i + 1} / {count}</span>
                        <button type="button" onClick={() => go(1)} aria-label="Next">›</button>
                    </div>
                )}
            </div>
        </div>,
        document.body,
    );
};

Lightbox.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
    onClose: PropTypes.func.isRequired,
    label: PropTypes.string,
    background: PropTypes.string,   // solid backing behind the image (e.g. #fff for logos)
};
