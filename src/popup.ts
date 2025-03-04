class AccessibilityPopup {
  
  private readonly popup: HTMLDivElement;
  private fontSize: number = localStorage.getItem("fontSize")
    ? parseInt(localStorage.getItem("fontSize") as string)
    : 16;

  constructor() {
    this.popup = document.createElement("div");
    this.popup.className = "accessibility-popup-fixed";
    this.popup.setAttribute("role", "alert");
    this.popup.setAttribute("aria-live", "assertive");
    this.popup.style.fontSize = `${this.fontSize}px`;
    document.body.appendChild(this.popup);
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

export default AccessibilityPopup;
