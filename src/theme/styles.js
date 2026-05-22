export const globalStyles = {
  colors: {
    gray: {
      700: "#13131A", // Map gray.700 (card background) to our surface cards color
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: "#0A0A0F",
        color: "#FFFFFF",
        fontFamily: "'Inter', sans-serif",
      },
      html: {
        fontFamily: "'Inter', sans-serif",
      },
      "::-webkit-scrollbar": {
        width: "6px",
        height: "6px",
      },
      "::-webkit-scrollbar-track": {
        background: "#0A0A0F",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#6C63FF",
        borderRadius: "3px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#8B5CF6",
      },
    }),
  },
};
