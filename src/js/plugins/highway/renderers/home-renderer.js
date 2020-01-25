import DefaultRenderer from './default-renderer';

// import Home from '../../../pages/home';

// let home;

class HomeRenderer extends DefaultRenderer {
    onEnter() {
        super.onEnter();

        // home = new Home();
    }
    onLeave() {
        super.onLeave();
    }
    onEnterCompleted() {
        super.onEnterCompleted();
    }
    onLeaveCompleted() {
        super.onLeaveCompleted();

        // home.stopPage();
        // home = null;
    }
}

export default HomeRenderer;
