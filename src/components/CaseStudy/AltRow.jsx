import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { MediaFrame } from './MediaFrame';
import { Lightbox } from './Lightbox';
import { boxStyle } from './boxStyle';
import clickMe from '../../assets/icons/clickMe.svg';
import styles from './CaseStudy.module.css';

/**
 * Alternating media/text row — the visual rhythm of the Solution section.
 * `side` sets which side the media sits on ("left" | "right") on desktop.
 *
 * The heading is a direct grid child (not nested in the text) so that on mobile
 * the block collapses to a single title → media → body stack, reading as one
 * optical unit. See `.row` / `.rowMedia*` grid-areas in CaseStudy.module.css.
 *
 * `zoom`: optional array of images. A markdown link in the body opens them in a
 * full-screen Lightbox: `#zoom` opens the whole set (carousel); `#zoom:N` opens
 * just image N (e.g. named references — `[Duplo](#zoom:0)`). `zoomBg` puts a
 * solid background behind the viewed image (e.g. white for transparent logos).
 */
export const AltRow = ({ media, alt, heading, body, side = 'right', riveProps, radius, border, mediaWidth, class: mediaClass, background, padding, mediaTitle, zoom, zoomBg, hint, box }) => {
    // null = closed; 'all' = whole set; number = single image at that index.
    const [zoomAt, setZoomAt] = useState(null);
    const hasZoom = Array.isArray(zoom) && zoom.length > 0;
    // `hint: left | right | true` drops a friendly "click me" mark in an upper
    // corner of the media (true → the corner opposite the text). Used to flag the
    // live/interactive Rive pieces. Corners alternate row-to-row for a hand-placed feel.
    const hintCorner = hint === true ? (side === 'left' ? 'right' : 'left') : hint;

    // `#zoom` / `#zoom:N` links in the body open the lightbox instead of navigating.
    const mdComponents = hasZoom
        ? {
            a: ({ href, children, ...rest }) => {
                const m = typeof href === 'string' && href.match(/^#zoom(?::(\d+))?$/);
                if (m) {
                    const at = m[1] === undefined ? 'all' : Number(m[1]);
                    return <button type="button" className={styles.zoomLink} onClick={() => setZoomAt(at)}>{children}</button>;
                }
                delete rest.node; // react-markdown passes `node`; keep it off the DOM element
                return <a href={href} {...rest}>{children}</a>;
            },
        }
        : undefined;

    const zoomImages = zoomAt === 'all' ? zoom : (typeof zoomAt === 'number' ? [zoom[zoomAt]] : null);

    return (
        <div className={`${styles.row} ${side === 'left' ? styles.rowMediaLeft : styles.rowMediaRight}`} style={boxStyle(box)}>
            {heading && (
                <h3 className={`${mediaTitle ? styles.mediaTitle : styles.rowHeading} ${styles.rowHeadingEl}`}>{heading}</h3>
            )}
            <div className={styles.rowMedia}>
                {hintCorner && (
                    <img
                        src={clickMe}
                        alt=""
                        aria-hidden="true"
                        className={`${styles.clickHint} ${hintCorner === 'left' ? styles.clickHintLeft : styles.clickHintRight}`}
                    />
                )}
                <MediaFrame src={media} alt={alt || heading || ''} riveProps={riveProps} radius={radius} border={border} mediaWidth={mediaWidth} mediaClass={mediaClass} background={background} padding={padding} />
            </div>
            <div className={styles.rowText}>
                {body && <ReactMarkdown components={mdComponents}>{body}</ReactMarkdown>}
            </div>
            {zoomImages && zoomImages.length > 0 && (
                <Lightbox images={zoomImages} background={zoomBg} onClose={() => setZoomAt(null)} label={`${heading || 'Image'} — up close`} />
            )}
        </div>
    );
};

AltRow.propTypes = {
    media: PropTypes.string,
    alt: PropTypes.string,
    heading: PropTypes.string,
    body: PropTypes.string,
    side: PropTypes.oneOf(['left', 'right']),
    riveProps: PropTypes.object,
    radius: PropTypes.bool,
    border: PropTypes.bool,
    mediaWidth: PropTypes.string,
    class: PropTypes.string,
    background: PropTypes.string,
    padding: PropTypes.string,
    mediaTitle: PropTypes.bool,
    zoom: PropTypes.arrayOf(PropTypes.string),
    zoomBg: PropTypes.string,
    hint: PropTypes.oneOf([true, 'left', 'right']),
    box: PropTypes.object,   // style the whole row container from .md (background/border/padding/radius)
};
