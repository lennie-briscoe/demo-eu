function splitWord(string) {
    const innerText = string.replace(/\S+/g, '<span><span class="word">$&</span></span>');
    return innerText;
}

export default splitWord;
