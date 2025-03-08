import { IElementHandler } from "../Interfaces/IElementHandler";

class InputHandler implements IElementHandler {
  handleFocus(input: HTMLElement): string | undefined {
    if (!(input instanceof HTMLInputElement)) {
      return undefined;
    }

    const accessibilityMessages: string[] = [];
    this.addRequiredMessage(input, accessibilityMessages);
    this.addTypeMessage(input, accessibilityMessages);
    this.addMaxLengthMessage(input, accessibilityMessages);
    this.addReadOnlyMessage(input, accessibilityMessages);
    this.addPlaceholderMessage(input, accessibilityMessages);
    this.addDisabledMessage(input, accessibilityMessages);

    return accessibilityMessages.join(" ");
  }

  private addRequiredMessage(input: HTMLInputElement, messages: string[]): void {
    if (input.required) {
      messages.push("This input field is required.");
    }
  }

  private addTypeMessage(input: HTMLInputElement, messages: string[]): void {
    if (input.type) {
      messages.push(`Input type: ${input.type}.`);
    }
  }

  private addMaxLengthMessage(input: HTMLInputElement, messages: string[]): void {
    if (input.maxLength > 0) {
      messages.push(`The maximum length is ${input.maxLength} characters.`);
    }
  }

  private addReadOnlyMessage(input: HTMLInputElement, messages: string[]): void {
    if (input.readOnly) {
      messages.push("This input field is read-only.");
    }
  }

  private addPlaceholderMessage(input: HTMLInputElement, messages: string[]): void {
    if (input.placeholder) {
      messages.push(`Placeholder: ${input.placeholder}`);
    }
  }

  private addDisabledMessage(input: HTMLInputElement, messages: string[]): void {
    if (input.disabled) {
      messages.push("This input field is disabled.");
    }
  }
}

export default InputHandler;
