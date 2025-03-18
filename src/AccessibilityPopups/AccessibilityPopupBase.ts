class AccessibilityPopupBase {
  protected readonly popup: HTMLDivElement;
  protected fontSize: number = localStorage.getItem("fontSize")
    ? parseInt(localStorage.getItem("fontSize") as string)
    : 16;

  constructor(className: string) {
    this.popup = document.createElement("div");
    this.popup.className = className;
    this.popup.setAttribute("role", "alert");
    this.popup.setAttribute("aria-live", "assertive");
    this.popup.style.fontSize = `${this.fontSize}px`;
    document.body.appendChild(this.popup);
  }

  public showMessage(message: string) {
    this.popup.textContent = message;
    this.popup.style.display = "block";
  }

  public hide() {
    this.popup.style.display = "none";
  }
}

export default AccessibilityPopupBase;
