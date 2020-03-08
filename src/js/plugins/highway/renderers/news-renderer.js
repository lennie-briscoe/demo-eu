import DefaultRenderer from './default-renderer';

// import News from '../../../pages/news';

// let news;

class NewsRenderer extends DefaultRenderer {
    onEnter() {
        super.onEnter();
    }
    onLeave() {
        super.onLeave();
    }
    onEnterCompleted() {
        super.onEnterCompleted();

        // news = new News();
    }
    onLeaveCompleted() {
        super.onLeaveCompleted();

        // news.stopPage();
        // news = null;
    }
}

export default NewsRenderer;
