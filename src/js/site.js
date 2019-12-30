// Plugins
// import FontFaceObserver from 'fontfaceobserver';
import sniffer from 'sniffer';
import Highway from '@dogstudio/highway/build/highway';
import lazysizes from 'lazysizes';

// GSAP
import { gsap } from "gsap";

// Core
import store from './store';

// Events
import EventBus from './utils/EventBus';
// import { Events as GlobalRAFEvents } from './utils/GlobalRAF';
import { Events as GlobalResizeEvents } from './utils/GlobalResize';

// Utils
import bindAll from './utils/bindAll';

// Highway Renderers
import DefaultRenderer from './plugins/highway/renderers/default-renderer';
import StyleguideRenderer from './plugins/highway/renderers/styleguide-renderer';
import HomeRenderer from './plugins/highway/renderers/home-renderer';

// Highway Transitions
import DefaultTransition from './plugins/highway/transitions/default-transition';
import HomeTransition from './plugins/highway/transitions/home-transition';

window.firstLoad = true;

// Highway
let H;

class App {

    constructor() {
        bindAll(this, ['onResize']);

        this.setup();

        this.init();
    }

    setup() {
        sniffer.addClasses(store.body);
        Object.assign(store, sniffer.getInfos());
        Object.assign(store, {
          isSmooth: sniffer.isDesktop
        });

        // Lazysizes
        // if (store.isSmooth) {
        //     lazysizes.cfg.expFactor = 10;
        //     lazysizes.cfg.expand = 1000;
        //     // lazysizes.cfg.loadMode = 3;
        // }
    }

    init() {
        // const _this = this;

        // const font = new FontFaceObserver('Excellent');

        // font.load().then(function () {
        //     console.log('Excellent has loaded.');
        // });

        this.initH();

        // window.addEventListener('load', () => {
        //     // All assets have loaded
        // }, false);

        // document.addEventListener('lazyloaded', _this.isLazyLoaded);

        EventBus.on(GlobalResizeEvents.RESIZE, this.onResize);

        if (store.isSmooth) {
            "scrollRestoration" in history ? history.scrollRestoration = "manual" : window.onbeforeunload = function() {window.scrollTo(0, 0) };
        }

        store.darkToggle.addEventListener('click', () => {
            store.body.classList.toggle('theme-dark');
        });

    }

    initH() {
        H = new Highway.Core({
            renderers: {
                default: DefaultRenderer,
                styleguide: StyleguideRenderer,
                home: HomeRenderer
            },
            transitions: {
                default: DefaultTransition,
                home: HomeTransition,
                contextual: {
                }
            },
        });

        H.on('NAVIGATE_IN', ({to, location}) => {
            // console.log('in');
            window.scrollTo(0, 0);
            window.firstLoad = false;
            store.body.classList.remove('loading');
        });

        H.on('NAVIGATE_OUT', (from, location) => {
            // console.log('out');
            store.body.classList.remove('first-load');
            store.body.classList.add('loading');
        });

        // H.on('NAVIGATE_END', (to, from, location) => {

            // // Analytics
            // if (typeof gtag !== 'undefined') {
            //     // eslint-disable-next-line
            //     gtag('config', 'UA-XXXXXXXXX-X', {
            //         page_path: location.pathname,
            //         page_title: to.page.title,
            //         page_location: location.href,
            //     });
            // }

            // // Scroll to anchor
            // if (location.anchor) {
            //     const el = document.querySelector(location.anchor);

            //     if (el) {
            //         window.scrollTo(el.offsetLeft, el.offsetTop);
            //     }

        // });
    }

    onResize() {

    }

}

const app = new App();

export { H };
