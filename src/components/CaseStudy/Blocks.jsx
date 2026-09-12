import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { AltRow } from './AltRow';
import { BrandColors } from './BrandColors';
import { BrandDeck } from './BrandDeck';
import { TypeSpec } from './TypeSpec';
import { Phone } from './Phone';
import { Laptop } from './Laptop';
import { MediaFrame } from './MediaFrame';
import { ImageZoomModal } from './ImageZoomModal';
import { boxStyle } from './boxStyle';
import { sectionId } from './sectionId';
import styles from './CaseStudy.module.css';

const isRiv = (s) => typeof s === 'string' && s.split('?')[0].endsWith('.riv');

// Inline markdown for short single-line fields (problem, subsection/image/gallery
// body, captions): renders _em_, `code`, **strong**, and links WITHOUT ReactMarkdown's
// wrapping <p>, so the text stays inside the existing styled element.
const Inline = ({ children }) => (
    <ReactMarkdown components={{ p: ({ children: c }) => c }}>{children}</ReactMarkdown>
);
Inline.propTypes = { children: PropTypes.string };

function SectionHeader({ number, heading, problem }) {
    return (
        <header className={styles.sectionHeader} id={sectionId(number, heading)}>
            <div className={styles.sectionTitleRow}>
                {number && <span className={styles.sectionNumber}>{number}</span>}
                <h2 className={styles.sectionTitle}>{heading}</h2>
            </div>
            {problem && (
                <div className={styles.sectionProblem}>
                    <span className={styles.eyebrow}>The problem</span>
                    <p className={styles.problemText}><Inline>{problem}</Inline></p>
                </div>
            )}
        </header>
    );
}
SectionHeader.propTypes = { number: PropTypes.string, heading: PropTypes.string, problem: PropTypes.string };

function SubsectionHeader({ number, heading, body }) {
    return (
        <div className={styles.subsection} id={sectionId(number, heading)}>
            <div className={styles.subsectionTitleRow}>
                {number && <span className={styles.subsectionNumber}>{number}</span>}
                <h3 className={styles.subsectionTitle}>{heading}</h3>
            </div>
            {body && <p className={styles.blockLead}><Inline>{body}</Inline></p>}
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

/** Impact panel — a boxed close-out set apart from the sections, with a centered
    flanked-by-rules heading. Stands out so the study doesn't just trail off. */
function ImpactBlock({ heading, body }) {
    return (
        <section className={styles.impact}>
            {heading && <h2 className={styles.impactHeading}>{heading}</h2>}
            {body && <div className={styles.impactBody}><ReactMarkdown>{body}</ReactMarkdown></div>}
        </section>
    );
}
ImpactBlock.propTypes = { heading: PropTypes.string, body: PropTypes.string };

function ImageBlock({ heading, body, media, alt, radius, border, mediaWidth, class: mediaClass, background, padding, shadow, mediaTitle, box, enlarge, href, linkBadge }) {
    const [open, setOpen] = useState(false);
    // `enlarge: true` → click opens the full-screen pan/zoom viewer (large diagrams).
    // `href` → the image becomes an external link that opens in a new tab; it wins over enlarge.
    const canEnlarge = enlarge && !isRiv(media) && !href;
    const frame = (
        <MediaFrame src={media} alt={alt || heading || ''} className={styles.imageBlockFrame} radius={radius} border={border} mediaWidth={mediaWidth} mediaClass={mediaClass} background={background} padding={padding} shadow={shadow} />
    );
    return (
        <section className={styles.imageBlock} style={boxStyle(box)}>
            {heading && <h2 className={mediaTitle ? styles.mediaTitle : styles.blockHeading}>{heading}</h2>}
            {body && <p className={styles.blockLead}><Inline>{body}</Inline></p>}
            {href ? (
                <a href={href} target="_blank" rel="noreferrer" className={styles.enlargeImageBtn} style={{ cursor: 'pointer' }} aria-label={`${heading || 'Image'} — opens in a new tab`}>
                    {frame}
                    <span className={styles.enlargeBadge} aria-hidden="true">{linkBadge || 'Open ↗'}</span>
                </a>
            ) : canEnlarge ? (
                <button type="button" className={styles.enlargeImageBtn} onClick={() => setOpen(true)} aria-label={`Expand ${heading || 'image'}`}>
                    {frame}
                    <span className={styles.enlargeBadge} aria-hidden="true">⤢ Expand</span>
                </button>
            ) : frame}
            {open && (
                <ImageZoomModal src={media} alt={alt || heading || ''} onClose={() => setOpen(false)} label={`${heading || 'Image'} — expanded`} />
            )}
        </section>
    );
}
ImageBlock.propTypes = { heading: PropTypes.string, body: PropTypes.string, media: PropTypes.string, alt: PropTypes.string, radius: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]), border: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]), mediaWidth: PropTypes.string, class: PropTypes.string, background: PropTypes.string, padding: PropTypes.string, shadow: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]), mediaTitle: PropTypes.bool, box: PropTypes.object, enlarge: PropTypes.bool, href: PropTypes.string, linkBadge: PropTypes.string };

function Gallery({ heading, body, items = [] }) {
    return (
        <section className={styles.gallery}>
            {heading && <h2 className={styles.blockHeading}>{heading}</h2>}
            {body && <p className={styles.blockLead}><Inline>{body}</Inline></p>}
            <div className={styles.galleryGrid}>
                {items.map((it, idx) => (
                    <figure key={it.media || idx} className={styles.galleryItem}>
                        <MediaFrame src={it.media} alt={it.caption || ''} riveProps={it.riveProps} />
                        {it.caption && <figcaption className={styles.galleryCaption}><Inline>{it.caption}</Inline></figcaption>}
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
        case 'phone':
            return <Phone {...block} />;
        case 'laptop':
            return <Laptop {...block} />;
        case 'gallery':
            return <Gallery {...block} />;
        case 'image':
            return <ImageBlock {...block} />;
        case 'section':
            return <SectionHeader {...block} />;
        case 'subsection':
            return <SubsectionHeader {...block} />;
        case 'impact':
            return <ImpactBlock {...block} />;
        case 'overview':
        case 'problem':
        case 'process':
        default:
            return <ProseBlock {...block} />;
    }
};

Block.propTypes = { block: PropTypes.shape({ type: PropTypes.string }).isRequired };
