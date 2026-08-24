import PropTypes from 'prop-types';
import { RiveEmbed } from './RiveEmbed';
import styles from './CaseStudy.module.css';

const isRiv = (src) => typeof src === 'string' && src.split('?')[0].endsWith('.riv');
// Unresolved frontmatter refs still look like './assets/…'; bundled URLs don't.
const isResolved = (src) => typeof src === 'string' && !src.startsWith('.');

/**
 * A framed media slot. Renders a live .riv when the source is a Rive file, a
 * static image otherwise, and a labelled placeholder when the asset is missing.
 */
export const MediaFrame = ({ src, alt = '', riveProps = {}, className, radius = false, border = false, mediaWidth, mediaClass, background, padding }) => {
    // `mediaClass` is a plain, un-hashed class you target from case-study-overrides.css.
    const cls = [styles.frame, className, mediaClass].filter(Boolean).join(' ');
    // ALL per-block tweaks live on this one element (the frame) so the box model
    // behaves normally: padding sits inside the border, background fills the pad.
    let frameStyle;
    if (radius || border || mediaWidth || background || padding) {
        frameStyle = {};
        if (mediaWidth) { frameStyle.maxWidth = mediaWidth; frameStyle.marginInline = 'auto'; } // cap + center
        if (background) { frameStyle.backgroundColor = background; }                             // mat behind transparent media (e.g. a .riv)
        if (padding) { frameStyle.padding = padding; }                                           // inset media, inside the border
        if (border) { frameStyle.border = '1px solid var(--color-neutral-200)'; }
        if (radius) { frameStyle.borderRadius = 'var(--radius)'; frameStyle.overflow = 'hidden'; } // round + clip the media to match
    }
    if (!isResolved(src)) {
        return <div className={cls} style={frameStyle}><div className={styles.framePlaceholder}>Asset pending</div></div>;
    }
    return (
        <div className={cls} style={frameStyle}>
            {isRiv(src) ? (
                <RiveEmbed src={src} className={styles.frameRive} {...riveProps} />
            ) : (
                <img src={src} alt={alt} className={styles.frameImg} loading="lazy" />
            )}
        </div>
    );
};

MediaFrame.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    riveProps: PropTypes.object,
    className: PropTypes.string,
    radius: PropTypes.bool,
    border: PropTypes.bool,
    mediaWidth: PropTypes.string,
    mediaClass: PropTypes.string,
    background: PropTypes.string,
    padding: PropTypes.string,
};
