import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            {/* header section */}
            <header>
              
            </header>
            {/* main section */}
            <main>
                <Outlet></Outlet>
            </main>
            {/* footer section */}
            <footer>

            </footer>
        </div>
    );
};

export default MainLayout;