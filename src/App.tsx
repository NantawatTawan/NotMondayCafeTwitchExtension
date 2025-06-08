import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useClickSound } from "./hooks/useClickSound";
function App() {
  useClickSound();
  return <RouterProvider router={router} />;
}

export default App;
