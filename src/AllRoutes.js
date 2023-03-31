import About from "./components/about/About";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import NotFound from "./components/ui/NotFound";
import { ScrollToTop } from "./components/ui/ScrollToTop";
import Layout from "./Layout";
import MenuBar from "./MenuBar";
import ForgotPassword from "./components/auth/ForgotPassword";
import useAuthCheck from "./hooks/useAuthCheck";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import PleaseVerifyEmailPage from "./components/auth/PleaseVerifyEmailPage";
import { EmailVerificationLandingPage } from "./components/auth/EmailVerificationLandingPage";
import PasswordResetLandingPage from "./components/auth/PasswordResetLandingPage";
import TeamList from "./components/teams/TeamList";
import ProjectList from "./components/projects/ProjectList";
import ProjectsDetails from "./components/projects/ProjectsDetails";
import AddTasksForm from "./components/projects/AddTasksForm";
import EditTasksForm from "./components/projects/EditTasksForm";


export { NotFound, Login, Register, MenuBar, Home, Layout, About, ScrollToTop, ForgotPassword, useAuthCheck, PrivateRoute, PublicRoute, ProjectList, PleaseVerifyEmailPage, EmailVerificationLandingPage, PasswordResetLandingPage, TeamList, ProjectsDetails, AddTasksForm,EditTasksForm}