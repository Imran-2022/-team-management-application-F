import About from "./components/about/About";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import NotFound from "./components/ui/NotFound";
import { ScrollToTop } from "./components/ui/ScrollToTop";
import Layout from "./Layout";
import MenuBar from "./MenuBar";
import ResetPassword from "./components/auth/ResetPassword";
import useAuthCheck from "./hooks/useAuthCheck";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Team from "./components/team/Team";
import Projects from "./components/projects/Projects";
import PleaseVerifyEmailPage from "./components/auth/PleaseVerifyEmailPage";
import { EmailVerificationLandingPage } from "./components/auth/EmailVerificationLandingPage";


export {NotFound,Login,Register,MenuBar,Home,Layout,About,ScrollToTop,ResetPassword,useAuthCheck,PrivateRoute,PublicRoute,Team,Projects,PleaseVerifyEmailPage,EmailVerificationLandingPage}