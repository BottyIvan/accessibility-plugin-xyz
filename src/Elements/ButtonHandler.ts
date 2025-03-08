import { IElementHandler } from "../Interfaces/IElementHandler";

class ButtonHandler implements IElementHandler {
  handleFocus(button: HTMLElement): string | undefined {
    if (!(button instanceof HTMLButtonElement)) {
      return undefined;
    }

    const accessibilityMessages: string[] = [];
    this.addRoleMessage(button, accessibilityMessages);
    this.addTypeMessage(button, accessibilityMessages);
    this.addAriaExpandedMessage(button, accessibilityMessages);
    this.addDisabledMessage(button, accessibilityMessages);

    return accessibilityMessages.join(" ");
  }

  private addRoleMessage(button: HTMLButtonElement, messages: string[]): void {
    const role = button.getAttribute("role");
    if (role) {
      messages.push(`Role: ${role}`);
    }
  }

  private addTypeMessage(button: HTMLButtonElement, messages: string[]): void {
    const type = button.getAttribute("type");
    if (type) {
      messages.push(`Type: ${type}`);
    }
  }

  private addAriaExpandedMessage(
    button: HTMLButtonElement,
    messages: string[]
  ): void {
    const ariaExpanded = button.getAttribute("aria-expanded");
    if (ariaExpanded) {
      messages.push(`Aria-expanded: ${ariaExpanded}`);
    }
  }

  private addDisabledMessage(
    button: HTMLButtonElement,
    messages: string[]
  ): void {
    if (button.disabled) {
      messages.push("This button is disabled.");
    }
  }
}

export default ButtonHandler;
