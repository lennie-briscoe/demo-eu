import DefaultRenderer from './default-renderer';

// import NewsArticle from '../../../pages/news-article';

// let newsArticle;

class NewsArticleRenderer extends DefaultRenderer {
    onEnter() {
        super.onEnter();
    }
    onLeave() {
        super.onLeave();
    }
    onEnterCompleted() {
        super.onEnterCompleted();

        // newsArticle = new NewsArticle();
    }
    onLeaveCompleted() {
        super.onLeaveCompleted();

        // newsArticle.stopPage();
        // newsArticle = null;
    }
}

export default NewsArticleRenderer;
