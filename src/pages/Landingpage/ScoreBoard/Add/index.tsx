import { Button, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';

import useAccountContext from '../../../../_context/tokenContext';
import DropDown from '../../../../components/Dropdown';
import { useStyles } from './style';

type Props = { onSave: any };

export default function Add({ onSave }: Props) {
    const [values, setValues] = useState({
        paid: '',
        personId: '',
        won: '',
    });
    const [person, setPerson] = useState('Not selected');
    const [menuItems, setMenuItems] = useState([{ key: '', label: '' }]);
    const styles = useStyles();
    const { token } = useAccountContext();

    const mappedPersonForDropdown = (data: any[]) => {
        return data.map((item, index) => {
            const isSelected = index === 0;
            return {
                isDisabled: isSelected,
                isSelected: isSelected,
                key: item,
                label: `${item.firstName} ${item.lastName}`,
            };
        });
    };

    useEffect(() => {
        const request = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'GET',
        };
        async function fetchData() {
            await fetch('https://api-scoreboard.azurewebsites.net/api/person', request)
                .then((b) => b.json())
                .then((data) => {
                    return setMenuItems(mappedPersonForDropdown(data));
                });
        }
        fetchData();
    }, [token]);

    const onClick = async () => {
        await onSave(values);
    };

    const handleChange = (event: any) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleChangePerson = (event: any) => {
        setPerson(event.target.value);
        setValues({ ...values, personId: event.target.value?.id });
    };

    return (
        <div className={styles.container}>
            <form autoComplete="off" className={styles.container}>
                <DropDown
                    value={person}
                    onChange={handleChangePerson}
                    label={'Add person'}
                    menuItems={menuItems}
                />
                <TextField
                    label="Paid"
                    name="paid"
                    onChange={handleChange}
                    value={values.paid}
                    required
                />
                <TextField
                    label="Won"
                    name="won"
                    onChange={handleChange}
                    required
                    value={values.won}
                />

                <Button color="primary" variant="contained" onClick={onClick}>
                    Save details
                </Button>
            </form>
        </div>
    );
}
