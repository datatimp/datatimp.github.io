import React from 'react';
import PropTypes from 'prop-types';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-webgl2';
import styles from './Hero.module.css';
import { Button } from '../Button/Button';
import heroGradient from '../../assets/riv/hero-gradient.riv?url';

export const Hero = ({ title, subtitle, onCtaClick = undefined }) => {
    const { RiveComponent } = useRive({
        src: heroGradient,
        stateMachines: 'State Machine 1',
        autoBind: true,
        autoplay: true,
        layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
    });

    return (
        <section className={styles.hero}>
            <RiveComponent className={styles.riveBg} />
            <div className={styles.inner}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.subtitle}>{subtitle}</p>
                <div className={styles.actions}>
                    <Button label="View Work" variant="primary" onClick={onCtaClick} />
                    <a href="https://datatimp.github.io/resume"><Button label="Resume" variant="outline" /></a>
                </div>
            </div>
        </section>
    );
};

Hero.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    onCtaClick: PropTypes.func,
};

