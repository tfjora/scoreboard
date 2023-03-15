import type { IPerson } from './Person';

export interface IScoreBoard {
    paid: number;
    won: number;
    person: IPerson;
    datedPlayed: string;
}
