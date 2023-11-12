import AuthLayout from "./components/AuthLayout";
import LoginForm from "./components/Forms/LoginForm";
import RegistrationForm from "./components/Forms/RegistrationForm";
import { Home } from "./components/Pages";
import RootLayout from "./components/RootLayout";
import "./globals.css";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Route>

        {/** Private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
