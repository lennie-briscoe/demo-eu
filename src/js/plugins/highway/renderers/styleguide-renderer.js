import DefaultRenderer from './default-renderer';

import Styleguide from '../../../pages/styleguide';

let styleguide;

class StyleguideRenderer extends DefaultRenderer {
    onEnter() {
        super.onEnter();

        styleguide = new Styleguide();
    }
    onLeave() {
        super.onLeave();
    }
    onEnterCompleted() {
        super.onEnterCompleted();
    }
    onLeaveCompleted() {
        super.onLeaveCompleted();

        styleguide.stopPage();
        styleguide = null;
    }
}

export default StyleguideRenderer;
