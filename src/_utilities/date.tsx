import { format, intervalToDuration, parse } from 'date-fns';

import { DATE_FNS } from '../_constants/date';

export const getDayMonthYear = (inDate: string) => {
    const formattedDate = format(new Date(inDate), DATE_FNS.DD_MM_YYYY);
    return formattedDate;
};

export function calculateAge(dob: string) {
    const dateFormat = format(new Date(dob), DATE_FNS.DD_MM_YYYY);
    const birthDate = parse(dateFormat, DATE_FNS.DD_MM_YYYY, new Date());
    const { years, months, days } = intervalToDuration({ end: new Date(), start: birthDate });

    return `${years}year - ${months}month(s) - ${days}day(s)`;
}
