import React, {useState, createContext, useContext} from 'react'

type authContextType = {
    user:string,
    secret: string
};
const authContextDefaultValues: authContextType = {
    user: 'Dray',
    secret: ''
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    
    return useContext(AuthContext);
}

type Props = {
    children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [user, setUser    ] = useState("")
    const [secret, setSecret] = useState("")
    const value = {
        user,
        setUser,
        secret,
        setSecret
    }
    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}
