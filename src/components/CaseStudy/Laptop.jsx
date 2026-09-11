import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { ImageZoomModal } from './ImageZoomModal';
import { boxStyle } from './boxStyle';
import styles from './CaseStudy.module.css';
import frame from '../../assets/images/macbook-pro-mockup.png';

// Vite keeps the extension on hashed asset URLs, so we can tell a screen
// recording from a still screenshot and pick the right element for each.
const isVideo = (src) => /\.(mp4|webm|mov)(\?|#|$)/i.test(src);

/** The bare MacBook mockup: an mp4 loop OR a still, behind a transparent-screen PNG. */
const Device = ({ media, screenBg, poster, alt }) => (
    <div className={styles.laptop}>
        <div className={styles.laptopScreenInner} style={{ background: screenBg }}>
            {media && (isVideo(media) ? (
                <video
                    className={styles.laptopScreen}
                    src={media}
                    poster={poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={alt || undefined}
                />
            ) : (
                <img
                    className={styles.laptopScreen}
                    src={media}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                />
            ))}
        </div>
        <img src={frame} alt="" aria-hidden="true" className={styles.laptopFrame} />
    </div>
);
Device.propTypes = { media: PropTypes.string, screenBg: PropTypes.string, poster: PropTypes.string, alt: PropTypes.string };

/**
 * A looping screen-recording inside a MacBook Pro mockup. The PNG screen is
 * transparent, so the video sits BEHIND it and the bezel masks the edges. The
 * cutout is 1.602:1 (≈16:10). Two layouts:
 *   • `side: "left" | "right"` → alternating media/text row (matches the rest of
 *     the study; collapses to a title → media → body stack on mobile).
 *   • no `side` → centered, with the caption stacked above (max visibility).
 */
export const Laptop = ({ media, alt = '', screenBg = '#fff', heading, body, poster, side, box, enlarge }) => {
    const [open, setOpen] = useState(false);
    // `enlarge: true` → click the mockup to open the pan/zoom viewer on the RAW
    // screen at full resolution (no frame), same as an image block. Stills only:
    // the viewer takes an <img>, so a video mockup can't feed it.
    const canEnlarge = enlarge && media && !isVideo(media);
    const bare = <Device media={media} screenBg={screenBg} poster={poster} alt={alt} />;
    const device = canEnlarge ? (
        <button type="button" className={styles.enlargeImageBtn} onClick={() => setOpen(true)} aria-label={`Expand ${heading || 'screen'}`}>
            {bare}
            <span className={styles.enlargeBadge} aria-hidden="true">⤢ Expand</span>
        </button>
    ) : bare;
    const viewer = open && (
        <ImageZoomModal src={media} alt={alt || heading || ''} onClose={() => setOpen(false)} label={`${heading || 'Screen'} — expanded`} />
    );

    if (side === 'left' || side === 'right') {
        return (
            <div className={`${styles.row} ${side === 'left' ? styles.rowMediaLeft : styles.rowMediaRight}`} style={boxStyle(box)}>
                {heading && <h3 className={`${styles.mediaTitle} ${styles.rowHeadingEl}`}>{heading}</h3>}
                <div className={styles.rowMedia}>{device}</div>
                <div className={styles.rowText}>{body && <ReactMarkdown>{body}</ReactMarkdown>}</div>
                {viewer}
            </div>
        );
    }

    return (
        <figure className={styles.laptopBlock} style={boxStyle(box)}>
            {(heading || body) && (
                <figcaption className={styles.laptopCaption}>
                    {heading && <h3 className={styles.mediaTitle}>{heading}</h3>}
                    {body && <ReactMarkdown>{body}</ReactMarkdown>}
                </figcaption>
            )}
            {device}
            {viewer}
        </figure>
    );
};

Laptop.propTypes = {
    media: PropTypes.string,
    alt: PropTypes.string,
    screenBg: PropTypes.string,
    heading: PropTypes.string,
    body: PropTypes.string,
    poster: PropTypes.string,
    enlarge: PropTypes.bool,   // stills only: click the mockup to open the pan/zoom viewer
    side: PropTypes.oneOf(['left', 'right']),   // omit → centered with caption above
    box: PropTypes.object,   // style the whole block container from .md
};
