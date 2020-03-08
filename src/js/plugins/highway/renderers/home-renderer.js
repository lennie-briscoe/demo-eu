import DefaultRenderer from './default-renderer';

// import Home from '../../../pages/home';

// let home;

class HomeRenderer extends DefaultRenderer {
    onEnter() {
        super.onEnter();
    }
    onLeave() {
        super.onLeave();
    }
    onEnterCompleted() {
        super.onEnterCompleted();

        // home = new Home();
    }
    onLeaveCompleted() {
        super.onLeaveCompleted();

        // home.stopPage();
        // home = null;
    }
}

export default HomeRenderer;
