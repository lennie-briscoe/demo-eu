import bindAll from '../utils/bindAll';

import EventBus from './EventBus';

class Pointer {

    constructor() {
        bindAll(this, ['run']);

        this.isRunning = false;
    }

    run() {
        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
            this.isRunning = false;
            this.togglePointers('all');
        }, 300);

        if (!this.isRunning) {
            this.isRunning = true;
            this.togglePointers('none');
        }
    }

    togglePointers(state) {
        for (let i = 0; i < this.totalElems; i++) {
            this.elems[i].style.pointerEvents = state;
        }
    }

    addListeners() {
        // EventBus.on(ScrollController.SCROLL, this.run);
    }

    removeListeners() {
        // EventBus.on(ScrollController.SCROLL, this.run);
    }

    destroy() {
        this.removeListeners();

        this.running = null;
        this.timer = null;
        this.elems = null;
        this.totalElems = null;
    }

    init() {
        this.elems = document.querySelectorAll('.js-has-hover');
        this.totalElems = this.elems.length;

        this.addListeners();
    }
}

export default new Pointer();
