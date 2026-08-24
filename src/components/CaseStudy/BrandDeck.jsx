import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './CaseStudy.module.css';

/**
 * Brand-deck viewer: a thumbnail that opens a modal carousel of the exported
 * Figma slides. Keyboard: ← → to page, Esc to close. Reusable for any slide set.
 */
export const BrandDeck = ({ heading, body, slides = [] }) => {
    const [open, setOpen] = useState(false);
    const [i, setI] = useState(0);
    const count = slides.length;

    const go = useCallback((delta) => {
        setI((prev) => (prev + delta + count) % count);
    }, [count]);

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => {
            if (e.key === 'Escape') setOpen(false);
            if (e.key === 'ArrowRight') go(1);
            if (e.key === 'ArrowLeft') go(-1);
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [open, go]);

    if (!count) return null;

    return (
        <section className={styles.brandDeck}>
            {heading && <h3 className={styles.blockHeading}>{heading}</h3>}
            {body && <p className={styles.blockLead}>{body}</p>}

            <button type="button" className={styles.deckThumb} onClick={() => { setI(0); setOpen(true); }}>
                <img src={slides[0]} alt="" className={styles.deckThumbImg} loading="lazy" />
                <span className={styles.deckThumbLabel}>View the brand deck ({count} slides)</span>
            </button>

            {open && (
                <div className={styles.modalBackdrop} onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="Brand deck">
                    <div className={styles.modalBody} onClick={(e) => e.stopPropagation()}>
                        <button type="button" className={styles.modalClose} onClick={() => setOpen(false)} aria-label="Close">×</button>
                        <img src={slides[i]} alt={`Brand deck slide ${i + 1} of ${count}`} className={styles.modalImg} />
                        <div className={styles.modalNav}>
                            <button type="button" onClick={() => go(-1)} aria-label="Previous slide">‹</button>
                            <span className={styles.modalCount}>{i + 1} / {count}</span>
                            <button type="button" onClick={() => go(1)} aria-label="Next slide">›</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

BrandDeck.propTypes = {
    heading: PropTypes.string,
    body: PropTypes.string,
    slides: PropTypes.arrayOf(PropTypes.string),
};
