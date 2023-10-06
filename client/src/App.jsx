import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TasksContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import AppContent from "./AppContent";

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <ThemeProvider>
          <LanguageProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </LanguageProvider>
        </ThemeProvider>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
