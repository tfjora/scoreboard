import MaterialReactTable from 'material-react-table';
import { useMemo } from 'react';

import type { IPerson } from '../../../../_models/Person';
import { useStyles } from './styles';

type Props = {
    persons: null | IPerson[];
};
export default function View({ persons }: Props) {
    const styles = useStyles();

    const mappedPerson = persons?.map((p) => ({
        ...p,
    }));
    const columns = useMemo(
        () => [
            {
                accessorKey: 'firstName', //access nested data with dot notation
                header: 'First Name',
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
            },
        ],
        []
    );

    return (
        <div className={styles.container}>
            <MaterialReactTable
                columns={columns as any}
                data={mappedPerson as any}
                enableStickyHeader
            />
        </div>
    );
}
