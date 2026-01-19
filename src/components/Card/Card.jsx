import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

export const Card = ({ title, children, footer, variant = 'default', className, ...props }) => {
    const mode = styles[variant];

    return (
        <div className={[styles.card, mode, className].join(' ')} {...props}>
            {title && <h3 className={styles.title}>{title}</h3>}
            <div className={styles.content}>{children}</div>
            {footer && <div className={styles.footer}>{footer}</div>}
        </div>
    );
};

Card.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node,
    variant: PropTypes.oneOf(['default', 'highContrast']),
};

