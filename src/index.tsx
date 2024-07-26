if (import.meta.env.MODE === "native") {
  import("./lib/native/hooks");
}
import { createRoot } from "react-dom/client";
import { App } from "./App";

const app = document.querySelector("#app");
const root = app && createRoot(app);

root?.render(<App />);
