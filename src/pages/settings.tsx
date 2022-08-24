import { NavBar } from "@/components/ProfileNavBar";
import { SetPanel } from "@/components/SetPanel";
import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";

const SettingPanel: NextPage = () => {
    return (
        <div className={styles.container}>
            <NavBar />
            <SetPanel />
        </div>
    );
};

export default SettingPanel;
