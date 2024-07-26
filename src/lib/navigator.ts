import { NavigateFunction } from "react-router-dom";

let navigate: NavigateFunction | null = null;

export const useNavigator = (fn?: NavigateFunction) => {
  if (fn) {
    navigate = fn;
  }
  if (!navigate) {
    throw new Error("you must first pass in a NavigateFunction to use it within the app");
  }
  return navigate;
};
