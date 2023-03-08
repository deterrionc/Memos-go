import { Outlet } from "react-router-dom";
import UpdateVersionBanner from "../components/UpdateVersionBanner";
import Header from "../components/Header";

function Root() {
  return (
    <div className="w-full min-h-full bg-zinc-100 dark:bg-zinc-800">
      <div className="w-full h-auto flex flex-col justify-start items-center">
        <UpdateVersionBanner />
      </div>
      <div className="w-full max-w-6xl mx-auto flex flex-row justify-center items-start">
        <Header />
        <main className="w-auto flex-grow flex flex-col justify-start items-start">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Root;
