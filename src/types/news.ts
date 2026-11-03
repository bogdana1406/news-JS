export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export interface NewsSource {
    id: string | null;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface NewsArticle {
    source: Pick<NewsSource, 'id' | 'name'>;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content?: string | null;
}

export interface SourcesResponse {
    status: 'ok';
    sources: NewsSource[];
}

export interface NewsResponse {
    status: 'ok';
    totalResults: number;
    articles: NewsArticle[];
}

export interface ApiFailure {
    status: 'error';
    code?: string;
    message: string;
}

export interface ApiResponseMap {
    [Endpoint.Sources]: SourcesResponse;
    [Endpoint.Everything]: NewsResponse;
}

export type ApiResult<T> = T | ApiFailure;
export type QueryOptions = Partial<Record<'apiKey' | 'sources' | 'pageSize', string | number>>;
export type ApiRequest<T extends Endpoint> = Readonly<{
    endpoint: T;
    options?: Readonly<QueryOptions>;
}>;
export type ResponseCallback<T> = (data: T) => void;
export type ErrorCallback = (message: string) => void;
