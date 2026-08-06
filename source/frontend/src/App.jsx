import AppRoutes from "./app/routers/AppRoutes";

import AuthProvider from "./app/providers/AuthProvider";
import { FeedbackProvider } from "./app/providers/FeedbackProvider";
import FeedbackRenderer from "./components/feedback/FeedbackRenderer";

function App() {
  return (
    <AuthProvider>
      <FeedbackProvider>
          <FeedbackRenderer />
        <AppRoutes />
      </FeedbackProvider>
    </AuthProvider>
  );
}

export default App;
