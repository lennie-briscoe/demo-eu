import DefaultRenderer from './default-renderer';

import Visit from '../../../pages/visit';

let visit;

class VisitRenderer extends DefaultRenderer {
    onEnter() {
        super.onEnter();

        visit = new Visit();
    }
    onLeave() {
        super.onLeave();
    }
    onEnterCompleted() {
        super.onEnterCompleted();
    }
    onLeaveCompleted() {
        super.onLeaveCompleted();

        visit.stopPage();
        visit = null;
    }
}

export default VisitRenderer;
