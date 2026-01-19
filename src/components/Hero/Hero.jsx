import React from 'react';
import PropTypes from 'prop-types';
import styles from './Hero.module.css';
import { Button } from '../Button/Button';

export const Hero = ({ title, subtitle, onCtaClick = undefined }) => {
    return (
        <section className={styles.hero}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
            <div className={styles.actions}>
                <Button label="View Work" variant="primary" onClick={onCtaClick} />
                <a href="https://datatimp.github.io/resume"><Button label="Resume" variant="outline" /></a>
            </div>
        </section>
    );
};

Hero.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    onCtaClick: PropTypes.func,
};

