import AccessibilityPopupFixed from "../AccessibilityPopups/AccessibilityPopupFixed";
import AccessibilityPopupInline from "../AccessibilityPopups/AccessibilityPopupInline";

interface IAccessibilityPlugin {
  popup?: AccessibilityPopupInline | AccessibilityPopupFixed;
}

export default IAccessibilityPlugin;
