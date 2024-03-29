import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import RootLayout from "./_root/RootLayout";
import { CreatePost, EditPost, Home, Profile, TimeFrame } from "./_root/pages";
import "./globals.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Route>

        {/** Private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="profile/:id/*" element={<Profile />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/editpost" element={<EditPost />} />
          <Route path="/timeframe" element={<TimeFrame />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
