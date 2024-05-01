import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const fun = async () => {
            if (!user) {
                const { data } = await axios.get(
                    "http://localhost:4000/profile"
                );
                setUser(data);
                setReady(true);
            }
        };
        fun();

        // eslint-disable-next-line
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}
