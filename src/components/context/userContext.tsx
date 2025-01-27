import React, { createContext, useState, ReactNode } from "react";
import { Users } from "../../interfaces/Interfaces";



interface UserContextType {
user: Users | null;

    setUser: React.Dispatch<React.SetStateAction<Users | null>>;
}

export const UserContext = createContext<
    | {
        user: Users | undefined;
        setUser: React.Dispatch<React.SetStateAction<Users>> | undefined;
        isLoggedIn: boolean;
        setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean>>;
    }
    | undefined
>(undefined); 

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<Users>({
        name: "",
        email:  "",
        password: "",
    }); 

    return (
        <UserContext.Provider value={{ user, setUser , isLoggedIn, setIsLoggedIn}}>
            {children}
        </UserContext.Provider>
    );
};

