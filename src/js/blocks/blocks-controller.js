import store from '../store';

import bindAll from '../utils/bindAll';

// Blocks
import SliderBlock from './slider';

class BlocksController {
    constructor() {
        bindAll(this, []);

        this.initVars();
        this.initBlocks();
    }

    // Init Vars
    initVars() {

        // Blocks

        this.slider = store.body.querySelectorAll('.slider');
        BlocksController.sliders = [];

    }

    // Init Blocks
    initBlocks() {
        // console.log('BlocksController: initBlocks()');
        this.addListeners();

        // Blocks

        this.slider.forEach((element, i) => {
            BlocksController.sliders[i] = new SliderBlock(BlocksController, element);
        });
    }

    addListeners() {
        const _this = this;


    }

    removeListeners() {
        const _this = this;


    }

    // Stop Blocks
    stopBlocks() {
        console.log('BlocksController: stopBlocks()');

        this.removeListeners();

        BlocksController.sliders.forEach(block => {
            block.destroy();
        });
    }

}

export default BlocksController;
