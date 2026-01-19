import { Navbar } from './Navbar';

export default {
    title: 'Components/Navbar',
    component: Navbar,
    tags: ['autodocs'],
};

export const Default = {
    args: {
        items: [
            { label: 'Work', href: '#work' },
            { label: 'About', href: '#about' },
            { label: 'Contact', href: '#contact' },
        ],
    },
};
