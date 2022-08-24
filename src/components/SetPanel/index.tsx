/* eslint-disable no-console */
import { useGraph } from "@/context/GraphContext";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import { NotificationSection } from "./notificationSection";
import { SocialSection } from "./socialSection";

export const SetPanel: React.FC = () => {
    const { selectAddress} = useGraph();
    const router = useRouter();

    return (
        <>
            <div className={styles.container}>
                <div className={styles.backSecion} onClick={()=>{router.push("/profile");}}>
                    <img src={'left_arrow.png'}/>
                    <p>Back</p>
                </div>
                
                <div className={styles.accountsSettingsPanel}>
                    <p className={styles.titleP}>Account Settings</p>
                    <div className={styles.walletInfoPanel}>
                        <div className={styles.walletTitlePanel}>
                            <p className={styles.walletTitlePanelP}>Wallet Address</p>
                        </div>

                        <div className={styles.walletAddressPanel}>
                            <p className={styles.walletAddressPanelP}>{selectAddress}</p>
                        </div>
                    </div>

                    <div className={styles.emailInfoPanel}>
                        <div className={styles.emailtTitlePanel}>
                            <p className={styles.emailTitlePanelP}>Email</p>
                            <p className={styles.emailTitlePanelPA}>COMING SOON...</p>
                        </div>

                        <div className={styles.emailAddressPanel}>
                            <p className={styles.emailAddressPanelP}>USER@EMAIL.COM</p>
                        </div>
                    </div>
                </div>

                <div className={styles.socialPanel}>
                    <p className={styles.titleP}>Social Verifications</p>
                    <SocialSection
                        address={selectAddress}
                    />
                </div>

                <div className={styles.notificationPanel}>
                    <p className={styles.titleP}>Account Notifications</p>
                    <NotificationSection
                        address={selectAddress}
                    />
                </div>
            </div>
        </>
    );
};

SetPanel.displayName = "SetPanel";
