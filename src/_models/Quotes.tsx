import type { IPerson } from './Person';

export interface IQuotes {
    quote: string;
    person: IPerson;
    dateTime: string;
}
