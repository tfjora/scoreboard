import { createContext, useContext } from 'react';

type Account = {
    name?: string;
    localAccountId: string;
    homeAccountId: string;
    username: string;
};

export interface IAccountContext {
    token: string;
    account: Account;
}

export const AccountContext = createContext<IAccountContext>('' as unknown as IAccountContext);

export const useAccountContext = (): IAccountContext => {
    return useContext<IAccountContext>(AccountContext);
};

export default useAccountContext;
