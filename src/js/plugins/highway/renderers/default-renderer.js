// Plugins
import Highway from '@dogstudio/highway/build/highway';
import { H } from '../../../site';
import LocomotiveScroll from 'locomotive-scroll';
// import sniffer from 'sniffer';

// Core
import store from '../../../store';

// Utils
import bindAll from '../../../utils/bindAll';
// import GlobalRAF from '../../../utils/GlobalRAF';
// import Pointer from '../../../utils/Pointer';

// Events
import EventBus from '../../../utils/EventBus';
// import { Events as GlobalRAFEvents } from '../../../utils/GlobalRAF';
import { Events as GlobalResizeEvents } from '../../../utils/GlobalResize';

// import DefaultPage from '../../../pages/defaultPage';

// let defaultPage;

class DefaultRenderer extends Highway.Renderer {
    onEnter() {
        // console.log('onEnter');

        // defaultPage = new DefaultPage();

        this.el = this.wrap.lastElementChild;

        const pageTemplate = H.location.pathname.split('/')[1];
        const pageName = pageTemplate.length > 1 ? pageTemplate : 'home';
        store.body.dataset.page = pageName;

        const selectedLink = store.body.querySelector('[data-link="' + pageName + '"]');
        if (selectedLink) {
            selectedLink.classList.add('selected');
        }
    }
    onLeave() {
        // console.log('onLeave');
    }
    onEnterCompleted() {
        this.init();

        // console.log('onEnterCompleted');
    }
    onLeaveCompleted() {
        this.destroy();

        store.body.dataset.page = '';

        // defaultPage.stopPage();
        // defaultPage = null;

        // console.log('onLeaveCompleted');
    }

    init() {
        // console.log('init');

        bindAll(this, ['onResize', 'updateScroll', 'scrolling']);

        const _this = this;

        // GlobalRAF.update();

        if (store.isSmooth) {
            // Pointer.init();
            this.initSmooth();
        }

        if (document.readyState === 'complete') {

            this.updateScroll();

        } else {

            window.addEventListener('load', () => {

                store.body.classList.remove('loading');
                // GlobalRAF.update();

                _this.updateScroll();

            });
        }

        EventBus.on(GlobalResizeEvents.RESIZE, _this.onResize);

        document.addEventListener('lazyloaded', _this.updateScroll);

    }

    initSmooth() {
        const _this = this;

        this.locoScroll = new LocomotiveScroll({
            el: document.querySelector('#js-scroll'),
            smooth: true,
            inertia: 1,
            smoothMobile: false
        });

        this.locoScroll.on('scroll', _this.scrolling);
    }

    onResize() {
        this.updateScroll();
    }

    updateScroll() {
        if (store.isSmooth) {

            this.locoScroll.update();

        }
    }

    scrolling(e) {
        const currentScroll = e.scroll.y;

        if (currentScroll >= 50 && !store.body.classList.contains('scrolled')) {
            store.body.classList.add('scrolled');
        } else if (currentScroll < 50 && store.body.classList.contains('scrolled')) {
            store.body.classList.remove('scrolled');
        }

        // Pointer.run();
    }

    destroy() {
        // console.log('destroy');

        const _this = this;

        // if (Pointer) {
        //     Pointer.destroy();
        // }

        if (this.locoScroll) {
            this.locoScroll.destroy();
        }

        document.removeEventListener('lazyloaded', _this.updateScroll);
    }

}

export default DefaultRenderer;
