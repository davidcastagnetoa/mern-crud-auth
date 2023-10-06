import { Colors } from "@blueprintjs/core";
import { useTheme } from "../context/ThemeContext";

function HomePage() {
  const { isDarkMode } = useTheme();
  return (
    <div
      className="flex flex-col justify-center items-center pt-16 pb-6 space-y-2 h-[calc(100vh)]"
      style={isDarkMode ? { background: Colors.DARK_GRAY1 } : { background: Colors.LIGHT_GRAY3 }}
    >
      HomePage
    </div>
  );
}

export default HomePage;
