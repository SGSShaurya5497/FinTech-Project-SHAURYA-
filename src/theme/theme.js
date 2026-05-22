import { extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./styles";
import { font } from "./foundations/fonts";
import { breakpoints } from "./foundations/breakpoints";
import { buttonStyles } from "./components/button";
import { badgeStyles } from "./components/badge";
import { linkStyles } from "./components/link";
import { drawerStyles } from "./components/drawer";
import { CardComponent } from "./additions/card/Card";
import { CardBodyComponent } from "./additions/card/CardBody";
import { CardHeaderComponent } from "./additions/card/CardHeader";
import { MainPanelComponent } from "./additions/layout/MainPanel";
import { PanelContentComponent } from "./additions/layout/PanelContent";
import { PanelContainerComponent } from "./additions/layout/PanelContainer";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    primary: "#6C63FF",
    accent: "#00D4AA",
    bg: "#0A0A0F",
    surface: "#13131A",
    textPrimary: "#FFFFFF",
    textSecondary: "#8B8FA8",
    danger: "#FF4D6D",
  },
  teal: {
    300: "#00D4AA", // fintech green (accent)
    400: "#6C63FF", // electric indigo (primary)
  },
};

const components = {
  Input: {
    variants: {
      outline: {
        field: {
          bg: "#1E1E2E",
          border: "1px solid rgba(108, 99, 255, 0.3)",
          borderRadius: "10px",
          color: "white",
          _placeholder: {
            color: "#8B8FA8",
          },
          _hover: {
            borderColor: "#6C63FF",
          },
          _focus: {
            borderColor: "#6C63FF",
            boxShadow: "0 0 0 1px #6C63FF",
          },
        },
      },
    },
    defaultProps: {
      variant: "outline",
    },
  },
};

export default extendTheme(
  { config, colors, components, breakpoints }, // Config, Colors, Components, Breakpoints
  globalStyles,
  font, // Global styles
  buttonStyles, // Button styles
  badgeStyles, // Badge styles
  linkStyles, // Link styles
  drawerStyles, // Sidebar variant for Chakra's drawer
  CardComponent, // Card component
  CardBodyComponent, // Card Body component
  CardHeaderComponent, // Card Header component
  MainPanelComponent, // Main Panel component
  PanelContentComponent, // Panel Content component
  PanelContainerComponent // Panel Container component
);
