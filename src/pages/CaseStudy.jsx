import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { CaseStudyHero } from '../components/CaseStudy/CaseStudyHero';
import { Snapshot } from '../components/CaseStudy/Snapshot';
import { Block } from '../components/CaseStudy/Blocks';
import { getCaseStudy } from '../content/caseStudies';
import styles from '../components/CaseStudy/CaseStudy.module.css';
import '../css/case-study-overrides.css'; // plain global CSS you edit directly

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
                                {study.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                            </span>
                            <svg className={styles.liveUrlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        </a>
                    )}
                </div>

                {study.summary && <p className={styles.summary}>{study.summary}</p>}

                {blocks.map((block, i) => (
                    <Block key={`${block.type}-${i}`} block={block} />
                ))}

                <Link to="/" className={styles.backLink}>← Back to work</Link>
            </div>

            <Footer />
        </div>
    );
};
