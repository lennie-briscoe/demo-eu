import DefaultRenderer from './default-renderer';

import Contact from '../../../pages/contact';

let contact;

class ContactRenderer extends DefaultRenderer {
    onEnter() {
        super.onEnter();

        contact = new Contact();
    }
    onLeave() {
        super.onLeave();
    }
    onEnterCompleted() {
        super.onEnterCompleted();
    }
    onLeaveCompleted() {
        super.onLeaveCompleted();

        contact.stopPage();
        contact = null;
    }
}

export default ContactRenderer;
