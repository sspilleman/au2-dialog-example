export class DialogService<T> {
    private _resolve: ((result: T) => void) | null = null;
    
    getAnswer(): Promise<T> {
        return new Promise((resolve) => {
            this._resolve = resolve;
        });
    }

    resolve(result: T): void {
        this._resolve?.(result);
    }
}