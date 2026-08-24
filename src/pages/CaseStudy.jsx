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
                <Snapshot
                    role={study.role}
                    timeline={study.timeline}
                    client={study.client}
                    tools={study.tools}
                    platform={study.platform}
                    liveUrl={study.liveUrl}
                />

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
