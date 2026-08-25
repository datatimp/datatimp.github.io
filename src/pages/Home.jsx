import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Hero } from '../components/Hero/Hero';
import { Card } from '../components/Card/Card';
import { Footer } from '../components/Footer/Footer';
import ReactMarkdown from 'react-markdown';
import { parseMarkdown } from '../utils/parseMarkdown';
import { caseStudies } from '../content/caseStudies';
import styles from './Home.module.css';
import headshot from '../assets/images/tim-headshot-02a-circle-sm.webp';
import headshotHover from '../assets/images/tim-headshot-01a-circle-sm.webp';

// About section content (simple flat frontmatter)
import aboutRaw from '../content/about.md?raw';
const about = parseMarkdown(aboutRaw);

const isResolved = (url) => typeof url === 'string' && !url.startsWith('.');

export const Home = () => {
    const workRef = useRef(null);

    const scrollToWork = () => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        workRef.current?.scrollIntoView({
            behavior: reduce ? 'auto' : 'smooth',
            block: 'start',
        });
    };

    return (
        <div className={styles.page}>
            <Navbar />
            <Hero
                title={about.data.title}
                subtitle={about.data.subtitle}
                onCtaClick={scrollToWork}
            />

            <main id="work" className={styles.grid} ref={workRef} style={{ scrollMarginTop: '6rem' }}>
                <section className={styles.projectColumn}>
                    {caseStudies.map((study) => (
                        <Link key={study.slug} to={`/${study.slug}`} className={styles.caseCard}>
                            <div className={styles.caseCardTop}>
                                {isResolved(study.card) && (
                                    <img src={study.card} alt="" className={styles.caseCardImg} loading="lazy" />
                                )}
                                <div className={styles.caseCardTitleBar}>{study.title}</div>
                            </div>
                            <div className={styles.caseCardBody}>
                                {study.summary && <p className={styles.caseCardSummary}>{study.summary}</p>}
                                <hr className={styles.caseCardDivider} />
                                <div className={styles.caseCardTags}>
                                    {(study.disciplines || []).map((d) => (
                                        <span key={d} className={styles.caseCardChip}>{d}</span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>

                <section className={styles.aboutColumn}>
                    <Card
                        title="About Me"
                        className={styles.aboutCard}
                        footer={
                            <div className={styles.aboutCardFooter}>
                                <a href={about.data.github}>Github</a>
                                <a href={about.data.linkedin}>LinkedIn</a>
                            </div>
                        }
                    >
                        <div className={styles.patternOverlay}></div>
                        <div className={styles.headshotWrapper}>
                            <img
                                src={headshotHover}
                                alt="Tim Pevey"
                                className={styles.headshot}
                            />
                            <img
                                src={headshot}
                                alt=""
                                aria-hidden="true"
                                className={`${styles.headshot} ${styles.headshotTop}`}
                            />
                        </div>
                        <ReactMarkdown>{about.content}</ReactMarkdown>
                        {[['Tools', about.data.tools], ['Skills', about.data.skills]].map(
                            ([label, items]) =>
                                items?.length ? (
                                    <div key={label} className={styles.aboutChipGroup}>
                                        <span className={styles.aboutChipLabel}>{label}</span>
                                        <div className={styles.aboutChips}>
                                            {items.map((it) => (
                                                <span key={it} className={styles.aboutChip}>{it}</span>
                                            ))}
                                        </div>
                                    </div>
                                ) : null,
                        )}
                    </Card>
                </section>
            </main>
            <Footer />
        </div>
    );
};
