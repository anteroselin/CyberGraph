import { GET_ADDR_CONNECTION_QUERY } from "@/graphql/queries/get_connections";
import { formatAddress } from "@/utils/helper";
import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

interface Props {
    address: string;
    listType: boolean;
}

export const FollowSections = ({ address, listType }: Props) => {

    const [modalType, setModalType] = useState<any>([]);

    useEffect(() => {
        refetch();

        if(data){
            if(listType)
            {
                setModalType(data.identity.following.list);
            }
            else{
                setModalType(data.identity.followers.list);
            }
        }
    });

    const { data, refetch } = useQuery(GET_ADDR_CONNECTION_QUERY, {
        variables: {
            address: address,
            first: 50,
            after: "-1",
        },
    });

    return (
        <>
            {modalType ?
                modalType.map(
                    (
                        value: {
                            avatar: string;
                            address: string;
                            ens: string;
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
                                            {"ETH SD"}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                )
                :
                (
                    <div className={styles.noNftsInSection}>
                        <p>Empty</p>
                    </div>
                )
            }
        </>
    );
};
