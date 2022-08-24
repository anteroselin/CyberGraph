// src\components\NavBar\index.tsx

import { useRouter } from "next/router";
import React from "react";
import { WalletConnectButton } from "../WalletConnectButton";
import styles from "./index.module.css";

export const NavBar: React.FC = () => {
    const router = useRouter();
    
    return (
        <div className={styles.container}>
            <div className={styles.backSecion} onClick={()=>{router.push("/profile");}}>
                <img src={'left_arrow.png'}/>
                <p>Back</p>
            </div>
            <div className = {styles.walletDiv}>
                <WalletConnectButton />
            </div>
        </div>
    );
};

NavBar.displayName = "NavBar";
