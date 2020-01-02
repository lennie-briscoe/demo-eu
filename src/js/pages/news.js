import store from '../store';

import bindAll from '../utils/bindAll';
// import splitWord from '../utils/splitWord';

class News {
    constructor() {
        bindAll(this, []);

        this.initVars();
        this.initPage();
    }

    // Init Vars
    initVars() {

    }

    // Init Page
    initPage() {
        console.log('News: initPage()');
        this.addListeners();

        // Split Word example usage:
        // elem.innerHTML = splitWord(elem.innerHTML.trim());
    }

    addListeners() {
        const _this = this;


    }

    removeListeners() {
        const _this = this;


    }

    // Stop Page
    stopPage() {
        console.log('News: stopPage()');

        this.removeListeners();
    }

}

export default News;
