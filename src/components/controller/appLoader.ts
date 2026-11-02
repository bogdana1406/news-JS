import Loader from './loader';
import { QueryOptions } from '../../types/news';

class AppLoader extends Loader {
    public constructor() {
        const apiKey: string = process.env.API_KEY ?? '';
        const options: Readonly<QueryOptions> = apiKey ? { apiKey } : {};

        super(process.env.API_URL ?? 'https://rss-news-api.onrender.com/', options, !apiKey);
    }
}

export default AppLoader;
