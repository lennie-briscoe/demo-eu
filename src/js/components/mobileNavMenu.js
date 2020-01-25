import { gsap } from 'gsap';

import store from '../store';
import bindAll from '../utils/bindAll';
import EventBus from '../utils/EventBus';
import { Events as GlobalResizeEvents } from '../utils/GlobalResize';

class MobileNavMenu {
    constructor() {
        // const _this = this;

        this.initVars();
        this.initAnimations();
        this.initComponent();
    }

    // Init Vars
    initVars() {
        bindAll(this, ['onResize', 'mobileNavMenuToggle']);

        this.btnMobileNav = store.body.querySelector('.btn-mobile-nav');
        this.btnMobileNavLine2 = store.body.querySelector('.btn-mobile-nav .line-2');
        this.btnMobileNavLine3 = store.body.querySelector('.btn-mobile-nav .line-3');

        this.mobileNavMenu = store.body.querySelector('.mobile-nav-menu');
        this.mobileNavMenuLinks = store.body.querySelectorAll('.mobile-nav-menu .link-text');

        this.mobileNavMenuTl = null;

        this.isOpen = false;
    }

    initAnimations() {
        const _this = this;

        this.mobileNavMenuTl = gsap.timeline({paused: true});

        this.mobileNavMenuTl.to(_this.btnMobileNavLine2, {
            scaleX: 0.5,
            duration: 0.4,
            ease: 'power2.inOut'
        }).to(_this.btnMobileNavLine3, {
            scaleX: 0.5,
            duration: 0.4,
            ease: 'power2.inOut'
        }, 0.1)
        .to(_this.mobileNavMenu, {
            'pointer-events': 'all',
            opacity: 1,
            duration: 0.3
        }, 0)
        .to(_this.mobileNavMenuLinks, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out'
        }, 0.3);
    }

    // Init Page
    initComponent() {
        // const _this = this;

        this.initEvents();
    }

    // Init Events
    initEvents() {
        const _this = this;

        EventBus.on(GlobalResizeEvents.RESIZE, _this.onResize);

        this.btnMobileNav.addEventListener('click', _this.mobileNavMenuToggle);
    }

    // destroy
    destroy() {
        const _this = this;

        EventBus.off(GlobalResizeEvents.RESIZE, _this.onResize);
    }

    // Resize
    onResize() {
        // console.log('resize');
    }

    // Mobile Nav Menu - Toggle
    mobileNavMenuToggle() {
        if (this.isOpen) {
            this.mobileNavMenuClose();
        } else {
            this.mobileNavMenuOpen();
        }
    }

    // Mobile Nav Menu - Open
    mobileNavMenuOpen() {
        this.isOpen = true;
        this.mobileNavMenuTl.play();
    }

    // Mobile Nav Menu - Close
    mobileNavMenuClose() {
        this.isOpen = false;
        this.mobileNavMenuTl.reverse();
    }

}

export const GlobalMobileNavMenu = new MobileNavMenu();
