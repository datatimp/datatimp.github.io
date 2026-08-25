import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-webgl2';
import styles from './Hero.module.css';
import { Button } from '../Button/Button';
import heroGradient from '../../assets/riv/hero-gradient.riv?url';

// TEMP probe: dump the bound View Model tree so we can see the ACTUAL
// color values the runtime holds. Remove once the palette is confirmed.
const argbToHex = (v) => '#' + (v >>> 0).toString(16).padStart(8, '0');
const dumpViewModel = (vmi, path = '(root)', depth = 0) => {
    if (!vmi || depth > 6) return;
    let props = [];
    try { props = vmi.properties || []; } catch { /* ignore */ }
    console.log(`[Rive VM] ${path} — ${props.length} properties`);
    for (const p of props) {
        try {
            const c = vmi.color(p.name);
            if (c) {
                console.log(`   ${path}.${p.name}  (color) = ${argbToHex(c.value)}  [type ${p.type}]`);
                continue;
            }
        } catch { /* not a color */ }
        try {
            const child = vmi.viewModel(p.name);
            if (child) { dumpViewModel(child, `${path}.${p.name}`, depth + 1); continue; }
        } catch { /* not a nested VM */ }
        console.log(`   ${path}.${p.name}  [type ${p.type}]`);
    }
};

export const Hero = ({ title, subtitle, onCtaClick = undefined }) => {
    const { rive, RiveComponent } = useRive({
        src: heroGradient,
        stateMachines: 'State Machine 1',
        autoBind: true,
        autoplay: true,
        layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
    });

    useEffect(() => {
        if (!rive) return;
        try {
            console.log('[Rive VM] ==== hero-gradient view model dump ====');
            dumpViewModel(rive.viewModelInstance);
        } catch (e) {
            console.warn('[Rive VM] probe failed:', e);
        }
    }, [rive]);

    return (
        <section className={styles.hero}>
            <RiveComponent className={styles.riveBg} />
            <div className={styles.inner}>
                {title && <h1 className={styles.title}>{title}</h1>}
                <p className={styles.subtitle}>{subtitle}</p>
                <div className={styles.actions}>
                    <Button label="View Work" variant="primary" onClick={onCtaClick} />
                    <a href="mailto:datatimp@gmail.com"><Button label="Contact Me" variant="outline" /></a>
                </div>
            </div>
        </section>
    );
};

Hero.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string.isRequired,
    onCtaClick: PropTypes.func,
};

