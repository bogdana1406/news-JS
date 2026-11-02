import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsResponse, SourcesResponse } from '../../types/news';
import { getRequiredElement } from '../../utils/dom';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;
    private newsRequestId: number = 0;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesContainer: HTMLElement = getRequiredElement<HTMLElement>(document, '.sources');

        sourcesContainer.addEventListener('click', (event: MouseEvent): void => {
            if (!(event.target instanceof Element)) return;

            const sourceButton: HTMLButtonElement | null = event.target.closest<HTMLButtonElement>('.source__item');
            const sourceId: string | undefined = sourceButton?.dataset.sourceId;

            if (sourceId && sourcesContainer.contains(sourceButton)) {
                this.selectSource(sourceId);
            }
        });

        this.view.setStatus('Loading sources…');
        void this.controller.getSources(
            (data: SourcesResponse): void => {
                this.view.drawSources(data);
                const firstSourceId: string | null | undefined = data.sources[0]?.id;

                if (firstSourceId) {
                    this.selectSource(firstSourceId);
                } else {
                    this.view.setStatus('No sources are available right now.');
                }
            },
            (message: string): void => this.view.setStatus(`Could not load sources: ${message}`)
        );
    }

    private selectSource(sourceId: string): void {
        if (this.view.isActiveSource(sourceId)) return;

        this.view.setActiveSource(sourceId);
        this.view.clearNews();
        this.view.setStatus('Loading headlines…');
        const requestId: number = ++this.newsRequestId;
        void this.controller.getNews(
            sourceId,
            (data: NewsResponse): void => {
                if (requestId === this.newsRequestId) this.view.drawNews(data);
            },
            (message: string): void => {
                if (requestId === this.newsRequestId) this.view.setStatus(`Could not load headlines: ${message}`);
            }
        );
    }
}

export default App;
