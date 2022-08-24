import { NavBar } from "@/components/ProfileNavBar";
import { UserPanel } from "@/components/UserPanel";
import type { NextPage } from "next";
import styles from "../../styles/Profile.module.css";


const Profile: NextPage = () => {
    return (
        <div className={styles.container}>
            <NavBar />
            <UserPanel />
        </div>
    );
};

export default Profile;
