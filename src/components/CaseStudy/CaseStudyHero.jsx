import PropTypes from 'prop-types';
import { MediaFrame } from './MediaFrame';
import styles from './CaseStudy.module.css';

/**
 * Zero-Negative-style case-study hero: title + discipline tags above a large
 * centered, framed screenshot of the site, on a dark section.
 */
export const CaseStudyHero = ({ title, disciplines = [], hero, heroRiveProps }) => {
    return (
        <header className={styles.hero}>
            <div className={styles.heroHead}>
                <h1 className={styles.heroTitle}>{title}</h1>
                {disciplines.length > 0 && (
                    <p className={styles.heroTags}>{disciplines.join(' · ')}</p>
                )}
            </div>
            {hero && (
                <MediaFrame src={hero} alt={`${title} — hero`} riveProps={heroRiveProps} className={styles.heroFrame} />
            )}
        </header>
    );
};

CaseStudyHero.propTypes = {
    title: PropTypes.string.isRequired,
    disciplines: PropTypes.arrayOf(PropTypes.string),
    hero: PropTypes.string,
    heroRiveProps: PropTypes.object,
};
