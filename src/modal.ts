import { customElement } from "aurelia";
import { DialogService } from "./dialog-service";
import template from "./modal.html"

@customElement({ name: 'modal', template })
export class Modal {

    container: HTMLElement;
    popup: HTMLElement;
    cover: HTMLElement;
    keyup: (this: Document, ev: KeyboardEvent) => void;

    constructor(public dialog: DialogService<string>) {
        this.keyup = this.onDocumentKeyUp.bind(this);
    }

    afterAttach(): void {
        setTimeout(() => {
            this.container = document.documentElement;
            this.popup = document.querySelector('.popup-animate');
            this.cover = document.querySelector('.cover');
            this.container.classList.add('ready');
            this.activate('#default-popup');
        }, 50);
    }

    async ok(name: string): Promise<void> {
        await this.deactivate();
        this.dialog.resolve(name === "" ? "mystery guest" : name.toLowerCase());
    }

    async cancel(): Promise<void> {
        await this.deactivate();
        this.dialog.resolve('cancel');
    }

    async onDocumentKeyUp(event): Promise<void> {
        if (event.keyCode === 27) {
            await this.deactivate();
            this.dialog.resolve('cancel');
        }
    }

    activate(selector): void {
        document.addEventListener('keyup', this.keyup, false);
        this.popup = document.querySelector(selector);
        this.popup.classList.add('popup-animate');
        setTimeout(() => {
            this.container.classList.add('active');
        }, 50);
    }

    deactivate(): Promise<unknown> {
        return new Promise((resolve) => {
            const completed = (ev: TransitionEvent): void => {
                ev.preventDefault();
                this.popup.removeEventListener("transitionend", completed, true);
                return resolve();
            };
            document.removeEventListener('keyup', this.keyup, false);
            this.popup.addEventListener("transitionend", completed, true);
            this.popup.classList.remove('popup-animate');
            this.container.classList.remove('active');
        });
    }
}