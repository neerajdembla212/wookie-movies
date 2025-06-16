import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import Header from "./components/header/Header";
import HomePageLoader from "./components/loaders/HomePageLoader";
import DetialsPageLoader from "./components/loaders/DetailsPageLoader";

export default function AppLayout() {
  const navigation = useNavigation();
  const getLoaderComponent = (pathname: string | undefined) => {
    if (!pathname) {
      return null;
    }
    if (pathname === "/") {
      return <HomePageLoader />;
    }
    if (pathname.startsWith("/movie")) {
      return <DetialsPageLoader />;
    }
  };
  const isLoading = navigation.state === "loading";
  const loadingPathname = navigation.location?.pathname;
  return (
    <>
      <div className="min-h-dvh bg-gray-100 text-gray-900">
        <Header />
        <main className="p-6 h-dvh w-dvw pt-20">
          {isLoading && getLoaderComponent(loadingPathname)}
          <Outlet />
          <ScrollRestoration />
        </main>
      </div>
    </>
  );
}
