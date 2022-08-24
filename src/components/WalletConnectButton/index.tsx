
//src\components\WalletConnectButton\index.tsx

import { useWeb3 } from "@/context/web3Context";
import { formatAddress } from "@/utils/helper";
import { Modal } from '@mantine/core';
import Image from "next/image";
import router from "next/router";
import { useCallback, useState } from "react";
import { NotificationButton } from "../NotificationButton";
import styles from "./index.module.css";

export const WalletConnectButton: React.FC = () => {
    //get user logged in wallet address/ens, get connect wallet function
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { connectWallet, disconnectWallet, address, ens } = useWeb3();
    // const theme = useMantineTheme();
    const [dropdownOpen, setdropdownOpen] = useState(false);
    const [opened, setOpened] = useState(false);

    const showModal = useCallback(async () => {
        // await connectWallet();
        setOpened(true);
    }, [opened]);

    const connect = useCallback(async () => {
        await connectWallet();
        setOpened(false);
        router.push('/profile');
    }, [connectWallet]);

    const hideButton = useCallback(async () => {
        router.push('/');
    }, [dropdownOpen]);
    //if user didn't successfully logged in, we shows the wallet connect button
    //if user logged in, we show the logged in user's ens or edited address
    return (
        <>
            <Modal
                overlayOpacity={0.55}
                overlayBlur={3}
                size="lg"
                centered 
                opened={opened}
                color = '#000'
                onClose={() => setOpened(false)}
            >
                <div className={styles.modalDiv}>
                    <div className={styles.modaltitleDiv}>
                        <h1 className={styles.modalTitle}>CONNECT WITH</h1>
                    </div>
                    <div className={styles.modalwalletDiv}>
                        <div className={styles.modalMetamaskDiv} onClick= {connect}>
                            <Image
                                src="/Metamask.png"
                                width={48}
                                height={48}
                            />
                            <p className={styles.modalwalletP}>Metamask</p>
                        </div>
                        <div className={styles.modalWalletConnectDiv}>
                            <Image
                                src="/Walletconnect.png"
                                width={48}
                                height={48}
                            />
                            <p className={styles.modalwalletP}>Walletconnect</p>
                        </div>
                        <div className={styles.modalCoinBaseDiv}>
                            <Image
                                src="/Coinbase.png"
                                width={48}
                                height={48}
                            />
                            <p className={styles.modalwalletP}>Coinbase</p>
                        </div>
                    </div>
                </div>
            </Modal>
            {!address ? (
                <div className={styles.walletDiv}>
                    <div className={styles.walletPDiv}>
                        <p className={styles.walletp}>Connect Wallet</p>
                    </div>
                    <div onClick={showModal} className={styles.walletIconDiv}>
                        <Image
                            src="/Wallet.png"
                            width={40.96}
                            height={43}
                        />
                    </div>
                </div>
            ) : (
                <>
                <NotificationButton/>
                <div className={styles.walletTotalDiv}>
                    <div className={styles.walletmainDiv}>
                        <div className={styles.walletInfo} onClick = {() => setdropdownOpen(!dropdownOpen)}>
                            {formatAddress(address)}
                            <Image
                                src="/logos_metamask-icon.png"
                                width={23.7}
                                height={22.21}
                            />
                            <br></br>
                        </div>
                    </div>
                    {dropdownOpen == true && (
                        <div className={styles.walletDropdownMen}>
                            <div className={styles.walletProfileDiv} onClick={()=>{router.push('/profile')}}>
                                <img className= {styles.walletSettingIcon} src="/profile.png"/>
                                <p className={styles.walletSettingP}>Profile</p>
                            </div>
                            <div className={styles.walletSettingsDiv} onClick={()=>{router.push('/settings')}}>
                                <img  className= {styles.walletSettingIcon} src="/settings.png"/>
                                <p className={styles.walletSettingP}>Settings</p>
                            </div>
                            <div className={styles.disconnectPanel} onClick={hideButton}>
                                <img
                                    src="/logos_disconnect_icon.png"
                                    className={styles.walletSettingIcon}
                                />
                                <p className={styles.disconnectP}>Disconnect</p>
                                <br></br>
                            </div>
                        </div>
                    )}
                </div>
            </>
            )}
        </>
    );
};

WalletConnectButton.displayName = "WalletConnectButton";
