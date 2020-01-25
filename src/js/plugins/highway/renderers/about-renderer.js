import DefaultRenderer from './default-renderer';

// import About from '../../../pages/about';

// let about;

class AboutRenderer extends DefaultRenderer {
    onEnter() {
        super.onEnter();

        // about = new About();
    }
    onLeave() {
        super.onLeave();
    }
    onEnterCompleted() {
        super.onEnterCompleted();
    }
    onLeaveCompleted() {
        super.onLeaveCompleted();

        // about.stopPage();
        // about = null;
    }
}

export default AboutRenderer;
