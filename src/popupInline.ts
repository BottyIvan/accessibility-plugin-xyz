class AccessibilityPopupInline {
  
  private readonly popup: HTMLDivElement;
  private fontSize: number = localStorage.getItem("fontSize")
    ? parseInt(localStorage.getItem("fontSize") as string)
    : 16;

  constructor() {
    this.popup = document.createElement("div");
    this.popup.className = "accessibility-popup-inline";
    this.popup.setAttribute("role", "alert");
    this.popup.setAttribute("aria-live", "assertive");
    this.popup.style.fontSize = `${this.fontSize}px`;
    document.body.appendChild(this.popup);

    window.addEventListener("resize", () => this.updatePosition());
    window.addEventListener("scroll", () => this.updatePosition());
  }

  public showMessage(message: string, target?: HTMLElement) {
    this.popup.textContent = message;
    this.popup.style.display = "block";

    if (target) {
      this.updatePosition(target);
    }
  }

  public hide() {
    this.popup.style.display = "none";
  }

  private updatePosition = (target?: HTMLElement) => {
    if (!target) return;

    requestAnimationFrame(() => {
      const rect = target.getBoundingClientRect();
      const popupRect = this.popup.getBoundingClientRect();
      const top = rect.bottom + window.scrollY;
      const left = rect.left + window.scrollX;

      // Ensure the popup is within the window
      const maxTop = window.innerHeight - 16 - popupRect.height;
      const maxLeft = window.innerWidth - 16 - popupRect.width;
      const minTop = 16;
      const minLeft = 16;

      const adjustedTop = Math.min(Math.max(top, minTop), maxTop);
      const adjustedLeft = Math.min(Math.max(left, minLeft), maxLeft);

      this.popup.style.top = `${adjustedTop}px`;
      this.popup.style.left = `${adjustedLeft}px`;
    });
  };
}

export default AccessibilityPopupInline;
