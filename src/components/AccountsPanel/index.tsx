
import { useGraph } from "@/context/GraphContext";
import { SearchBar } from "../SearchBar";
import styles from "./index.module.css";
import { RecommendedSection } from './recommendedSection';
import { TopRankingSection } from './topraningSection';
export const AccountsPanel: React.FC = () => {
    const { selectAddress} = useGraph();
    return (
        <>
            <div className={styles.container}>
                <SearchBar/>
                <div className = {styles.accountsFollowSection}>
                    <div className={styles.recommendedPeopleTitle}>
                        <p className={styles.recommendedPeopleP}>
                            Recommended people to follow
                        </p>
                    </div>
                    <div className={styles.recommendedPeopleMemberSection}>
                        <RecommendedSection
                            address={selectAddress}
                        />
                    </div>
                    <div className={styles.recommendedPeopleTitle}>
                        <p className={styles.recommendedPeopleP}>
                            Top Rankings
                        </p>
                    </div>
                    <div className={styles.recommendedPeopleMemberSection}>
                        <TopRankingSection
                            address={selectAddress}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

AccountsPanel.displayName = "AccountsPanel";
