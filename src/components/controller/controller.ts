import AppLoader from './appLoader';
import { Endpoint, ErrorCallback, NewsResponse, NewsSource, ResponseCallback, SourcesResponse } from '../../types/news';

class AppController extends AppLoader {
    public getPreferredSourceId(sources: ReadonlyArray<NewsSource>): string | undefined {
        const preferredId: string = this.useMocks ? 'abc-news' : 'bbc-news';
        return (
            sources.find((source: NewsSource): boolean => source.id === preferredId)?.id ??
            sources.find((source: NewsSource): boolean => Boolean(source.id))?.id ??
            undefined
        );
    }

    public getSources(callback: ResponseCallback<SourcesResponse>, onError: ErrorCallback): Promise<void> {
        return super.getResp({ endpoint: Endpoint.Sources }, callback, onError);
    }

    public getNews(sourceId: string, callback: ResponseCallback<NewsResponse>, onError: ErrorCallback): Promise<void> {
        return super.getResp(
            {
                endpoint: Endpoint.Everything,
                options: { sources: sourceId, pageSize: 10 },
            },
            (data: NewsResponse): void => {
                if (!this.useMocks) {
                    callback(data);
                    return;
                }

                const articles: NewsResponse['articles'] = data.articles.filter(
                    (article): boolean => article.source.id === sourceId
                );
                callback({ ...data, articles, totalResults: articles.length });
            },
            onError
        );
    }
}

export default AppController;
