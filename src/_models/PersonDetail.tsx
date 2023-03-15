import type { IPersonResult } from './Person';

export interface IScoreBoard {
    paid: number;
    won: number;
    person: IPersonResult;
    datedPlayed: string;
}
