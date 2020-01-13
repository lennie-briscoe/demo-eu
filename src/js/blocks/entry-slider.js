import Flickity from 'flickity';
import imagesLoaded from 'flickity-imagesloaded';

import store from '../store';
import bindAll from '../utils/bindAll';
// import EventBus from '../utils/EventBus';
// import { Events as GlobalResizeEvents } from '../utils/GlobalResize';

class EntrySliderBlock {
    constructor(BlocksController, slider) {
        // const _this = this;

        this.initVars(BlocksController, slider);

        this.initBlock();
    }

    // Init Vars
    initVars(BlocksController, slider) {
        // bindAll(this, ['onResize', 'sliderPrev', 'sliderNext']);
        bindAll(this, ['sliderPrev', 'sliderNext']);

        this.BlocksController = BlocksController;
        this.slider = slider;

        if (this.slider.classList.contains('slide-wrap')) {
            this.slideWrapAround = true;
            this.slideInitialIndex = 1;
        } else {
            this.slideWrapAround = false;
            this.slideInitialIndex = 0;
        }

        this.sliderBlock = this.slider.closest('.entry-slider-block');

        this.slidePrev = this.sliderBlock.querySelector('.btn-slider-prev');
        this.slideNext = this.sliderBlock.querySelector('.btn-slider-next');

        this.flkty = null;
    }

    // Init Page
    initBlock() {
        // const _this = this;

        this.initEvents();

        if (this.slider) {
            this.initSlider();
        }
    }

    // Init Events
    initEvents() {
        const _this = this;

        window.addEventListener('load', function() {
            _this.flkty.resize();
        });

        // EventBus.on(GlobalResizeEvents.RESIZE, _this.onResize);

        this.slidePrev.addEventListener('click', _this.sliderPrev);
        this.slideNext.addEventListener('click', _this.sliderNext);
    }

    // destroy
    destroy() {
        const _this = this;

        window.removeEventListener('load', function() {
            _this.flkty.resize();
        });

        // EventBus.off(GlobalResizeEvents.RESIZE, _this.onResize);

        this.slidePrev.removeEventListener('click', _this.sliderPrev);
        this.slideNext.removeEventListener('click', _this.sliderNext);
    }

    // Init Slider
    initSlider() {
        const _this = this;

        // Custom
        const applySelectedAttraction = Flickity.prototype.applySelectedAttraction;

        Flickity.prototype.applySelectedAttraction = function() {
            const freeScrollSlowDown = this.options.freeScrollSlowDown;
            if ( freeScrollSlowDown ) {
                this.applyBrakes( freeScrollSlowDown );
            } else {
                applySelectedAttraction.apply( this, arguments );
            }
        };

        Flickity.prototype.applyBrakes = function( freeScrollSlowDown ) {
            // do not apply brakes if pointer down or no slides
            const dragDown = this.isDraggable && this.isPointerDown;
            if ( dragDown || !this.slides.length ) {
                return;
            }
            const distance = this.selectedSlide.target * -1 - this.x;
            const isValidNumber = typeof freeScrollSlowDown == 'number' && freeScrollSlowDown > 0;
            const deceleration = isValidNumber ? freeScrollSlowDown : 20;
            this.velocity = ( distance * (1-this.getFrictionFactor()) ) * deceleration;
        };

        // Flickity Init

        this.flkty = new Flickity(_this.slider, {
            cellSelector: '.slide',
            initialIndex: _this.slideInitialIndex,
            imagesLoaded: true,
            prevNextButtons: false,
            pageDots: false,
            wrapAround: _this.slideWrapAround,
            contain: true,
            adaptiveHeight: true,
            cellAlign: 'center',
            freeScroll: true,
            freeScrollFriction: 0.03,
            freeScrollSlowDown: 1,
            percentPosition: false,
        });
    }

    sliderPrev() {
        this.flkty.previous();
    }

    sliderNext() {
        this.flkty.next();
    }
}

export default EntrySliderBlock;