import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

export const Button = ({ variant = 'outline', label, onClick, ...props }) => {
    const mode = styles[variant];
    return (
        <button
            type="button"
            className={[styles.button, mode].join(' ')}
            onClick={onClick}
            {...props}
        >
            {label}
        </button>
    );
};

Button.propTypes = {
    /**
     * Visual style of the button
     */
    variant: PropTypes.oneOf(['primary', 'outline', 'ghost']),
    /**
     * Button text
     */
    label: PropTypes.string.isRequired,
    /**
     * Optional click handler
     */
    onClick: PropTypes.func,
};

