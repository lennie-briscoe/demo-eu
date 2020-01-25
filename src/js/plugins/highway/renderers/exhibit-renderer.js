import DefaultRenderer from './default-renderer';

// import Exhibit from '../../../pages/exhibit';

// let exhibit;

class ExhibitRenderer extends DefaultRenderer {
    onEnter() {
        super.onEnter();

        // exhibit = new Exhibit();
    }
    onLeave() {
        super.onLeave();
    }
    onEnterCompleted() {
        super.onEnterCompleted();
    }
    onLeaveCompleted() {
        super.onLeaveCompleted();

        // exhibit.stopPage();
        // exhibit = null;
    }
}

export default ExhibitRenderer;
