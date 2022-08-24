//format the address display
export const formatAddress = (address: string) => {
    let len;
    if(address)
    {
        len = address.length;
        return address.substr(0, 7) + "..." + address.substring(len - 4, len);
    }
    
};


export const foramatTokenID = (address: string) => {
    const yourNumber = Number(address);
    const yourstring = yourNumber.toString();

    if(yourstring.length >= 17)
    {
        return yourstring.substr(0,16) + "...";
    }
    else{
        return yourNumber;
    }
    
}

export const isValidAddr = (address: string) => {
    const re = /^0x[a-fA-F0-9]{40}$/;
    return address.match(re);
};
