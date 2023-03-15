import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { LandingPageTabs } from '../../_models/Tabs';
import Person from './Person';
import ScoreBoard from './ScoreBoard';
import { useStyles } from './style';

export default function LandingPage() {
    const { tab } = useParams();
    const styles = useStyles();

    const renderTabs = (): ReactNode => {
        switch (tab) {
            case LandingPageTabs.person:
                return <Person />;
            case LandingPageTabs.scoreboard:
                return <ScoreBoard />;

            default:
                return <div></div>;
        }
    };

    return <div className={styles.container}>{renderTabs()}</div>;
}
