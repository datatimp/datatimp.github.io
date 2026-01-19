import { Card } from './Card';

export default {
    title: 'Components/Card',
    component: Card,
    tags: ['autodocs'],
};

export const Default = {
    args: {
        title: 'Project Alpha',
        children: 'A case study about implementing a design system for a fintech startup.',
        footer: '2024 • Fintech',
        variant: 'default',
    },
};

export const AboutMe = {
    args: {
        title: 'Hello, I\'m Tim',
        children: 'UX/UI Designer with a passion for clean interfaces and data visualization. Based in NYC.',
        footer: 'Available for work',
        variant: 'highContrast',
    },
};
