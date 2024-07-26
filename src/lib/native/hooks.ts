import hooks from "socket:hooks";
import { ApplicationURLEvent } from "socket:internal/events";
import { useNavigator } from "../navigator";

hooks.onApplicationURL(async (event: ApplicationURLEvent) => {
  console.log("onApplicationURL", event.url);
  const nav = useNavigator();
  if (nav) {
    localStorage.setItem("logto:currentPageUrl", event.url.href);
    if (event.url.href.includes("/callback")) {
      nav("/callback" + event.url.search);
    }
    if (event.url.href.includes("sign-out")) {
      window.location.reload();
    }
  }
});
