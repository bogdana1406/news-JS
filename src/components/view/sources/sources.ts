import { NewsSource } from '../../../types/news';
import { getRequiredElement } from '../../../utils/dom';
import './sources.css';

class Sources {
    private readonly container: HTMLElement;

    public constructor() {
        this.container = getRequiredElement<HTMLElement>(document, '.sources');
    }

    public draw(data: ReadonlyArray<NewsSource>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const template: HTMLTemplateElement = getRequiredElement<HTMLTemplateElement>(document, '#sourceItemTemp');

        data.forEach((item: NewsSource): void => {
            if (!item.id) return;

            const clone: DocumentFragment = template.content.cloneNode(true) as DocumentFragment;
            const button: HTMLButtonElement = getRequiredElement<HTMLButtonElement>(clone, '.source__item');
            button.dataset.sourceId = item.id;
            getRequiredElement<HTMLElement>(clone, '.source__item-name').textContent = item.name;
            fragment.append(clone);
        });

        this.container.replaceChildren(fragment);
    }

    public setActive(sourceId: string): void {
        this.container
            .querySelectorAll<HTMLButtonElement>('.source__item')
            .forEach((button: HTMLButtonElement): void => {
                const isActive: boolean = button.dataset.sourceId === sourceId;
                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });
    }

    public getName(sourceId: string): string {
        const button: HTMLButtonElement | undefined = Array.from(
            this.container.querySelectorAll<HTMLButtonElement>('.source__item')
        ).find((item: HTMLButtonElement): boolean => item.dataset.sourceId === sourceId);

        return button?.textContent?.trim() || sourceId;
    }
}

export default Sources;
