import { format } from 'date-fns';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import MaterialReactTable from 'material-react-table';
import { useMemo } from 'react';

import { DATE_FNS } from '../../../../_constants/date';
import type { IScoreBoard } from '../../../../_models/PersonDetail';
import { getDayMonthYear } from '../../../../_utilities/date';
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
        datedPlayed: getDayMonthYear(p.datedPlayed),
        name: `${p.person.firstName} ${p.person.lastName}`,
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
            {
                accessorKey: 'datedPlayed', //normal accessorKey
                header: 'Date submitted',
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
    const categories = useMemo(
        () => scoreBoard?.map((d) => format(new Date(d.datedPlayed), DATE_FNS.DD_MM_YYYY)),
        [scoreBoard]
    );
    const chartOptions = options(wonData, paidData, categories);

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
