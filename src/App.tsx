import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';

import { AccountContext } from './_context/tokenContext';
import AppRoutes from './AppRoutes';
import { loginApiRequest } from './authConfig';
import Header from './components/Header';
import { useStyles } from './styles';

export default function App() {
    const styles = useStyles();

    const { instance, accounts } = useMsal();
    const [accessToken, setAccessToken] = useState(null);

    function RequestAccessToken() {
        const request = {
            ...loginApiRequest,
            account: accounts[0],
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance
            .acquireTokenSilent(request)
            .then((response) => {
                setAccessToken(response.accessToken as any);
            })
            .catch((e) => {
                instance.acquireTokenPopup(request).then((response) => {
                    setAccessToken(response.accessToken as any);
                });
                console.log('e :>> ', e);
            });
    }

    useEffect(() => {
        RequestAccessToken();
    }, []);

    return (
        <div className={styles.container}>
            <AuthenticatedTemplate>
                {accessToken && (
                    <AccountContext.Provider value={{ account: accounts[0], token: accessToken }}>
                        <Header>
                            <AppRoutes />
                        </Header>
                    </AccountContext.Provider>
                )}
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <>
                    <Header>
                        <h5 className="card-title">
                            Please sign-in to see your profile information.
                        </h5>
                    </Header>
                </>
            </UnauthenticatedTemplate>
        </div>
    );
}
