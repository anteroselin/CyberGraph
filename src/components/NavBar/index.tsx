// src\components\NavBar\index.tsx

import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { WalletConnectButton } from "../WalletConnectButton";
import styles from "./index.module.css";

export const NavBar: React.FC = () => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <Image
                    src="/CyberGraph-logo.png"
                    width={40.96}
                    height={43}
                    className={styles.logo}
                    alt="Cyber Graph"
                    onClick={() => {
                        router.push("/");
                    }}
                />
                <p className = {styles.logop}>DePass</p>
            </div>
            <WalletConnectButton />
        </div>
    );
};

NavBar.displayName = "NavBar";
