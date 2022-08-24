export type Identity = {
    [x: string]: any;
    address: string;
    domain: string;
    ens: string;
    social: {
        twitter: string;
    };
    avatar: string;
    joinTime: number;
    followerCount: number;
    followingCount: number;
};
