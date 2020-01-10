let store = {
    isLoading: true,
    body: document.body,
    width: window.innerWidth,
    height: window.innerHeight,
    darkToggle: document.querySelector('#dark-toggle'),
    cover: document.querySelector('.cover'),
    isDevice: document.body.classList.contains('is-device'),
    isDesktop: document.body.classList.contains('is-desktop'),
    isMobileNav: window.innerWidth < 1024 ? true : false,
    locoScroll: null
};

export default store;
