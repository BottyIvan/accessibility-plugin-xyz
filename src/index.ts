import AccessibilityPopupInline from "./AccessibilityPopups/popupInline";
import AccessibilityPopup from "./AccessibilityPopups/popup";
import AccessibilitySettings from "./AccessibilitySettings";
import SpeechHelper from "./speechHelper";
import IAccessibilityPlugin from "./Interfaces/IAccessibilityPlugin";
import Handler from "./Handlers";

class AccessibilityPlugin implements IAccessibilityPlugin {
  public settings: AccessibilitySettings;
  public popup: AccessibilityPopupInline | AccessibilityPopup;
  private speech: SpeechHelper;
  private handler: Handler;

  private static readonly interactiveTags = new Map([
    ["P", "Paragraph"],
    ["H1", "Heading 1"],
    ["H2", "Heading 2"],
    ["H3", "Heading 3"],
    ["H4", "Heading 4"],
    ["H5", "Heading 5"],
    ["H6", "Heading 6"],
    ["A", "Anchor"],
    ["BUTTON", "Button"],
    ["INPUT", "Input field"],
    ["TEXTAREA", "Text area"],
    ["SELECT", "Select dropdown"],
    ["LABEL", "Label"],
    ["LI", "List item"],
    ["TD", "Table cell"],
    ["TH", "Table header cell"],
  ]);

  constructor() {
    const mode = localStorage.getItem("mode") || "fixed";
    document.body.dataset.accessibilityMode = mode;

    this.popup =
      mode === "inline"
        ? new AccessibilityPopupInline()
        : new AccessibilityPopup();

    this.handler = new Handler();
    this.settings = new AccessibilitySettings();

    this.init();
  }

  private init() {
    this.enableTextHighlight();
    this.speech = new SpeechHelper();
  }

  private enableTextHighlight() {
    document.addEventListener("mouseover", this.handleMouseOver.bind(this), {
      passive: true,
    });
    document.addEventListener("mouseout", this.handleMouseOut.bind(this), {
      passive: true,
    });
  }

  private handleMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target) {
      return;
    }

    if (
      target instanceof HTMLButtonElement ||
      target instanceof HTMLInputElement ||
      target instanceof HTMLSelectElement
    ) {
      const message = this.handler.handleFocus(target);
      if (message) {
        this.showMessage(message, target);
      }
      return;
    }

    if (AccessibilityPlugin.interactiveTags.has(target.tagName)) {
      const message = `${AccessibilityPlugin.interactiveTags.get(
        target.tagName
      )}: ${target.textContent?.trim()}`;
      this.showMessage(message, target);
      target.classList.add("highlight");
    }
  }

  private handleMouseOut(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target && AccessibilityPlugin.interactiveTags.has(target.tagName)) {
      this.hideMessage();
      target.classList.remove("highlight");
    }
  }

  private showMessage(message: string, target?: HTMLElement) {
    this.popup.showMessage(message, target);
    this.speech.speak(message);
  }

  private hideMessage() {
    this.popup.hide();
  }
}

export { AccessibilityPlugin };
new AccessibilityPlugin();
