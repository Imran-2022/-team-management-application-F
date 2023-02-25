import { useSelector } from "react-redux";

export default function useAuth() {
    const auth = useSelector(state => state.auth);
    if (auth?.token && auth?.user) {
        return true;
    } else {
        return false;
    }
}