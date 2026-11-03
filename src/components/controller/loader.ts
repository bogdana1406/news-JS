import {
    ApiRequest,
    ApiResponseMap,
    ApiResult,
    Endpoint,
    ErrorCallback,
    QueryOptions,
    ResponseCallback,
} from '../../types/news';

class Loader {
    private readonly baseLink: string;
    private readonly options: Readonly<QueryOptions>;
    protected readonly useMocks: boolean;

    public constructor(baseLink: string, options: Readonly<QueryOptions> = {}, useMocks: boolean = false) {
        this.baseLink = baseLink.endsWith('/') ? baseLink : `${baseLink}/`;
        this.options = options;
        this.useMocks = useMocks;
    }

    public async getResp<T extends Endpoint>(
        request: ApiRequest<T>,
        callback: ResponseCallback<ApiResponseMap[T]>,
        onError: ErrorCallback
    ): Promise<void> {
        try {
            const response: Response = await fetch(this.makeUrl(request));

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data: ApiResult<ApiResponseMap[T]> = (await response.json()) as ApiResult<ApiResponseMap[T]>;

            if (data.status === 'error') {
                throw new Error(data.message);
            }

            callback(data);
        } catch (error: unknown) {
            onError(error instanceof Error ? error.message : 'An unknown request error occurred.');
        }
    }

    private makeUrl<T extends Endpoint>(request: ApiRequest<T>): string {
        const endpoint: string = this.useMocks ? `mocks/${request.endpoint}` : request.endpoint;
        const url: URL = new URL(endpoint, this.baseLink);
        const options: Readonly<QueryOptions> = { ...this.options, ...request.options };

        Object.entries(options).forEach(([key, value]: [string, string | number]): void => {
            url.searchParams.set(key, String(value));
        });

        return url.toString();
    }
}

export default Loader;
