import { useEffect } from "react";
import MenuBar from "./MenuBar";
// import Footer from "./component/Footer/Footer";
// import MenuBar from "./component/MenuBar";

const Layout = ({ title = "Team Management Application", className, children }) => {
    useEffect(() => {
        document.title = title;
    }, [title])

  
    return (
        <div>
            <MenuBar />
            <div className={className}>
                {children}
            </div>
            {/* <Footer/> */}
        </div>
    );
};

export default Layout;