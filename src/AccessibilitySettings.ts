class AccessibilitySettings {
  constructor() {
    this.initializeSettings();
  }

  createFontSizeSlider(onChange: (fontSize: string) => void): HTMLDivElement {
    const container = document.createElement("div");
    container.className = "slider-container";
    container.style.cssText = `
      margin-bottom: 16px;
    `;

    const label = document.createElement("label");
    label.textContent = "Font Size";
    label.htmlFor = "font-size-slider";
    label.style.cssText = `
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    `;

    const sliderWrapper = document.createElement("div");
    sliderWrapper.style.cssText = `
      display: flex;
      align-items: center;
    `;

    const description = document.createElement("span");
    description.textContent = "Use the slider below to adjust the font size.";
    description.style.cssText = `
      font-size: 14px;
      margin-right: 8px;
    `;

    const slider = document.createElement("input");
    slider.type = "range";
    slider.id = "font-size-slider";
    const savedFontSize = localStorage.getItem("fontSize") || "16px";
    slider.value = parseInt(savedFontSize, 10).toString();
    slider.min = "10";
    slider.max = "34";
    slider.className = "font-size-slider";
    slider.style.cssText = `
      flex-grow: 1;
    `;
    slider.addEventListener("input", (event) => {
      const fontSize = (event.target as HTMLInputElement).value;
      onChange(`${fontSize}px`);
    });

    sliderWrapper.appendChild(description);
    sliderWrapper.appendChild(slider);
    container.appendChild(label);
    container.appendChild(sliderWrapper);
    return container;
  }

  createSelectMode(onChange: (mode: string) => void): HTMLDivElement {
    const container = document.createElement("div");
    container.className = "select-container";
    container.style.cssText = `
      margin-bottom: 16px;
    `;

    const selectWrapper = document.createElement("div");
    selectWrapper.style.cssText = `
      display: flex;
      align-items: center;
    `;

    const label = document.createElement("label");
    label.textContent = "Mode";
    label.htmlFor = "select-mode";
    label.style.cssText = `
      margin-bottom: 8px;
      font-weight: bold;
    `;

    const description = document.createElement("span");
    description.textContent = "Select the mode for the accessibility settings.";
    description.style.cssText = `
      font-size: 14px;
      margin-bottom: 8px;
    `;

    const select = document.createElement("select");
    select.id = "select-mode";
    select.className = "select-mode";
    const savedMode = localStorage.getItem("mode") || "fixed";
    select.innerHTML = `
      <option value="fixed">Fixed Bottom</option>
      <option value="inline">Inline</option>
    `;
    select.value = savedMode;
    select.style.cssText = `
      width: 100%;
      padding: 8px;
    `;
    select.addEventListener("change", (event) => {
      const mode = (event.target as HTMLSelectElement).value;
      onChange(mode);
    });

    selectWrapper.appendChild(description);
    selectWrapper.appendChild(select);
    container.appendChild(label);
    container.appendChild(selectWrapper);
    return container;
  }

  createAccessibilityIcon(): HTMLButtonElement {
    const button = document.createElement("button");
    button.className = "accessibility-icon";
    button.style.cssText = `
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 50%;
      padding: 8px;
      cursor: pointer;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    button.setAttribute("aria-label", "Accessibility Settings");

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("class", "bi bi-universal-access");
    svg.setAttribute("viewBox", "0 0 16 16");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6 5.5l-4.535-.442A.531.531 0 0 1 1.531 4H14.47a.531.531 0 0 1 .066 1.058L10 5.5V9l.452 6.42a.535.535 0 0 1-1.053.174L8.243 9.97c-.064-.252-.422-.252-.486 0l-1.156 5.624a.535.535 0 0 1-1.053-.174L6 9z"
    );

    svg.appendChild(path);
    button.appendChild(svg);
    return button;
  }

  createSettingsPanel(): [HTMLDivElement, HTMLDivElement] {
    const settingsPanel = document.createElement("div");
    settingsPanel.style.cssText = `
      position: fixed;
      width: max-content;
      height: auto;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 16px;
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      display: none;
      flex-direction: column;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: opacity 0.3s ease;
      z-index: 1001;
    `;
    settingsPanel.className = "settings-panel";

    const background = document.createElement("div");
    background.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: none;
      z-index: 1000;
    `;
    background.className = "settings-background";
    document.body.appendChild(background);

    return [settingsPanel, background];
  }

  createText(message: string): HTMLSpanElement {
    const span = document.createElement("span");
    span.textContent = message;
    span.style.cssText = `
      display: none;
      margin-top: 8px;
      font-size: 12px;
      color: #666;
    `;
    return span;
  }

  initializeSettings(): void {
    const settings = document.createElement("div");
    settings.style.cssText = `
      position: fixed;
      bottom: 16px;
      right: 16px;
      padding: 16px;
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 1002;
      cursor: pointer;
    `;
    settings.className = "settings";
    const [settingsPanel, background] = this.createSettingsPanel();

    settingsPanel.appendChild(
      this.createFontSizeSlider((fontSize) => {
        localStorage.setItem("fontSize", fontSize);
      })
    );
    settingsPanel.appendChild(
      this.createSelectMode((mode) => {
        localStorage.setItem("mode", mode);
      })
    );

    const branding = this.createText("demo");
    settings.appendChild(branding);

    settings.appendChild(settingsPanel);
    const accessibilityIcon = this.createAccessibilityIcon();
    settings.appendChild(accessibilityIcon);
    document.body.appendChild(settings);

    settings.addEventListener("mouseover", () => {
      branding.style.display = "block";
    });
    settings.addEventListener("mouseleave", () => {
      branding.style.display = "none";
    });

    settings.addEventListener("click", () => {
      const isHidden = settingsPanel.style.display === "none";
      settingsPanel.style.display = isHidden ? "flex" : "none";
      settingsPanel.style.opacity = isHidden ? "1" : "0";
      background.style.display = isHidden ? "block" : "none";
    });

    background.addEventListener("click", () => {
      settingsPanel.style.display = "none";
      settingsPanel.style.opacity = "0";
      background.style.display = "none";
    });

    settingsPanel.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    document.body.appendChild(settings);
  }
}

export default AccessibilitySettings;
