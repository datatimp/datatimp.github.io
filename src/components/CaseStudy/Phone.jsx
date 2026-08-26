import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import styles from './CaseStudy.module.css';
import frame from '../../assets/images/iphone16-mockup.png';

/** The bare iPhone mockup: media behind a transparent-screen PNG. */
const Device = ({ media, alt, screenBg, statusHeight }) => (
    <div className={styles.phone}>
        <div className={styles.phoneScreenInner} style={{ background: screenBg }}>
            <img src={media} alt={alt} className={styles.phoneScreen} style={{ top: statusHeight }} loading="lazy" />
        </div>
        <img src={frame} alt="" aria-hidden="true" className={styles.phoneFrame} />
    </div>
);
Device.propTypes = { media: PropTypes.string, alt: PropTypes.string, screenBg: PropTypes.string, statusHeight: PropTypes.string };

/**
 * A screen recording shown inside a photoreal iPhone mockup. `screenBg` fills
 * the strip behind the Dynamic Island; `statusHeight` pushes the media down past
 * it. Two layouts:
 *   • `side: "left" | "right"` → alternating media/text row (matches the study;
 *     collapses to a title → media → body stack on mobile).
 *   • no `side` → centered, with the caption stacked above (max visibility).
 */
export const Phone = ({ media, alt = '', screenBg = '#000', statusHeight = '9%', heading, body, side }) => {
    const device = <Device media={media} alt={alt} screenBg={screenBg} statusHeight={statusHeight} />;

    if (side === 'left' || side === 'right') {
        return (
            <div className={`${styles.row} ${side === 'left' ? styles.rowMediaLeft : styles.rowMediaRight}`}>
                {heading && <h3 className={`${styles.mediaTitle} ${styles.rowHeadingEl}`}>{heading}</h3>}
                <div className={styles.rowMedia}>{device}</div>
                <div className={styles.rowText}>{body && <ReactMarkdown>{body}</ReactMarkdown>}</div>
            </div>
        );
    }

    return (
        <figure className={styles.phoneBlock}>
            {(heading || body) && (
                <figcaption className={styles.phoneCaption}>
                    {heading && <h3 className={styles.mediaTitle}>{heading}</h3>}
                    {body && <ReactMarkdown>{body}</ReactMarkdown>}
                </figcaption>
            )}
            {device}
        </figure>
    );
};

Phone.propTypes = {
    media: PropTypes.string,
    alt: PropTypes.string,
    screenBg: PropTypes.string,   // colour behind the Dynamic Island (match the site nav)
    statusHeight: PropTypes.string, // how far to push the media down past the island
    heading: PropTypes.string,
    body: PropTypes.string,
    side: PropTypes.oneOf(['left', 'right']),   // omit → centered with caption above
};
