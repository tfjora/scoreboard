import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    container: {
        background: '#27303f',
        borderBottom: '1px solid lightgrey',
        boxSizing: 'border-box',
        height: '100%',
        width: '100%',
    },
    content: {
        background: '#F2F3F5',
        boxSizing: 'border-box',
        height: 'calc(100vh - 65px)',
        padding: '32px',
        width: '100%',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    headerWithoutTabs: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
});
