import { Button } from './Button';

export default {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
};

export const Primary = {
    args: {
        variant: 'primary',
        label: 'Primary Action',
    },
};

export const Outline = {
    args: {
        variant: 'outline',
        label: 'Read More',
    },
};

export const Ghost = {
    args: {
        variant: 'ghost',
        label: 'Cancel',
    },
};
