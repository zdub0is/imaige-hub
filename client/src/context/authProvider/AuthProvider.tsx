import { SetStateAction, createContext, useCallback, useContext, useMemo, useState } from "react";

const AuthContext = createContext<{ isSignedIn: boolean; signin: () => Promise<void>; signout: () => Promise<void> } | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem("user") != null);
    const [currentUser, setCurrentUser] = useState(null);


    const signin = async (username: string, password: string) => {

        const success = await fetch(import.meta.env.VITE_BASE_URL + "auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
            credentials: 'include',
        })
        .then(res => {
            console.log("status: ", res.status)
            if(res.status !== 200){
                throw new Error("Access Denied")
            }
            return res
        })
        .then(data => {
            return data.json()
        }).then((data) => {
            console.log("data: ", data)
            // set data in localhost
            localStorage.setItem("user", data.user);
            return true

        }).catch(err => {
            console.log(err);
            return false;
        })


        if(success){
            setIsSignedIn(true);
        }

        return success;

    };

    async function signout() {
        await fetch(import.meta.env.VITE_BASE_URL + "auth/signout", {
            method: "POST",
            credentials: 'include',
        })
            .then(res => {
                return res;
            })
            .then(_data => {

                localStorage.removeItem("user");
                return;
            })

        setIsSignedIn(false);

    }


    return (
        <AuthContext.Provider value={{ isSignedIn, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )

}

