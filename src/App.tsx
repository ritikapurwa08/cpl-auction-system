import RootLayout from "./layout";
import { ThemeProvider } from "./components/theme-provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RootLayout />
    </ThemeProvider>
  );
};

export default App;
