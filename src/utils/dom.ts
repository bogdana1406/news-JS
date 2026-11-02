export function getRequiredElement<T extends Element>(root: ParentNode, selector: string): T {
    const element: T | null = root.querySelector<T>(selector);

    if (!element) {
        throw new Error(`Required element is missing: ${selector}`);
    }

    return element;
}
