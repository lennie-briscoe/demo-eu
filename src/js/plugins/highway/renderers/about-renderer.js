import DefaultRenderer from './default-renderer';

// import About from '../../../pages/about';

// let about;

class AboutRenderer extends DefaultRenderer {
    onEnter() {
        super.onEnter();
    }
    onLeave() {
        super.onLeave();
    }
    onEnterCompleted() {
        super.onEnterCompleted();

        // about = new About();
    }
    onLeaveCompleted() {
        super.onLeaveCompleted();

        // about.stopPage();
        // about = null;
    }
}

export default AboutRenderer;
