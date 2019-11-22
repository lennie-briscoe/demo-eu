let store = {
    body: document.body,
    width: window.innerWidth,
    height: window.innerHeight,
    cover: document.querySelector('.cover'),
    isDevice: document.body.classList.contains('is-device')
};

export default store;
