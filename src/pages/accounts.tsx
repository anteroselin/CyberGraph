import { NavBar } from "@/components/AccountsNavBar";
import { AccountsPanel } from "@/components/AccountsPanel";

import type { NextPage } from "next";
import styles from "../../styles/Profile.module.css";

const Profile: NextPage = () => {
    return (
        <div className={styles.container}>
            <NavBar />
            <AccountsPanel />
        </div>
    );
};

export default Profile;
