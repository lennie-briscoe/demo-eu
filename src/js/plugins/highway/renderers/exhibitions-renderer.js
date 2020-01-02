import DefaultRenderer from './default-renderer';

import Exhibitions from '../../../pages/exhibitions';

let exhibitions;

class ExhibitionsRenderer extends DefaultRenderer {
    onEnter() {
        super.onEnter();

        exhibitions = new Exhibitions();
    }
    onLeave() {
        super.onLeave();
    }
    onEnterCompleted() {
        super.onEnterCompleted();
    }
    onLeaveCompleted() {
        super.onLeaveCompleted();

        exhibitions.stopPage();
        exhibitions = null;
    }
}

export default ExhibitionsRenderer;
