import PropTypes from 'prop-types';
import styles from './CaseStudy.module.css';

const GLYPHS = 'abcdefghijklmnopqrstuvwxyz 0123456789';

/**
 * A native type-specimen panel echoing the brand deck's typography slide:
 * a role header ("Logo / Titles") followed by labelled fields (Typeface,
 * Weight, Glyphs), each value rendered in its own face. Data-driven.
 *
 * `color` tints every value (e.g. the HG green). Each field may set `size`
 * (a CSS length) to control that value's size individually.
 */
export const TypeSpec = ({ fonts = [], color }) => (
    <div className={styles.typeSpec}>
        {fonts.map((f) => (
            <div key={f.role} className={styles.typeSpecGroup}>
                {f.role && <h4 className={styles.typeSpecRole}>{f.role}</h4>}
                {(f.fields || []).map((field, i) => (
                    <div key={`${field.label}-${i}`} className={styles.typeSpecField}>
                        {field.label && <span className={styles.typeSpecFieldLabel}>{field.label}</span>}
                        <span
                            className={field.glyphs ? styles.typeSpecGlyphs : styles.typeSpecValue}
                            /* `size` is the DESKTOP intent; CSS clamps it fluidly so it
                               scales down and never overspills the panel on mobile. */
                            style={{ fontFamily: f.font, color, '--type-size': field.size }}
                        >
                            {field.glyphs ? GLYPHS : field.value}
                        </span>
                    </div>
                ))}
            </div>
        ))}
    </div>
);

TypeSpec.propTypes = {
    color: PropTypes.string,
    fonts: PropTypes.arrayOf(
        PropTypes.shape({
            role: PropTypes.string,
            font: PropTypes.string,
            fields: PropTypes.arrayOf(
                PropTypes.shape({
                    label: PropTypes.string,
                    value: PropTypes.string,
                    size: PropTypes.string,
                    glyphs: PropTypes.bool,
                }),
            ),
        }),
    ),
};
