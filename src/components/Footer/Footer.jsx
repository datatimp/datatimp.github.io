import { useRive } from '@rive-app/react-webgl2';
import styles from './Footer.module.css';
import footerRive from '../../assets/riv/footer-character.riv?url';

export const Footer = () => {
    const { RiveComponent } = useRive({
        src: footerRive,
        stateMachines: 'charBlink',
        autoBind: true,
        autoplay: true,
    });

    return (
        <footer className={styles.footer}>
            <RiveComponent className={styles.canvas} />
        </footer>
    );
};
