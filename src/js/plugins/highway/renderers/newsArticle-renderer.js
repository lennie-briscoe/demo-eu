import DefaultRenderer from './default-renderer';

import NewsArticle from '../../../pages/news-article';

let newsArticle;

class NewsArticleRenderer extends DefaultRenderer {
    onEnter() {
        super.onEnter();

        newsArticle = new NewsArticle();
    }
    onLeave() {
        super.onLeave();
    }
    onEnterCompleted() {
        super.onEnterCompleted();
    }
    onLeaveCompleted() {
        super.onLeaveCompleted();

        newsArticle.stopPage();
        newsArticle = null;
    }
}

export default NewsArticleRenderer;
