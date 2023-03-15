import React from 'react';

interface Props {
    children?: React.ReactNode;
    onClick: () => void;
}

export const Button = ({ children, onClick }: Props) => {
    return <button onClick={onClick}>{children}</button>;
};
