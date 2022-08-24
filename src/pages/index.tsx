import { NavBar } from "@/components/NavBar";
import { LoadingButton } from "@mui/lab";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>DePass</title>
                <meta
                    name="description"
                    content="CyberGraph is a 3D-graph based, user based social connection explorer. It has some cool features like 3d node graph, dynamic loading bar, immersive user experience, cyber mode(10-hops friendship network display) and focus mode(aggregated connection display)."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Verifiable, interoperable, and connected with pace of mind.
                </h1>
                <h2 className={styles.mainText}>
                    All your digital assets in your iOS & Android wallets in
                    seconds.
                </h2>

                <div className={styles.walletDiv}>
                    <LoadingButton className={styles.jumpButton}>
                        Connect Wallet
                    </LoadingButton>
                    <h3 className={styles.walletP}>
                        By connecting your wallet, you agree to our Privacy
                        Policy
                    </h3>
                </div>
            </main>
        </div>
    );
};

export default Home;
