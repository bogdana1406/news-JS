import { NewsArticle } from '../../../types/news';
import { getRequiredElement } from '../../../utils/dom';
import './news.css';

class News {
    public draw(data: ReadonlyArray<NewsArticle>): void {
        const news: ReadonlyArray<NewsArticle> = data.slice(0, 10);
        const fragment: DocumentFragment = document.createDocumentFragment();
        const template: HTMLTemplateElement = getRequiredElement<HTMLTemplateElement>(document, '#newsItemTemp');
        const container: HTMLElement = getRequiredElement<HTMLElement>(document, '.news');

        news.forEach((item: NewsArticle, index: number): void => {
            const clone: DocumentFragment = template.content.cloneNode(true) as DocumentFragment;
            const article: HTMLElement = getRequiredElement<HTMLElement>(clone, '.news__item');
            const photo: HTMLImageElement = getRequiredElement<HTMLImageElement>(clone, '.news__meta-photo');
            const publishedDate: Date = new Date(item.publishedAt);

            if (index % 2 === 1) article.classList.add('alt');

            if (item.urlToImage) {
                photo.src = item.urlToImage;
            } else {
                photo.hidden = true;
            }
            const author: string = item.author && !item.author.startsWith('http') ? item.author : item.source.name;
            getRequiredElement<HTMLElement>(clone, '.news__meta-author').textContent = author;
            getRequiredElement<HTMLElement>(clone, '.news__meta-date').textContent = Number.isNaN(
                publishedDate.getTime()
            )
                ? ''
                : publishedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            getRequiredElement<HTMLElement>(clone, '.news__description-title').textContent = item.title;
            getRequiredElement<HTMLElement>(clone, '.news__description-source').textContent = item.source.name;
            getRequiredElement<HTMLElement>(clone, '.news__description-content').textContent =
                item.description || 'Open the article to read the full story.';

            const link: HTMLAnchorElement = getRequiredElement<HTMLAnchorElement>(clone, '.news__read-more a');
            link.href = item.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.setAttribute('aria-label', `Read story: ${item.title}`);

            fragment.append(clone);
        });

        container.replaceChildren(fragment);
    }
}

export default News;
