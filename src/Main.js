import { NotFound, Login, Register, Home, About } from "./AllRoutes";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./components/auth/ResetPassword";
import useAuthCheck from "./hooks/useAuthCheck";


const Main = () => {
  const authChecked = useAuthCheck();

    return !authChecked ? <div className="flex gap-3 justify-center items-center h-screen font-bold">
        <p className="text-cyan-700">Auth Checking ....</p>
        <div class="w-12 h-12 rounded-full animate-spin border-x-2 border-solid border-blue-500 border-t-transparent"></div>
    </div> : (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/forget-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Main;