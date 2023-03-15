import { useMsal } from '@azure/msal-react';
import { Button } from '@material-ui/core';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = () => {
        instance.logoutRedirect({
            postLogoutRedirectUri: '/',
        });
    };
    return (
        <Button onClick={() => handleLogout()}>
            <AccountBoxIcon style={{ color: 'white' }} />
        </Button>
    );
};
