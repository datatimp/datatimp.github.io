import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { ImageZoomModal } from './ImageZoomModal';
import { boxStyle } from './boxStyle';
import styles from './CaseStudy.module.css';
import frame from '../../assets/images/iphone16-mockup.png';

// Same test as Laptop.jsx: a screen recording plays as a muted loop, anything else is a still.
const isVideo = (src) => /\.(mp4|webm|mov)(\?|#|$)/i.test(src);

/** The bare iPhone mockup: an mp4 loop OR a still, behind a transparent-screen PNG.
    Exported so `gallery` can frame its items without the Phone block's layout.
    `scroll: true` → a full-page grab taller than the screen scrolls inside it. */
export const Device = ({ media, alt, screenBg, statusHeight, maxWidth, scroll }) => (
    <div className={`${styles.phone}${scroll ? ` ${styles.phoneScroll}` : ''}`} style={maxWidth ? { maxWidth } : undefined}>
        <div className={styles.phoneScreenInner} style={{ background: screenBg }} tabIndex={scroll ? 0 : undefined} aria-label={scroll ? `${alt || 'Screen'} (scrolls)` : undefined}>
            {isVideo(media) ? (
                <video src={media} className={styles.phoneScreen} style={{ top: statusHeight }} autoPlay muted loop playsInline preload="metadata" aria-label={alt || undefined} />
            ) : scroll ? (
                // A spacer, not margin: a % height reads off the screen's height,
                // like `top` does for the non-scrolling still.
                <>
                    <div style={{ height: statusHeight }} aria-hidden="true" />
                    <img src={media} alt={alt} className={styles.phoneScreen} loading="lazy" />
                </>
            ) : (
                <img src={media} alt={alt} className={styles.phoneScreen} style={{ top: statusHeight }} loading="lazy" />
            )}
        </div>
        <img src={frame} alt="" aria-hidden="true" className={styles.phoneFrame} />
        {scroll && <span className={styles.phoneScrollHint} aria-hidden="true">Scroll</span>}
    </div>
);
Device.propTypes = { media: PropTypes.string, alt: PropTypes.string, screenBg: PropTypes.string, statusHeight: PropTypes.string, maxWidth: PropTypes.string, scroll: PropTypes.bool };

/**
 * A screen recording shown inside a photoreal iPhone mockup. `screenBg` fills
 * the strip behind the Dynamic Island; `statusHeight` pushes the media down past
 * it. Two layouts:
 *   • `side: "left" | "right"` → alternating media/text row (matches the study;
 *     collapses to a title → media → body stack on mobile).
 *   • no `side` → centered, with the caption stacked above (max visibility).
 */
export const Phone = ({ media, alt = '', screenBg = '#000', statusHeight = '9%', heading, body, side, box, enlarge, maxWidth }) => {
    const [open, setOpen] = useState(false);
    // `enlarge: true` → click the mockup to open the pan/zoom viewer on the RAW
    // screen at full resolution (no frame), same as an image block.
    const canEnlarge = Boolean(enlarge && media);
    const bare = <Device media={media} alt={alt} screenBg={screenBg} statusHeight={statusHeight} maxWidth={maxWidth} />;
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
        <figure className={styles.phoneBlock} style={boxStyle(box)}>
            {(heading || body) && (
                <figcaption className={styles.phoneCaption}>
                    {heading && <h3 className={styles.mediaTitle}>{heading}</h3>}
                    {body && <ReactMarkdown>{body}</ReactMarkdown>}
                </figcaption>
            )}
            {device}
            {viewer}
        </figure>
    );
};

Phone.propTypes = {
    media: PropTypes.string,
    alt: PropTypes.string,
    screenBg: PropTypes.string,   // color behind the Dynamic Island (match the site nav)
    statusHeight: PropTypes.string, // how far to push the media down past the island
    maxWidth: PropTypes.string,   // override the 300px mockup cap (a full-width box wants more)
    heading: PropTypes.string,
    body: PropTypes.string,
    enlarge: PropTypes.bool,   // click the mockup to open the pan/zoom viewer
    side: PropTypes.oneOf(['left', 'right']),   // omit → centered with caption above
    box: PropTypes.object,   // style the whole block container from .md
};
