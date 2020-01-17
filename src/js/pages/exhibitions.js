import store from '../store';

import bindAll from '../utils/bindAll';
// import splitWord from '../utils/splitWord';

class Exhibitions {
    constructor() {
        this.initVars();
        this.initPage();
    }

    // Init Vars
    initVars() {
        bindAll(this, ['scrollDown']);

        this.btnDown = store.body.querySelector('.btn-down');
        this.contentBlocks = store.body.querySelector('.content-blocks');
    }

    // Init Page
    initPage() {
        console.log('Exhibitions: initPage()');
        this.addListeners();

        // Split Word example usage:
        // elem.innerHTML = splitWord(elem.innerHTML.trim());
    }

    addListeners() {
        const _this = this;

        this.btnDown.addEventListener('click', _this.scrollDown);
    }

    removeListeners() {
        const _this = this;


    }

    // Stop Page
    stopPage() {
        console.log('Exhibitions: stopPage()');

        this.removeListeners();
    }

    scrollDown() {
        const _this = this;

        store.body.style.pointerEvents = 'none';
        store.locoScroll.scrollTo(_this.contentBlocks, -120);
        setTimeout(() => {
            store.body.style.pointerEvents = 'auto';
        }, 1000);
    }

}

export default Exhibitions;
