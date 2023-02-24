import { Outlet } from "react-router-dom";
import Navigation from"../../components/Navigation/Navigation"
import'./layout.css';
export default function Layout() {
    return (
        <div className="layout">
            <Navigation/>
            <Outlet />
        </div>
    )
}