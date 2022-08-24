import { GET_RECOMMENDATION } from "@/graphql/queries/get_recommendation";
import { formatAddress } from "@/utils/helper";
import { useQuery } from "@apollo/client";
import {
    Blockchain,
    Env,
    FollowButton
} from "@cyberconnect/react-follow-button";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./index.module.css";



interface Props {
    address: string;
}

export const RecommendedSection = ({ address }: Props) => {
    
    const [recommendData, setRecommendData] = useState<any>([]);

    useEffect(() => {
        refetch();
        if(data)
        {
            setRecommendData(data.recommendations.data.list);
            
        }
    });

    const { data, refetch } = useQuery(GET_RECOMMENDATION, {
        variables: {
            address: address,
        },
    });

    return (
        <>
            {recommendData &&
                recommendData.map(
                    (
                        value: {
                            address:string;
                            avatar:string;
                            followerCount:string;
                        }, 
                        index: number
                    ) => {
                    return (
                        <div key={index} className={styles.userInfoSection}>
                            <div className={styles.avatarSection}>
                                <div className={styles.avatarDiv}>
                                    {value.avatar ? (
                                        <img
                                            src={value.avatar}
                                            alt={""}
                                            className={styles.avatar}
                                        />
                                    ) : (
                                        <img
                                            src={"/Sample_User_Icon.png"}
                                            alt={""}
                                            className={styles.avatar}
                                        />
                                    )}
                                </div>
                                <div className={styles.userName}>
                                    <Typography
                                        variant="h6"
                                        paddingLeft={2}
                                        fontSize={13}
                                        sx={{
                                            color: "gray",
                                            fontFamily: "Outfit",
                                        }}
                                    >
                                        {formatAddress(value?.address)}
                                    </Typography>

                                    <Typography
                                        variant="h6"
                                        paddingLeft={2}
                                        fontSize={13}
                                        sx={{
                                            color: "gray",
                                            fontFamily: "Outfit",
                                        }}
                                    >
                                        {value?.followerCount}
                                    </Typography>
                                </div>
                            </div>
                            <div className = {styles.FollowButtonSection}>
                                <FollowButton
                                    provider={window.ethereum}
                                    namespace="CyberGraph"
                                    toAddr={value.address}
                                    env={Env.PRODUCTION}
                                    chain={Blockchain.ETH}
                                    key={value.address}
                                />
                            </div>
                        </div>
                        );
                    }
                )
            }
        </>
    );
};
