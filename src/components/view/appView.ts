import News from './news/news';
import Sources from './sources/sources';
import { NewsResponse, SourcesResponse } from '../../types/news';
import { getRequiredElement } from '../../utils/dom';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;
    private readonly status: HTMLElement;
    private activeSourceId: string | null = null;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.status = getRequiredElement<HTMLElement>(document, '.status');
    }

    public drawNews(data: NewsResponse): void {
        this.news.draw(data.articles);
        this.setStatus(data.articles.length ? '' : 'No headlines are available for this source.');
    }

    public clearNews(): void {
        this.news.draw([]);
    }

    public drawSources(data: SourcesResponse): void {
        this.sources.draw(data.sources);
    }

    public isActiveSource(sourceId: string): boolean {
        return this.activeSourceId === sourceId;
    }

    public setActiveSource(sourceId: string): void {
        this.activeSourceId = sourceId;
        this.sources.setActive(sourceId);
    }

    public setStatus(message: string): void {
        this.status.textContent = message;
        this.status.hidden = !message;
    }
}

export default AppView;
