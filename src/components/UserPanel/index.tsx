import { useGraph } from "@/context/GraphContext";
import { formatAddress } from "@/utils/helper";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FollowSections } from "./FollowSections";
import styles from "./index.module.css";
import { NftSections } from "./NftSections";
import { PoapsSections } from "./PoapsSections";
import { SocialSection } from './socialSection';

export const UserPanel: React.FC = () => {
    const { selectAddress, identity } = useGraph();
    const [nftCount, setNftCount] = useState(0);
    const [poapsCount, setPoapsCount] = useState(0);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [followList, setFollowList] = useState<boolean>(false);
    const [nftList, showNftList] = useState<boolean>(true);
    const [poapsList, showPoapsList] = useState<boolean>(false);
    const [verifyList, showVerifyList] = useState<boolean>(false);
    const [listType, setListType] = useState(false);

    //fetch the user ether balance from ehterscan API

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await fetch(
                `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}/getNFTs/?owner=${selectAddress}`
            );

            let response;
            if (res.status === 200) {
                response = await res.json();
            }
            setNftCount(response.ownedNfts.length);
            setIsLoading(false);
        })();
    }, [selectAddress]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await fetch(
                `https://api.poap.xyz/actions/scan/${selectAddress}`
            );
            let response;
            if (res.status === 200) {
                response = await res.json();
            }
            setPoapsCount(response.length);
            setIsLoading(false);
        })();
    }, [selectAddress]);

    if (!identity) return null; //only shows UserPanel if all data has loaded
    if (isLoading) return null;

    return (
        <>
            <div className={styles.container}>
                <div className={styles.avatarSection}>
                    {identity.avatar ? (
                        <a
                            rel="noreferrer"
                            href={
                                "https://app.cyberconnect.me/address/" +
                                identity?.address
                            }
                            target={"_blank"}
                        >
                            <img
                                src={identity.avatar}
                                alt={""}
                                width={60}
                                height={60}
                                className={styles.avatar}
                            />
                        </a>
                    ) : (
                        <a
                            rel="noreferrer"
                            href={
                                "https://app.cyberconnect.me/address/" +
                                identity?.address
                            }
                            target={"_blank"}
                        >
                            <img
                                src={"/Sample_User_Icon.png"}
                                alt={""}
                                width={60}
                                height={60}
                                className={styles.avatar}
                            />
                        </a>
                    )}
                    <p className={styles.addressP}>
                        {formatAddress(identity?.address)}
                    </p>
                </div>

                <div className={styles.countSection}>
                    <div className={styles.nftCountSection}>
                        <Typography
                            variant="h3"
                            sx={{
                                ":hover": {
                                    color: "#555",
                                    cursor: "pointer",
                                },
                            }}
                            onClick={() => [
                                setFollowList(false), //sets list modal to show followers
                                showNftList(true),
                                showPoapsList(false),
                                showVerifyList(false),
                            ]}
                        >
                            {nftCount}
                        </Typography>
                        <Typography color={"#989898"}>NFTs</Typography>
                    </div>
                    <div className={styles.connectionCountSection}>
                        <Typography
                            variant="h3"
                            sx={{
                                ":hover": {
                                    color: "#555",
                                    cursor: "pointer",
                                },
                            }}
                            onClick={() => [
                                showNftList(false), //sets list modal to show followers
                                setFollowList(true),
                                showPoapsList(false),
                                showVerifyList(false),
                            ]}
                        >
                            {Number(identity.followerCount + identity.followingCount)}
                        </Typography>
                        <Typography color={"#989898"}>Connections</Typography>
                    </div>
                    <div className={styles.poapsCountSection}>
                        <Typography
                            variant="h3"
                            sx={{
                                ":hover": {
                                    color: "#555",
                                    cursor: "pointer",
                                },
                            }}
                            onClick={() => [
                                setFollowList(false), //sets list modal to show followers
                                showNftList(false),
                                showPoapsList(true),
                                showVerifyList(false),
                            ]}
                        >
                            {poapsCount}
                        </Typography>
                        <Typography color={"#989898"}>POAPS</Typography>
                    </div>
                    <div className={styles.verifiedCountSection}>
                        {identity?.twitter ?
                            (
                                <>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            ":hover": {
                                                color: "#555",
                                                cursor: "pointer",
                                            },
                                        }}
                                        onClick={() => [
                                            setFollowList(false), //sets list modal to show followers
                                            showPoapsList(false),
                                            showNftList(false),
                                            showVerifyList(true),
                                        ]}
                                    >
                                        
                                            {2}
                                    </Typography>
                                    <Typography color={"#989898"}>
                                        Verified ACCOUNTS
                                    </Typography>
                                </>
                            ):
                            (
                                <>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            ":hover": {
                                                color: "#555",
                                                cursor: "pointer",
                                            },
                                        }}
                                        onClick={() => [
                                            setFollowList(false), //sets list modal to show followers
                                            showPoapsList(false),
                                            showNftList(false),
                                            showVerifyList(true),
                                        ]}
                                    >
                                        
                                            {0}
                                    </Typography>
                                    <Typography color={"#989898"}>
                                        Verified ACCOUNTS
                                    </Typography>
                                </>
                            )
                        }
                    </div>
                </div>
                {nftList == true && (
                    <>
                        {nftCount !=0 && (
                            <div className={styles.nftShowSecion}>
                                <NftSections />
                            </div>
                        )}
                        {nftCount == 0 && (
                            <div className={styles.noNftsInSection}>
                                <p>No NFTs</p>
                            </div>
                        )}
                    </>
                )}
                {followList == true && (
                    <>
                        <div className={styles.sectionButtonDiv}>
                            <div className={styles.followersButtonDiv}>
                                <p
                                    className={styles.followersP}
                                    onClick={() => setListType(false)}
                                >
                                    Followers
                                </p>
                            </div>
                            <div className={styles.followingButtonDiv}>
                                <p
                                    className={styles.followingP}
                                    onClick={() => setListType(true)}
                                >
                                    Following
                                </p>
                            </div>
                        </div>
                        <div className={styles.sectionWrapper}>
                            <FollowSections
                                address={selectAddress}
                                listType={listType}
                            />
                        </div>
                    </>
                )}
                {poapsList == true && (
                    <>
                        {poapsCount != 0 &&( 
                            <div className={styles.nftShowSecion}>
                                <PoapsSections />
                            </div>
                        )}
                        {poapsCount == 0 &&(
                            <div className={styles.noNftsInSection}>
                                <p>NO POAPS</p>
                            </div>
                        )}
                    </>
                )}
                {verifyList == true &&(
                    <>
                        <SocialSection
                            address = {identity?.address}
                        />
                    </>
                )}
            </div>
        </>
    );
};

UserPanel.displayName = "UserPanel";
