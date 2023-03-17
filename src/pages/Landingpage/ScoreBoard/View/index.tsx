import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import MaterialReactTable from 'material-react-table';
import { useMemo } from 'react';

import type { IScoreBoard } from '../../../../_models/ScoreBoard';
import { options } from './highchartsOptions';
import { useStyles } from './styles';

type Props = {
    scoreBoard: null | IScoreBoard[];
    displayQuotes: boolean;
};

export default function View({ scoreBoard, displayQuotes }: Props) {
    const styles = useStyles();
    const mappedScoreBoard = scoreBoard?.map((p) => ({
        ...p,
        name: `${p.person.FirstName} ${p.person.LastName}`,
    }));

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name', //access nested data with dot notation
                header: 'Name',
            },
            {
                accessorKey: 'paid',
                header: 'Paid',
            },
            {
                accessorKey: 'won', //normal accessorKey
                header: 'Won',
            },
        ],
        []
    );

    const wonData = useMemo(
        () => ({
            data: mappedScoreBoard?.map((d) => d.won),
            name: 'won',
            type: 'line',
        }),
        [mappedScoreBoard]
    );
    const paidData = useMemo(
        () => ({
            data: mappedScoreBoard?.map((d) => d.paid),
            name: 'paid',
            type: 'line',
        }),
        [mappedScoreBoard]
    );
    
    const chartOptions = options(wonData, paidData);

    return (
        <div className={styles.container}>
            {displayQuotes ? (
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            ) : (
                <MaterialReactTable
                    columns={columns as any}
                    data={mappedScoreBoard as any}
                    enableStickyHeader
                />
            )}
        </div>
    );
}
