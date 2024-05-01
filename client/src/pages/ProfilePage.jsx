import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
    const { user } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);

    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = "profile";
    }

    async function logout() {
        await axios.post("http://localhost:4000/logout");
        alert("Logout Successful!");
        setRedirect("/");
        window.location.reload();
    }

    if (!user) {
        return <Navigate to={"/login"} />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div>
            <div>
                <AccountNav />
                {subpage === "profile" && (
                    <div className="mx-auto text-center items-center max-w-lg my-5">
                        <p className="text-lg font-mono font-bold">
                            Logged in as {user.name} ({user.email})
                        </p>
                        <button
                            className="primary max-w-sm mt-6 hover:bg-pink-600"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>
                )}
                {subpage === "places" && <PlacesPage />}
            </div>
        </div>
    );
}
