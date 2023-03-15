import { useMsal } from '@azure/msal-react';
import { Button } from '@material-ui/core';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { loginApiRequest } from '../authConfig';

export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect(loginApiRequest).catch((e: any) => {
            console.log(e);
        });
    };
    return (
        <Button onClick={() => handleLogin()}>
            <AccountBoxIcon style={{ color: 'white' }} />
        </Button>
    );
};
