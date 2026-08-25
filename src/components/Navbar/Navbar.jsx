import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';

const DEFAULT_ITEMS = [
    { label: 'Work', href: '#work' },
    { label: 'Resume', href: 'https://datatimp.github.io/resume' },
    { label: 'Contact', href: 'mailto:datatimp@gmail.com' },
];

export const Navbar = ({ items = DEFAULT_ITEMS }) => {
    const [open, setOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <a href="/" className={styles.logo}>
                Tim Pevey
            </a>

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
                {items.map((item) => (
                    <li key={item.label}>
                        <a
                            href={item.href}
                            className={styles.link}
                            onClick={() => setOpen(false)}
                        >
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
};
