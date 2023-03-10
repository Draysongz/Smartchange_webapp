import React, {useState, createContext, useContext} from 'react'

type authContextType = {
    username:string,
    secret: string
};
const authContextDefaultValues: authContextType = {
    username: 'Dray',
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
    const [secret, setSecret    ] = useState("")
    const [password, setPassword] = useState("")
    const value = {
        username,
        setUsername,
        password,
        setPassword
    }
    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}
