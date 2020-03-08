import DefaultRenderer from './default-renderer';

// import Contact from '../../../pages/contact';

// let contact;

class ContactRenderer extends DefaultRenderer {
    onEnter() {
        super.onEnter();
    }
    onLeave() {
        super.onLeave();
    }
    onEnterCompleted() {
        super.onEnterCompleted();

        // contact = new Contact();
    }
    onLeaveCompleted() {
        super.onLeaveCompleted();

        // contact.stopPage();
        // contact = null;
    }
}

export default ContactRenderer;
