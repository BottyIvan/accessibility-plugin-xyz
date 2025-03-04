function createFontSizeSlider(
  onChange: (fontSize: string) => void
): HTMLDivElement {
  const container = document.createElement("div");
  container.className = "slider-container";

  const label = document.createElement("label");
  label.textContent = "Font Size:";
  label.htmlFor = "font-size-slider";

  const slider = document.createElement("input");
  slider.type = "range";
  slider.id = "font-size-slider";
  const savedFontSize = localStorage.getItem("fontSize") || "16px";
  slider.value = parseInt(savedFontSize, 10).toString();
  slider.min = "10";
  slider.max = "34";
  slider.className = "font-size-slider";
  slider.addEventListener("input", (event) => {
    const fontSize = (event.target as HTMLInputElement).value;
    onChange(`${fontSize}px`);
  });

  container.appendChild(label);
  container.appendChild(slider);
  return container;
}

function createSelectMode(onChange: (mode: string) => void): HTMLDivElement {
  const container = document.createElement("div");
  container.className = "select-container";

  const label = document.createElement("label");
  label.textContent = "Mode:";
  label.htmlFor = "select-mode";

  const select = document.createElement("select");
  select.id = "select-mode";
  select.className = "select-mode";
  const savedMode = localStorage.getItem("mode") || "fixed";
  select.innerHTML = `
    <option value="fixed">Fixed Bottom</option>
    <option value="inline">Inline</option>
  `;
  select.value = savedMode;
  select.addEventListener("change", (event) => {
    const mode = (event.target as HTMLSelectElement).value;
    onChange(mode);
  });

  container.appendChild(label);
  container.appendChild(select);
  return container;
}

function createAccessibilityIcon(): HTMLButtonElement {
  const button = document.createElement("button");
  button.className = "accessibility-icon";
  button.style.backgroundColor = "#fff";
  button.style.border = "1px solid #ccc";
  button.style.borderRadius = "50%";
  button.style.padding = "8px";
  button.style.cursor = "pointer";
  button.style.width = "40px";
  button.style.height = "40px";
  button.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
  button.style.transition = "background-color 0.3s ease";
  button.setAttribute("aria-label", "Accessibility Settings");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
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

function createSettingsPanel(): HTMLDivElement {
  const settingsPanel = document.createElement("div");
  settingsPanel.style.position = "absolute";
  settingsPanel.style.bottom = "50px";
  settingsPanel.style.right = "0";
  settingsPanel.style.padding = "16px";
  settingsPanel.style.backgroundColor = "white";
  settingsPanel.style.border = "1px solid #ccc";
  settingsPanel.style.display = "none";
  settingsPanel.style.flexDirection = "column";
  settingsPanel.style.transition = "opacity 0.3s ease";
  settingsPanel.className = "settings-panel";
  return settingsPanel;
}

export default function initializeSettings(): void {
  const settings = document.createElement("div");
  settings.style.position = "fixed";
  settings.style.bottom = "0";
  settings.style.right = "0";
  settings.style.padding = "16px";
  settings.style.backgroundColor = "white";
  settings.style.border = "1px solid #ccc";
  settings.className = "settings";
  const settingsPanel = createSettingsPanel();

  settingsPanel.appendChild(
    createFontSizeSlider((fontSize) => {
      localStorage.setItem("fontSize", fontSize);
    })
  );
  settingsPanel.appendChild(
    createSelectMode((mode) => {
      localStorage.setItem("mode", mode);
    })
  );

  settings.appendChild(settingsPanel);
  const accessibilityIcon = createAccessibilityIcon();
  settings.appendChild(accessibilityIcon);
  document.body.appendChild(settings);

  accessibilityIcon.addEventListener("click", () => {
    settingsPanel.style.display =
      settingsPanel.style.display === "none" ? "flex" : "none";
    settingsPanel.style.opacity =
      settingsPanel.style.display === "none" ? "0" : "1";
  });

  window.addEventListener("click", (event) => {
    if (
      settingsPanel.style.display === "flex" &&
      !settings.contains(event.target as Node)
    ) {
      settingsPanel.style.display = "none";
      settingsPanel.style.opacity = "0";
    }
  });
}
