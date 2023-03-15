import { Button, TextField } from '@material-ui/core';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import { DATE_FNS } from '../../../../_constants/date';
import useAccountContext from '../../../../_context/tokenContext';
import DropDown from '../../../../components/Dropdown';
import { useStyles } from './style';

type Props = { onSave: any };

export default function Add({ onSave }: Props) {
    const [values, setValues] = useState({
        date: format(new Date(), DATE_FNS.ISO_YYYY_MM_DD),
        height: '',
        personId: '',
        weight: '',
    });
    const [person, setPerson] = useState('tete');
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
                    id="date"
                    label="Date"
                    type="date"
                    name="date"
                    onChange={handleChange}
                    value={values.date}
                />
                <TextField
                    label="Weight"
                    name="weight"
                    onChange={handleChange}
                    value={values.weight}
                    required
                />
                <TextField
                    label="Height"
                    name="height"
                    onChange={handleChange}
                    required
                    value={values.height}
                />

                <Button color="primary" variant="contained" onClick={onClick}>
                    Save details
                </Button>
            </form>
        </div>
    );
}
