import PropTypes from 'prop-types';
import styles from './CaseStudy.module.css';

// Chip only — no visible hex (too small to read); still copyable on click,
// with the value shown in the hover tooltip.
function Swatch({ hex }) {
    const copy = () => navigator.clipboard?.writeText(hex).catch(() => {});
    return (
        <button type="button" className={styles.swatch} onClick={copy} title={`Copy ${hex}`}>
            <span className={styles.swatchChip} style={{ backgroundColor: hex }} />
        </button>
    );
}
Swatch.propTypes = { hex: PropTypes.string.isRequired };

// Bundled asset URLs don't start with '.'; unresolved frontmatter refs do.
const isResolved = (url) => typeof url === 'string' && !url.startsWith('.');

/**
 * Native color-decision block: the client's brand-color options rebuilt as a
 * responsive grid of SVG logos + real, copyable hex swatches.
 */
export const BrandColors = ({ heading, body, options = [] }) => {
    return (
        <section className={styles.brandColors}>
            {heading && <h3 className={styles.blockHeading}>{heading}</h3>}
            {body && <p className={styles.blockLead}>{body}</p>}
            <div className={styles.brandGrid}>
                {options.map((opt) => (
                    <figure
                        key={opt.label}
                        className={`${styles.brandCell} ${opt.chosen ? styles.brandChosen : ''}`}
                    >
                        {opt.chosen && <span className={styles.chosenTag}>Final</span>}
                        {isResolved(opt.logo) && (
                            <img src={opt.logo} alt={`${opt.label} logo`} className={styles.brandLogo} />
                        )}
                        <figcaption className={styles.brandLabel}>{opt.label}</figcaption>
                        <div className={styles.swatchRow}>
                            {(opt.swatches || []).map((hex, i) => (
                                <Swatch key={`${hex}-${i}`} hex={hex} />
                            ))}
                        </div>
                    </figure>
                ))}
            </div>
        </section>
    );
};

BrandColors.propTypes = {
    heading: PropTypes.string,
    body: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            logo: PropTypes.string,
            swatches: PropTypes.arrayOf(PropTypes.string),
            chosen: PropTypes.bool,
        }),
    ),
};
