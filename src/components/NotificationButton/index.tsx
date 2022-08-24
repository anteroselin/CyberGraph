/* eslint-disable no-console */

import { useGraph } from "@/context/GraphContext";
// import router from "next/router";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { NotificationSection } from './notificationSection';

export const NotificationButton: React.FC = () => {

    const { selectAddress } = useGraph();
    const [dropdownOpen, setdropdownOpen] = useState(false);

    useEffect(() => {
        console.log("address:", selectAddress);
    })
    return (
        <>
            <div className={styles.notificationDiv} onClick = {() => setdropdownOpen(!dropdownOpen)}>
                <img
                    src={'/notification_icon.png'}
                    className = {styles.notificationIcon}
                />
                {dropdownOpen == true && (
                <div className={styles.notificationDropdownMenu}>
                    <p className={styles.notificationTitleP}>Most Recent Notifications</p>
                    <NotificationSection
                        address={selectAddress}
                    />
                </div>
                )}
            </div>
        </>
    );
};

NotificationButton.displayName = "NotificationButton";
