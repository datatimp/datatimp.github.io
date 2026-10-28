import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { CaseStudyHero } from '../components/CaseStudy/CaseStudyHero';
import { Snapshot } from '../components/CaseStudy/Snapshot';
import { Block } from '../components/CaseStudy/Blocks';
import { OutlineNav, SUMMARY_ID } from '../components/CaseStudy/OutlineNav';
import ReactMarkdown from 'react-markdown';
import { getCaseStudy } from '../content/caseStudies';
import styles from '../components/CaseStudy/CaseStudy.module.css';
import '../css/case-study-overrides.css'; // plain global CSS you edit directly

// Emoji sticker on the hero quote's bottom-right corner (`quoteEmoji:` in
// frontmatter). Pops in the first time it scrolls into view.
const QuoteEmoji = ({ emoji }) => {
    const ref = useRef(null);
    const [popped, setPopped] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setPopped(true);
                io.disconnect();
            }
        }, { threshold: 0.6 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <span ref={ref} className={`${styles.quoteEmoji} ${popped ? styles.quoteEmojiPop : ''}`} aria-hidden="true">
            <span className={styles.quoteEmojiGlyph}>{emoji}</span>
        </span>
    );
};

export const CaseStudy = () => {
    const { slug } = useParams();
    const study = getCaseStudy(slug);

    if (!study) {
        return (
            <div className={styles.page}>
                <Navbar />
                <main className={styles.notFound}>
                    <h1>Case study not found</h1>
                    <Link to="/" className={styles.backLink}>← Back to work</Link>
                </main>
                <Footer />
            </div>
        );
    }

    const blocks = Array.isArray(study.blocks) ? study.blocks : [];

    return (
        <div className={styles.page}>
            <Navbar />

            <CaseStudyHero
                title={study.title}
                disciplines={study.disciplines}
                hero={study.hero}
                heroRiveProps={study.heroRiveProps}
            />

            <div className={styles.body}>
                <div className={styles.snapshotGroup}>
                    <Snapshot
                        role={study.role}
                        timeline={study.timeline}
                        client={study.client}
                        tools={study.tools}
                        platform={study.platform}
                    />
                    {study.liveUrl && (
                        <a className={styles.liveUrl} href={study.liveUrl} target="_blank" rel="noreferrer">
                            <span className={styles.liveUrlText}>
                                {study.liveLabel || study.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                            </span>
                            <svg className={styles.liveUrlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        </a>
                    )}
                </div>

                {/* Summary and quote share one outline entry, anchored on
                    whichever comes first. */}
                {study.summary && (
                    <div className={styles.summary} id={SUMMARY_ID}>
                        <ReactMarkdown>{study.summary}</ReactMarkdown>
                    </div>
                )}

                {/* Client testimony up front, so it's seen in the first screen. */}
                {study.quote && (
                    <figure
                        className={`${styles.heroQuote} ${styles[study.quoteStroke] || ''}`}
                        id={study.summary ? undefined : SUMMARY_ID}
                    >
                        <blockquote className={styles.heroQuoteText}>
                            <p>&ldquo;{study.quote}&rdquo;</p>
                        </blockquote>
                        {study.quoteBy && (
                            <figcaption className={styles.heroQuoteBy}>— {study.quoteBy}</figcaption>
                        )}
                        {study.quoteEmoji && <QuoteEmoji emoji={study.quoteEmoji} />}
                    </figure>
                )}

                <OutlineNav blocks={blocks} summary={Boolean(study.summary || study.quote)} />

                {blocks.map((block, i) => (
                    <Block key={`${block.type}-${i}`} block={block} />
                ))}

                <Link to="/" className={styles.backLink}>← Back to work</Link>
            </div>

            <Footer />
        </div>
    );
};
