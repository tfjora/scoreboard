import { Route, Routes } from 'react-router-dom';

import LandingPage from './pages/Landingpage';
import { useStyles } from './styles';

export default function AppRoutes() {
    const styles = useStyles();
    return (
        <div className={styles.AppRoutesContainer}>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/:tab" element={<LandingPage />} />
            </Routes>
        </div>
    );
}
