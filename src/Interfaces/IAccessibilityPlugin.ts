import AccessibilityPopup from "./AccessibilityPopups/popup";
import AccessibilityPopupInline from "./AccessibilityPopups/popupInline";

interface IAccessibilityPlugin {
  popup?: AccessibilityPopupInline | AccessibilityPopup;
  
}

export default IAccessibilityPlugin;
