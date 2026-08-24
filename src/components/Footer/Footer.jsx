import { useRive, Layout, Fit, Alignment } from '@rive-app/react-webgl2';
import styles from './Footer.module.css';
import footerRive from '../../assets/riv/footer-character.riv?url';

export const Footer = () => {
    const { RiveComponent } = useRive({
        src: footerRive,
        stateMachines: 'charBlink',
        autoBind: true,
        autoplay: true,
        // Anchor to the bottom so the character sits on the footer's base at any
        // width (default is center, which floats it in the box on mobile).
        layout: new Layout({ fit: Fit.Contain, alignment: Alignment.BottomCenter }),
    });

    return (
        <footer className={styles.footer}>
            <RiveComponent className={styles.canvas} />
        </footer>
    );
};
