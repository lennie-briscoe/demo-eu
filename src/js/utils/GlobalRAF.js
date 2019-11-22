import sniffer from 'sniffer';
import { gsap } from "gsap";

import store from '../store';
import bindAll from './bindAll';
// import math from './math';

import EventBus from './EventBus';
import { Events as GlobalResizeEvents } from '../utils/GlobalResize';

class GlobalRAF {

    constructor() {
        bindAll(this, ['tick', 'update', 'onResize']);

        gsap.ticker.addEventListener('tick', this.tick);

        Object.assign(store, {
            isSmooth: sniffer.isDesktop
        });

        this.addListeners();
    }

    tick() {
        EventBus.emit(GlobalRAF.events.TICK, {
            // target: this.state.target,
            // current: this.state.current,
        });
    }

    update() {

    }

    onResize() {
        // Object.assign(store, {
        //     width: window.innerWidth,
        //     height: window.innerHeight
        // });
    }

    addListeners() {
        EventBus.on(GlobalResizeEvents.RESIZE, this.onResize);
    }
}

GlobalRAF.events = {
    TICK: 'TICK'
};

export default new GlobalRAF();
export const Events = GlobalRAF.events;
