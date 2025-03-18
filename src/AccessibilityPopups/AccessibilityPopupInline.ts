import AccessibilityPopupBase from "./AccessibilityPopupBase";

class AccessibilityPopupInline extends AccessibilityPopupBase {
  constructor() {
    super("accessibility-popup-inline");
    window.addEventListener("resize", () => this.updatePosition());
    window.addEventListener("scroll", () => this.updatePosition());
    this.popup.addEventListener("mouseover", () => this.hide());
  }

  public showMessage(message: string, target?: HTMLElement) {
    super.showMessage(message);
    this.popup.style.opacity = "1";
    this.popup.style.visibility = "visible";

    if (target) {
      this.updatePosition(target);
    }
  }

  public hide() {
    this.popup.style.opacity = "0";
    this.popup.style.visibility = "hidden";
    this.popup.textContent = "";
    this.popup.style.transform = "translate(0, 0)";
  }

  private updatePosition(target?: HTMLElement) {
    if (!target) return;

    requestAnimationFrame(() => {
      const targetRect = target.getBoundingClientRect();
      const popupRect = this.popup.getBoundingClientRect();
      const top = targetRect.bottom + 10;
      const left = targetRect.left + (targetRect.width - popupRect.width) / 2;
      const adjustedTop = Math.max(
        10,
        Math.min(window.innerHeight - popupRect.height - 10, top)
      );
      const adjustedLeft = Math.max(
        10,
        Math.min(window.innerWidth - popupRect.width - 10, left)
      );

      this.popup.style.transform = `translate(${adjustedLeft}px, ${adjustedTop}px)`;
    });
  }
}

export default AccessibilityPopupInline;
