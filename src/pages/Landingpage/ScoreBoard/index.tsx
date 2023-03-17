import { Button, Drawer, Switch } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';

import useAccountContext from '../../../_context/tokenContext';
import type { IScoreBoard } from '../../../_models/ScoreBoard';
import Add from './Add';
import { useStyles } from './styles';
import View from './View';

export default function ScoreBoard() {
    const [scoreBoard, setScoreBoard] = useState<IScoreBoard[]>([]);
    const styles = useStyles();
    const [openFlyout, setOpenFlyout] = useState(false);
    const [toggleQuotesButton, setToggleQuotesButton] = useState(false);
    const { token } = useAccountContext();

    const onSave = async (content: any) => {
        const request = {
            body: JSON.stringify(content?.id, content),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'PUT',
        };

        await fetch('https://api-scoreboard.azurewebsites.net/api/result', request)
            .then((r) => r.json())
            .then((d) => setScoreBoard([...scoreBoard, d]));
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
            await fetch('https://api-scoreboard.azurewebsites.net/api/results', request)
                .then((b) => b.json())
                .then((data) => setScoreBoard(data));
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
                <span className={styles.title}>Persons details</span>
                <div>
                    <Switch onClick={() => setToggleQuotesButton(!toggleQuotesButton)} />
                    <Button onClick={() => setOpenFlyout(true)}>
                        <AddIcon color="success" />
                    </Button>
                </div>
            </div>
            <View scoreBoard={scoreBoard} displayQuotes={toggleQuotesButton} />
        </>
    );
}
