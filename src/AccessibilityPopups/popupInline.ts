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
    this.popup.addEventListener("mouseover", () => this.hide(false));
  }

  public showMessage(message: string, target?: HTMLElement) {
    this.popup.textContent = message;
    this.popup.style.opacity = "1";
    this.popup.style.visibility = "visible";

    if (target) {
      this.updatePosition(target);
    }
  }

  public hide(handleMouseOver: boolean = false) {
    if (handleMouseOver) {
      return;
    }

    this.popup.style.opacity = "0";
    this.popup.style.visibility = "hidden";
    this.popup.textContent = "";
    this.popup.style.transform = "translate(0, 0)";
  }

  private readonly updatePosition = (target?: HTMLElement) => {
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
  };
}

export default AccessibilityPopupInline;
