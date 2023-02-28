import { NotFound, Login, Register, Home, About, useAuthCheck, PrivateRoute, PublicRoute, ForgotPassword, Team, Projects, PleaseVerifyEmailPage, EmailVerificationLandingPage, PasswordResetLandingPage } from "./AllRoutes";
import { Routes, Route } from "react-router-dom";

const Main = () => {
    const authChecked = useAuthCheck();

    return !authChecked ? <div className="flex gap-3 justify-center items-center h-screen font-bold">
        <p className="text-cyan-700">Auth Checking ....</p>
        <div className="w-12 h-12 rounded-full animate-spin border-x-2 border-solid border-blue-500 border-t-transparent"></div>
    </div> : (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<PleaseVerifyEmailPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/teams" element={<PrivateRoute><Team /></PrivateRoute>} />
            <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route path="/verify-email/:verificationString" element={<EmailVerificationLandingPage />} />
            <Route path="/new-password/:npassword" element={<PasswordResetLandingPage />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Main;