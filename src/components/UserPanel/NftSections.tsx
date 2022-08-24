/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGraph } from "@/context/GraphContext";
import { useWeb3 } from "@/context/web3Context";
import { foramatTokenID, formatAddress } from "@/utils/helper";
import { Modal } from '@mantine/core';
import { CircularProgress } from "@mui/material";
import Image from 'next/image';
import { Loading } from "notiflix";
import { useCallback, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import styles from "./index.module.css";

export const NftSections: React.FC = ({}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { selectAddress} = useGraph();
    const { address } = useWeb3();
    const [nftCount, setNftCount] = useState(0);
    const [poapsCount, setPoapsCount] = useState(0);
    const [nfts, setNfts] = useState<any>([]);
    const [nftModalInfo, setNftModalInfo] = useState<any>(null);
    const [showList, setShowList] = useState(false);
    const [listType, setListType] = useState(false);
    const [nftID, setNftId] = useState(0);

    const [qrData, setqrData] = useState("");
    const [dropdownOpen, setdropdownOpen] = useState(false);
    const [opened, setOpened] = useState(false);

    // if (!identity) return null; //only shows UserPanel if all data has loaded
    // if (isLoading) return null;

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
            console.log(response.ownerNfts);
            setNfts(response.ownedNfts);
            setNftCount(response.ownedNfts.length);
            setIsLoading(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectAddress]);

    const sleep = (ms: number | undefined) => {
        // alert(ms);
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const showModal = useCallback(
        async (index: number) => {
            Loading.standard();
            setNftId(index);
            sleep(3000);
            Loading.remove();
            setOpened(true);
            if (nfts.length != 0) {
                const imgUrl =
                    nfts[index].metadata?.image_url ||
                    nfts[index].metadata?.image ||
                    null;
                const Data = String(
                    nfts[index].title + nfts[index].description + imgUrl
                );
                setqrData(Data);
            }
        },
        [opened]
    );

    const getImageUrl = (nft: any) => {
        let imgUrl = nft.metadata?.image_url || nft.metadata?.image || null;
        // convert ipfs urls to use gateway
        if (imgUrl?.startsWith("ipfs://ipfs/")) {
            imgUrl = imgUrl.replace("ipfs://", "https://ipfs.io/");
        } else if (imgUrl?.startsWith("ipfs://")) {
            imgUrl = imgUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
        }
        return imgUrl;
    };

    return (
        <>
            <Modal
                overlayOpacity={0.55}
                overlayBlur={3}
                size="sm"
                centered
                opened={opened}
                onClose={() => setOpened(false)}
            >
                {nfts?.length != 0 && (
                    <div className={styles.nftModalShowSecion}>
                        <div className={styles.nftCardDiv}>
                            <div className={styles.nftsItemDiv}>
                                <img
                                    src={getImageUrl(nfts[nftID])}
                                    width={230}
                                    height={204}
                                    className={styles.nftsImage}
                                />
                            </div>
                            <div className={styles.nftOwnerAddressDiv}>
                                <p className={styles.descriptionP}>
                                    Owner Address:
                                </p>
                                <p className={styles.answerP}>
                                    {formatAddress(selectAddress)}
                                </p>
                            </div>
                            <div className={styles.nftContractAddressDiv}>
                                <p className={styles.descriptionP}>
                                    Contract Address:
                                </p>
                                <p className={styles.answerP}>
                                    {formatAddress(
                                        nfts[nftID].contract.address
                                    )}
                                </p>
                            </div>
                            <div className={styles.nftTokenIDDiv}>
                                <p className={styles.descriptionP}>Token ID:</p>
                                <p className={styles.answerP}>
                                    {foramatTokenID(nfts[nftID].id.tokenId)}
                                </p>
                            </div>
                            <div className={styles.nftNetworkDiv}>
                                <p className={styles.descriptionP}>Network:</p>
                                <p className={styles.answerP}>Ethereum</p>
                            </div>
                            <div className={styles.nftQrDiv}>
                                <QRCode value={qrData} level="L" size={140} />
                            </div>
                            <div className={styles.nftModalButtonDiv}>
                                <div className={styles.nftModalAppleDiv}>
                                    <Image
                                        src={"/Apple_icon.png"}
                                        width={12.9}
                                        height={12.9}
                                    />
                                    <p className={styles.nftModalAppleP}>
                                        Add to Apple Wallet
                                    </p>
                                </div>
                                <div className={styles.nftModalGoogleDiv}>
                                    <Image
                                        src={"/Google_icon.png"}
                                        width={12.9}
                                        height={12.9}
                                    />
                                    <p className={styles.nftModalGoogleP}>
                                        Add to Google Wallet
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                ;
            </Modal>
            {isLoading && <CircularProgress />}
            {nfts?.length != 0 &&
                nfts.map((nft: any, index: number) => (
                    <div key={index} className={styles.nftCardDiv}>
                        <div className={styles.nftsItemDiv}>
                            <img
                                src={getImageUrl(nft)}
                                width={230}
                                height={204}
                                className={styles.nftsImage}
                            />
                        </div>
                        <div className={styles.nftOwnerAddressDiv}>
                            <p className={styles.descriptionP}>
                                Owner Address:
                            </p>
                            <p className={styles.answerP}>
                                {formatAddress(selectAddress)}
                            </p>
                        </div>
                        <div className={styles.nftContractAddressDiv}>
                            <p className={styles.descriptionP}>
                                Contract Address:
                            </p>
                            <p className={styles.answerP}>
                                {formatAddress(nft.contract.address)}
                            </p>
                        </div>
                        <div className={styles.nftTokenIDDiv}>
                            <p className={styles.descriptionP}>Token ID:</p>
                            <p className={styles.answerP}>
                                {foramatTokenID(nft.id.tokenId)}
                            </p>
                        </div>
                        <div className={styles.nftNetworkDiv}>
                            <p className={styles.descriptionP}>Network:</p>
                            <p className={styles.answerP}>Ethereum</p>
                        </div>
                        <div className={styles.actionDiv}>
                            <div
                                className={styles.nftCreatePassDiv}
                                onClick={() => showModal(index)}
                            >
                                <p className={styles.passButton}>Create Pass</p>
                            </div>

                            <div>
                                <a
                                    href={
                                        "https://opensea.io/" + selectAddress
                                    }
                                    className={styles.openseaP}
                                >
                                    View on Opensea
                                </a>
                            </div>
                        </div>
                    </div>
                ))
            }
            {nfts?.length == 0 && (
                <div className={styles.noNftsInSection}>
                    <p>Empty</p>
                </div>
            )}
        </>
    );
};
