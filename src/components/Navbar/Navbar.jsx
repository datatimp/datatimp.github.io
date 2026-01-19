import React from 'react';
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';
import { Button } from '../Button/Button';

const DEFAULT_ITEMS = [
    { label: 'Work', href: '#work' },
    { label: 'Resume', href: 'https://datatimp.github.io/resume' },
    { label: 'Contact', href: '#contact' },
];

export const Navbar = ({ items = DEFAULT_ITEMS }) => {
    return (
        <nav className={styles.navbar}>
            <a href="/" className={styles.logo}>
                Tim Pevey
            </a>
            <ul className={styles.navLinks}>
                {items.map((item) => (
                    <li key={item.label}>
                        <a href={item.href} className={styles.link}>
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

