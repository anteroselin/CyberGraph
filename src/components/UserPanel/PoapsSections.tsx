/* eslint-disable no-console */
import { useGraph } from "@/context/GraphContext";
import { CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

export const PoapsSections: React.FC = ({}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { selectAddress } = useGraph();
    const [poaps, setPoaps] = useState<any>([]);

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
            console.log(response);
            setPoaps(response);
            setIsLoading(false);
        })();
    }, [selectAddress]);

    return (
        <>
            {isLoading && <CircularProgress />}
            {poaps?.length != 0 &&
                poaps.map((poap: any, index: number) => (
                    <div key={index} className={styles.poapCardDiv}>
                        <div className={styles.poapItemDiv}>
                            <img
                                src={poap.event.image_url}
                                width={230}
                                height={204}
                                className={styles.poapImage}
                            />
                        </div>
                        <div className={styles.poapNameDiv}>
                            <p className={styles.poapnameP}>
                                {poap.event.name}
                            </p>
                        </div>
                        <div className={styles.poapDescriptionDiv}>
                            <p className={styles.poapdescriptionP}>
                                {poap.event.description}
                            </p>
                        </div>
                        <div className={styles.poapCreateDateDiv}>
                            <p className={styles.poapCreateDateP}>
                                {poap.created}
                            </p>
                        </div>
                    </div>
                ))}
            {poaps?.length == 0 && (
                <Typography className={styles.noNftsInSection}>
                    No POAPS
                </Typography>
            )}
        </>
    );
};
