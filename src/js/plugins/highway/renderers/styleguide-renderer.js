import DefaultRenderer from './default-renderer';

// import Styleguide from '../../../pages/styleguide';

// let styleguide;

class StyleguideRenderer extends DefaultRenderer {
    onEnter() {
        super.onEnter();
    }
    onLeave() {
        super.onLeave();
    }
    onEnterCompleted() {
        super.onEnterCompleted();

        // styleguide = new Styleguide();
    }
    onLeaveCompleted() {
        super.onLeaveCompleted();

        // styleguide.stopPage();
        // styleguide = null;
    }
}

export default StyleguideRenderer;
