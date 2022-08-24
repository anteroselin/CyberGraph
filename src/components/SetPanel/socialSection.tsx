/* eslint-disable no-console */

import { GET_SOCIAL } from "@/graphql/queries/get_social";
// import { formatAddress } from "@/utils/helper";
import { useQuery } from "@apollo/client";
// import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

interface Props {
    address: string;
}

export const SocialSection = ({ address }: Props) => {

    const [socialData, setsocialData] = useState<any>([]);

    useEffect(() => {
        refetch();
        console.log(data);
        if(data)
        {
            console.log(1);
            setsocialData(data);
            console.log("data:", socialData);
            // console.log("twitter", socialData.identity.twitter.verified);
        }
    });

    const { data, refetch } = useQuery(GET_SOCIAL, {
        variables: {
            address: address,
        },
    });

    // const recommendData = data.recommendations.data.list;
    // const recommendData = data;
    return (
        <>
            <div className={styles.socialSection}>
                {socialData.identity && socialData.identity.twitter.verified == true && (
                        <div className={styles.twitter}>
                            <div className={styles.twitterImageDiv}>
                                <img src={"/twitter.png"} alt={""} className={styles.twitterImage}/>
                                <img src={"/carbon_overflow-menu-vertical.png"} alt={""} className={styles.twitterImage}/>
                            </div>
                            <div className = {styles.twitterPDiv}>
                                <p >Twitter</p>
                                <a href={"https://twitter.com/" + socialData.identity.handle}>{"@" + socialData.identity.twitter.handle}</a>
                            </div>
                            <div className={styles.verifyDiv}>
                                <img src={"/veirify_icon.png"} alt={""} className={styles.twitterImage}/>
                                <p className={styles.verifiedP}>Verified</p>
                            </div>
                        </div>
                    )
                }
                {socialData.identity && socialData.identity.twitter.verified == false && (
                        <div className={styles.twitter}>
                            <div className={styles.twitterImageDiv}>
                                <img src={"/twitter.png"} alt={""} className={styles.twitterImage}/>
                                <img src={"/carbon_overflow-menu-vertical.png"} alt={""} className={styles.twitterImage}/>
                            </div>
                            <div className = {styles.twitterPDiv}>
                                <p >Twitter</p>
                                <a href={"https://twitter.com/" + socialData.identity.twitter.handle}>No Name</a>
                            </div>
                            <div className={styles.verifyDiv}>
                                <p className={styles.verifiedP}>Unverified</p>
                            </div>
                        </div>
                )}
                <div className={styles.github}>
                    <div className={styles.twitterImageDiv}>
                        <img src={"/github_icon.png"} alt={""} className={styles.twitterImage}/>
                        <img src={"/carbon_overflow-menu-vertical.png"} alt={""} className={styles.twitterImage}/>
                    </div>
                    <div className = {styles.twitterPDiv}>
                        <p >Github</p>
                        <a href = {"https://Github.com"} >Connect to Github</a>
                    </div>
                </div>
            </div>
        </>
    );
};
