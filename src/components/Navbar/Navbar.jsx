import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { caseStudies } from '../../content/caseStudies';
import styles from './Navbar.module.css';

// Work is a dropdown built from the case-study index, so a new study appears in
// the nav automatically. The other items are plain external/mailto links.
const DEFAULT_ITEMS = [
    { label: 'Resume', href: 'https://datatimp.github.io/resume' },
    { label: 'Contact', href: 'mailto:datatimp@gmail.com' },
];

export const Navbar = ({ items = DEFAULT_ITEMS, studies = caseStudies }) => {
    const [open, setOpen] = useState(false);          // mobile drawer
    const [workOpen, setWorkOpen] = useState(false);  // Work dropdown
    const workRef = useRef(null);

    // Close the dropdown on outside click or Escape. Both are expected of a menu
    // and their absence is what makes a hand-rolled one feel broken.
    useEffect(() => {
        if (!workOpen) return undefined;
        const onDown = (e) => {
            if (workRef.current && !workRef.current.contains(e.target)) setWorkOpen(false);
        };
        const onKey = (e) => {
            if (e.key === 'Escape') setWorkOpen(false);
        };
        document.addEventListener('mousedown', onDown);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDown);
            document.removeEventListener('keydown', onKey);
        };
    }, [workOpen]);

    const closeAll = () => { setOpen(false); setWorkOpen(false); };

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo} onClick={closeAll}>
                Tim Pevey
            </Link>

            <button
                type="button"
                className={styles.toggle}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
            >
                {open ? '✕' : '☰'}
            </button>

            <ul className={`${styles.navLinks} ${open ? styles.open : ''}`}>
                <li className={styles.hasSubmenu} ref={workRef}>
                    <button
                        type="button"
                        className={`${styles.link} ${styles.workTrigger}`}
                        aria-haspopup="true"
                        aria-expanded={workOpen}
                        onClick={() => setWorkOpen((o) => !o)}
                    >
                        Work
                        <span className={styles.caret} aria-hidden="true">▾</span>
                    </button>

                    <ul className={`${styles.submenu} ${workOpen ? styles.submenuOpen : ''}`}>
                        {studies.map((study) => (
                            <li key={study.slug}>
                                <Link to={`/${study.slug}`} className={styles.submenuLink} onClick={closeAll}>
                                    {study.title}
                                </Link>
                            </li>
                        ))}
                        <li className={styles.submenuDivider} role="presentation" />
                        <li>
                            {/* Preserves the old behavior: land on home at the work grid. */}
                            <Link to="/#work" className={styles.submenuLink} onClick={closeAll}>
                                All work
                            </Link>
                        </li>
                    </ul>
                </li>

                {items.map((item) => (
                    <li key={item.label}>
                        <a href={item.href} className={styles.link} onClick={closeAll}>
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Navbar.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
        })
    ),
    studies: PropTypes.arrayOf(
        PropTypes.shape({ slug: PropTypes.string, title: PropTypes.string })
    ),
};
