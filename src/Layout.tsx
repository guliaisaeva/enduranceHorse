import type { ReactNode } from "react";
import Navbar from "./components/Navbar";

interface LayoutProps {
    children: ReactNode;
}


const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navbar />
            <main className="mx-auto">{children}</main>
        </>
    );
};

export default Layout;