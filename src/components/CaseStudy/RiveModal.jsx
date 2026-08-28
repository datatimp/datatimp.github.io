import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { RiveEmbed } from './RiveEmbed';
import styles from './CaseStudy.module.css';

/**
 * Enlarge a live .riv in a full-screen modal — for subtle animations (e.g. the
 * booth's breeze wave) that get lost at row size. A fresh RiveEmbed plays big;
 * Esc or a backdrop click closes. Portaled to <body> so it escapes the row grid.
 */
export const RiveModal = ({ src, riveProps = {}, background, onClose, label = 'Animation' }) => {
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [onClose]);

    return createPortal(
        <div className={styles.modalBackdrop} onClick={onClose} role="dialog" aria-modal="true" aria-label={label}>
            <div className={styles.modalBody} onClick={(e) => e.stopPropagation()}>
                <button type="button" className={styles.modalClose} onClick={onClose} aria-label="Close">×</button>
                <div className={styles.modalRive} style={background ? { background } : undefined}>
                    <RiveEmbed src={src} className={styles.modalRiveEmbed} {...riveProps} />
                </div>
            </div>
        </div>,
        document.body,
    );
};

RiveModal.propTypes = {
    src: PropTypes.string.isRequired,
    riveProps: PropTypes.object,
    background: PropTypes.string,   // mat behind the Rive — matches the row's `background`
    onClose: PropTypes.func.isRequired,
    label: PropTypes.string,
};
