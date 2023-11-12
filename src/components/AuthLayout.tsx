import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="relative flex w-full justify-center items-center h-screen">
          <div className="absolute inset-0 z-10 flex justify-center items-center">
            <Outlet />
          </div>
          <img
            src="src/assets/images/landingscreen.png"
            alt="Landing Page"
            className="block h-screen w-full object-cover bg-no-repeat"
          />
        </div>
      )}
    </>
  );
};

export default AuthLayout;
