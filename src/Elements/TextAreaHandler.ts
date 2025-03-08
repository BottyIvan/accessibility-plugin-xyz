import { IElementHandler } from "../Interfaces/IElementHandler";

class TextAreaHandler implements IElementHandler {
  handleFocus(textArea: HTMLElement): string | undefined {
    if (!(textArea instanceof HTMLTextAreaElement)) {
      return undefined;
    }

    const accessibilityMessages: string[] = [];
    this.addRequiredMessage(textArea, accessibilityMessages);
    this.addRowMessage(textArea, accessibilityMessages);
    this.addMaxLengthMessage(textArea, accessibilityMessages);
    this.addReadOnlyMessage(textArea, accessibilityMessages);
    this.addPlaceholderMessage(textArea, accessibilityMessages);
    this.addDisabledMessage(textArea, accessibilityMessages);

    return accessibilityMessages.join(" ");
  }

  private addRequiredMessage(textArea: HTMLTextAreaElement, messages: string[]): void {
    if (textArea.required) {
      messages.push("This text area is required.");
    }
  }

  private addRowMessage(textArea: HTMLTextAreaElement, messages: string[]): void {
    if (textArea.rows > 1) {
      const rowMessage =
        `This text area has ${textArea.rows} row` +
        (textArea.rows > 1 ? "s" : "") +
        ".";
      messages.push(rowMessage);
    }
  }

  private addMaxLengthMessage(textArea: HTMLTextAreaElement, messages: string[]): void {
    if (textArea.maxLength > 0) {
      messages.push(`The maximum length is ${textArea.maxLength} characters.`);
    }
  }

  private addReadOnlyMessage(textArea: HTMLTextAreaElement, messages: string[]): void {
    if (textArea.readOnly) {
      messages.push("This text area is read-only.");
    }
  }

  private addPlaceholderMessage(textArea: HTMLTextAreaElement, messages: string[]): void {
    if (textArea.placeholder) {
      messages.push(`Placeholder: ${textArea.placeholder}`);
    }
  }

  private addDisabledMessage(textArea: HTMLTextAreaElement, messages: string[]): void {
    if (textArea.disabled) {
      messages.push("This text area is disabled.");
    }
  }
}

export default TextAreaHandler;
