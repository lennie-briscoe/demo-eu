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

// import DefaultPage from '../../../pages/default-page';

// Blocks
import BlocksController from '../../../blocks/blocks-controller';

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
        this.initVars();
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

    initVars() {
        this.contentBlocks = store.body.querySelector('.content-blocks');
    }

    init() {
        // console.log('init');

        bindAll(this, ['onResize', 'updateScroll', 'onScroll']);

        const _this = this;

        // GlobalRAF.update();

        if (store.isSmooth) {
            // Pointer.init();
        }
        this.initLocoScroll();

        this.scrolled = false;

        if (document.readyState === 'complete') {

            this.updateScroll();

        } else {

            window.addEventListener('load', () => {

                store.body.classList.remove('loading');
                store.isLoading = false;
                // GlobalRAF.update();

                _this.updateScroll();

            });
        }

        EventBus.on(GlobalResizeEvents.RESIZE, _this.onResize);

        document.addEventListener('lazyloaded', _this.updateScroll);

        // Blocks
        if (this.contentBlocks) {
            this.blocksController = new BlocksController();
        }

    }

    initLocoScroll() {
        const _this = this;

        this.locoScroll = new LocomotiveScroll({
            el: document.querySelector('#loco-scroll'),
            smooth: true,
            // inertia: 1,
            // smoothMobile: true,
        });

        store.locoScroll = this.locoScroll;

        this.locoScroll.on('scroll', _this.onScroll);
    }

    onResize() {
        this.updateScroll();
    }

    updateScroll() {
        if (store.isSmooth) {
            this.locoScroll.update();
        }
    }

    onScroll(e) {
        const currentScroll = e.scroll.y;

        EventBus.emit('scroll', e);

        if (currentScroll >= 50 && !this.scrolled) {
            store.body.classList.add('scrolled');
            this.scrolled = true;
        } else if (currentScroll < 50 && this.scrolled) {
            store.body.classList.remove('scrolled');
            this.scrolled = false;
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
            store.locoScroll = null;
        }

        document.removeEventListener('lazyloaded', _this.updateScroll);

        if (this.blocksController) {
            this.blocksController.stopBlocks();
        }
    }

}

export default DefaultRenderer;
