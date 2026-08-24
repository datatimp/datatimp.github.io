import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { AltRow } from './AltRow';
import { BrandColors } from './BrandColors';
import { BrandDeck } from './BrandDeck';
import { TypeSpec } from './TypeSpec';
import { MediaFrame } from './MediaFrame';
import styles from './CaseStudy.module.css';

function SectionHeader({ number, heading, problem }) {
    return (
        <header className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
                {number && <span className={styles.sectionNumber}>{number}</span>}
                <h2 className={styles.sectionTitle}>{heading}</h2>
            </div>
            {problem && (
                <div className={styles.sectionProblem}>
                    <span className={styles.eyebrow}>The problem</span>
                    <p className={styles.problemText}>{problem}</p>
                </div>
            )}
        </header>
    );
}
SectionHeader.propTypes = { number: PropTypes.string, heading: PropTypes.string, problem: PropTypes.string };

function SubsectionHeader({ number, heading, body }) {
    return (
        <div className={styles.subsection}>
            <div className={styles.subsectionTitleRow}>
                {number && <span className={styles.subsectionNumber}>{number}</span>}
                <h3 className={styles.subsectionTitle}>{heading}</h3>
            </div>
            {body && <p className={styles.blockLead}>{body}</p>}
        </div>
    );
}
SubsectionHeader.propTypes = { number: PropTypes.string, heading: PropTypes.string, body: PropTypes.string };

function ProseBlock({ heading, body }) {
    return (
        <section className={styles.prose}>
            {heading && <h2 className={styles.blockHeading}>{heading}</h2>}
            {body && <ReactMarkdown>{body}</ReactMarkdown>}
        </section>
    );
}
ProseBlock.propTypes = { heading: PropTypes.string, body: PropTypes.string };

function ImageBlock({ heading, body, media, alt, radius, border, mediaWidth, class: mediaClass, background, padding, mediaTitle }) {
    return (
        <section className={styles.imageBlock}>
            {heading && <h2 className={mediaTitle ? styles.mediaTitle : styles.blockHeading}>{heading}</h2>}
            {body && <p className={styles.blockLead}>{body}</p>}
            <MediaFrame src={media} alt={alt || heading || ''} className={styles.imageBlockFrame} radius={radius} border={border} mediaWidth={mediaWidth} mediaClass={mediaClass} background={background} padding={padding} />
        </section>
    );
}
ImageBlock.propTypes = { heading: PropTypes.string, body: PropTypes.string, media: PropTypes.string, alt: PropTypes.string, radius: PropTypes.bool, border: PropTypes.bool, mediaWidth: PropTypes.string, class: PropTypes.string, background: PropTypes.string, padding: PropTypes.string, mediaTitle: PropTypes.bool };

function Gallery({ heading, body, items = [] }) {
    return (
        <section className={styles.gallery}>
            {heading && <h2 className={styles.blockHeading}>{heading}</h2>}
            {body && <p className={styles.blockLead}>{body}</p>}
            <div className={styles.galleryGrid}>
                {items.map((it, idx) => (
                    <figure key={it.media || idx} className={styles.galleryItem}>
                        <MediaFrame src={it.media} alt={it.caption || ''} riveProps={it.riveProps} />
                        {it.caption && <figcaption className={styles.galleryCaption}>{it.caption}</figcaption>}
                    </figure>
                ))}
            </div>
        </section>
    );
}
Gallery.propTypes = { heading: PropTypes.string, body: PropTypes.string, items: PropTypes.array };

/** Dispatch a content block to its renderer based on `type`. */
export const Block = ({ block }) => {
    switch (block.type) {
        case 'row':
            return <AltRow {...block} />;
        case 'brandColors':
            return <BrandColors {...block} />;
        case 'brandDeck':
            return <BrandDeck {...block} />;
        case 'typeSpec':
            return <TypeSpec {...block} />;
        case 'gallery':
            return <Gallery {...block} />;
        case 'image':
            return <ImageBlock {...block} />;
        case 'section':
            return <SectionHeader {...block} />;
        case 'subsection':
            return <SubsectionHeader {...block} />;
        case 'overview':
        case 'problem':
        case 'process':
        case 'impact':
        default:
            return <ProseBlock {...block} />;
    }
};

Block.propTypes = { block: PropTypes.shape({ type: PropTypes.string }).isRequired };
