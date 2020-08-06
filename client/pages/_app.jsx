import "../styles.css";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

NProgress.configure({
  easing: "ease",
  speed: 1000,
});
//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
export default MyApp;
