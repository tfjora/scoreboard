import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    container: {
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: '1fr',
        marginBottom: '4px',
        padding: '8px',
        rowGap: '8px',
        width: '100%',
    },
});
