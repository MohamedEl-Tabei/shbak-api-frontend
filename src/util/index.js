const copyTextToClipboard = (event) => {
    const value = event.currentTarget.title;
    navigator.clipboard.writeText(value);
};


let Util={
    copyTextToClipboard
}
export default Util