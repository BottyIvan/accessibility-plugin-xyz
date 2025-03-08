import { IElementHandler } from "../Interfaces/IElementHandler";
import { InputHandler, TextAreaHandler, ButtonHandler } from "../Elements";

class Handler {
  private handlers: IElementHandler[];

  constructor() {
    this.handlers = [
      new InputHandler(),
      new TextAreaHandler(),
      new ButtonHandler(),
    ];
  }

  handleFocus(element: HTMLElement): string | undefined {
    for (const handler of this.handlers) {
      const message = handler.handleFocus(element);
      if (message) {
        return message;
      }
    }
    return undefined;
  }
}

export default Handler;
