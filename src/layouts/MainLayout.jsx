import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div>
             <ScrollRestoration></ScrollRestoration>
            {/* header section */}
            <header>
                {/* navbar */}
                <nav>
                    <Navbar></Navbar>
                </nav>
            </header>
            {/* main section */}
            <main className="min-h-[70vh]">
                <div>
                    <Outlet></Outlet>
                </div>
            </main>
            {/* footer section */}
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;