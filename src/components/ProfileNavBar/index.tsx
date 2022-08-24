// src\components\NavBar\index.tsx

import { useRouter } from "next/router";
import React from "react";
import { WalletConnectButton } from "../WalletConnectButton";
import styles from "./index.module.css";

export const NavBar: React.FC = () => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <p
                    className={styles.logop}
                    onClick={() => {
                        router.push("/profile");
                    }}
                >
                    Web3 Social
                </p>
            </div>
            <div className={styles.searchBarSection} onClick={()=>{router.push('accounts')}}>
                <p className={styles.searchBarP}>Search By ENS, SNS , Address</p>
                <img className = {styles.serachIcon} src ={'searchIcon.png'}/>
            </div>
            <div className = {styles.walletDiv}>
                
                <WalletConnectButton />
            </div>
        </div>
    );
};

NavBar.displayName = "NavBar";
