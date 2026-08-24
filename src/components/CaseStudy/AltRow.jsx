import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { MediaFrame } from './MediaFrame';
import styles from './CaseStudy.module.css';

/**
 * Alternating media/text row — the visual rhythm of the Solution section.
 * `side` sets which side the media sits on ("left" | "right").
 */
export const AltRow = ({ media, alt, heading, body, side = 'right', riveProps, radius, border, mediaWidth, class: mediaClass, background, padding, mediaTitle }) => {
    return (
        <div className={`${styles.row} ${side === 'left' ? styles.rowMediaLeft : styles.rowMediaRight}`}>
            <div className={styles.rowMedia}>
                <MediaFrame src={media} alt={alt || heading || ''} riveProps={riveProps} radius={radius} border={border} mediaWidth={mediaWidth} mediaClass={mediaClass} background={background} padding={padding} />
            </div>
            <div className={styles.rowText}>
                {heading && <h3 className={mediaTitle ? styles.mediaTitle : styles.rowHeading}>{heading}</h3>}
                {body && <ReactMarkdown>{body}</ReactMarkdown>}
            </div>
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
};
