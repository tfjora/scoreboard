import { MenuItem, Select } from '@material-ui/core';

export type IMenuItems = {
    key: string;
    label: string;
};

type Props = {
    menuItems: IMenuItems[];
    value: string;
    label: string;
    onChange: (event: any) => void;
};

export default function DropDown({ value, label, onChange, menuItems }: Props) {
    return (
        <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={value}
            label={label}
            onChange={onChange}
        >
            {menuItems.map((item, index) => {
                return (
                    <MenuItem value={item.key} key={index}>
                        {item.label}
                    </MenuItem>
                );
            })}
        </Select>
    );
}
