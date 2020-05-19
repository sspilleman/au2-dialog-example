import { Constructable } from "aurelia";
import { Modal } from "./modal";
import { DialogService } from "./dialog-service";

export class Welcome {
  public subject: Constructable | undefined;
  public result: string;

  constructor(public dialog: DialogService<string>) { }

  async showModal(): Promise<void> {
    this.subject = Modal;
    const result = await this.dialog.getAnswer();
    this.result = result === "cancel" ? "You cancelled!" : `Hello ${result}`;
    this.subject = undefined;
  }
}
