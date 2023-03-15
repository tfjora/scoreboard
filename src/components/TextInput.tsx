import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRef } from 'react';

import type { PersonItem } from '../_models/Person';

type Props = {
    id: PersonItem;
    name: string;
    label: string;
    value: string;
    onChange: (type: PersonItem, value: string) => void;
};

export default function TextInput({ id, name, label, value, onChange }: Props) {
    const useStyles = makeStyles({
        container: {
            padding: '8px',
        },
    });
    const ref = useRef<HTMLInputElement>(null);
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <TextField
                id={id}
                label={label}
                variant="outlined"
                value={value}
                name={name}
                onChange={(e) => onChange(id, e as any)}
                inputRef={ref}
            />
        </div>
    );
}
