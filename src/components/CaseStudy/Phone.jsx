import PropTypes from 'prop-types';
import styles from './CaseStudy.module.css';
import frame from '../../assets/images/iphone16-mockup.png';

/**
 * A screen recording (animated AVIF / image) shown inside a photoreal iPhone
 * mockup. The media sits in a rounded, clipped screen so its corners can't
 * escape the frame, and is pushed down by `statusHeight` so a sticky site nav
 * clears the Dynamic Island — with `screenBg` filling the strip behind the
 * island (set it to the site's nav colour). Frame: iphone16-mockup.png.
 */
export const Phone = ({ media, alt = '', screenBg = '#000', statusHeight = '9%' }) => (
    <div className={styles.phone}>
        <div className={styles.phoneScreenInner} style={{ background: screenBg }}>
            <img
                src={media}
                alt={alt}
                className={styles.phoneScreen}
                style={{ top: statusHeight }}
                loading="lazy"
            />
        </div>
        <img src={frame} alt="" aria-hidden="true" className={styles.phoneFrame} />
    </div>
);

Phone.propTypes = {
    media: PropTypes.string,
    alt: PropTypes.string,
    screenBg: PropTypes.string,   // colour behind the Dynamic Island (match the site nav)
    statusHeight: PropTypes.string, // how far to push the media down past the island
};
