import { Navbar } from '../components/Navbar/Navbar';
import { Hero } from '../components/Hero/Hero';
import { Card } from '../components/Card/Card';
import ReactMarkdown from 'react-markdown';
import { parseMarkdown } from '../utils/parseMarkdown';
import styles from './Home.module.css';
import headshot from '../assets/tim-headshot-01c-circle-sm.png';

// Import markdown content as raw strings
import aboutRaw from '../content/about.md?raw';
import project1Raw from '../content/projects/reimagining-finance.md?raw';
import project2Raw from '../content/projects/urban-mobility.md?raw';
import project3Raw from '../content/projects/ecommerce-redesign.md?raw';

// Parse markdown files
const about = parseMarkdown(aboutRaw);
const projectFiles = [project1Raw, project2Raw, project3Raw]
    .map(raw => parseMarkdown(raw))
    .sort((a, b) => a.data.order - b.data.order);

export const Home = () => {
    return (
        <div className={styles.page}>
            <Navbar />
            <Hero
                title={about.data.name}
                subtitle={about.data.title}
            />

            <main className={styles.grid}>
                <section className={styles.projectColumn}>
                    {projectFiles.map((project) => (
                        <Card
                            key={project.data.title}
                            title={project.data.title}
                            footer={`${project.data.category} • ${project.data.year}`}
                        >
                            <ReactMarkdown>{project.content}</ReactMarkdown>
                        </Card>
                    ))}
                </section>

                <section className={styles.aboutColumn}>
                    <Card
                        title="About Me"
                        variant="highContrast"
                        className={styles.aboutCard}
                        footer={
                            <div className={styles.aboutCardFooter}>
                                <a href={about.data.linkedin}>LinkedIn</a>
                            </div>
                        }
                    >
                        <img
                            src={headshot}
                            alt="Tim Pevey"
                            className={styles.headshot}
                        />
                        <ReactMarkdown>{about.content}</ReactMarkdown>
                    </Card>
                </section>
            </main>
        </div>
    );
};
