import AppRoutes from "./app/routers/AppRoutes";

import AuthProvider from "./app/providers/AuthProvider";
import { FeedbackProvider } from "./app/providers/FeedbackProvider";

function App() {
  return (
    <AuthProvider>
      <FeedbackProvider>
        <AppRoutes />
      </FeedbackProvider>
    </AuthProvider>
  );
}

export default App;
