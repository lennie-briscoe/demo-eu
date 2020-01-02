import store from '../store';

import bindAll from '../utils/bindAll';

// Blocks
import EntrySliderBlock from './entry-slider';

class BlocksController {
    constructor() {
        bindAll(this, []);

        this.initVars();
        this.initBlocks();
    }

    // Init Vars
    initVars() {

        // Blocks

        this.entrySlider = store.body.querySelectorAll('.entry-slider');
        BlocksController.entrySliders = [];

    }

    // Init Blocks
    initBlocks() {
        // console.log('BlocksController: initBlocks()');
        this.addListeners();

        // Blocks

        this.entrySlider.forEach((element, i) => {
            BlocksController.entrySliders[i] = new EntrySliderBlock(BlocksController, element);
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

        BlocksController.entrySliders.forEach(block => {
            block.destroy();
        });
    }

}

export default BlocksController;
