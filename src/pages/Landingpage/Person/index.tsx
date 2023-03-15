import { Button, Drawer } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';

import useAccountContext from '../../../_context/tokenContext';
import type { IPerson } from '../../../_models/Person';
import Add from './Add';
import { useStyles } from './styles';
import View from './View';

export default function Person() {
    const [persons, setPersons] = useState<IPerson[]>([]);
    const styles = useStyles();
    const [openFlyout, setOpenFlyout] = useState(false);

    const { token, account } = useAccountContext();

    const onSave = async (content: any) => {
        const request = {
            body: JSON.stringify({ ...content, users: account }),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
        };
        try {
            await fetch('https://api-scoreboard.azurewebsites.net/api/person', request)
                .then((r) => r.json())
                .then((d) => {
                    setPersons([...persons, d]);
                });
        } catch (error) {
            console.log('error');
        }
    };

    useEffect(() => {
        async function fetchData() {
            const request = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            };
            try {
                fetch('https://api-scoreboard.azurewebsites.net/api/person', request)
                    .then((b) => b.json())
                    .then((data) => setPersons(data));
            } catch (error) {
                console.log('error :>> ', error);
            }
        }
        fetchData();
    }, [token]);

    return (
        <>
            <Drawer
                anchor="right"
                open={openFlyout}
                onClose={() => setOpenFlyout(false)}
                PaperProps={{ style: { minWidth: '25%' } }}
            >
                <Add onSave={onSave} />
            </Drawer>
            <div className={styles.addButton}>
                <span className={styles.title}>Persons</span>
                <Button onClick={() => setOpenFlyout(true)}>
                    <AddIcon color="success" />
                </Button>
            </div>
            <View persons={persons} />
        </>
    );
}
