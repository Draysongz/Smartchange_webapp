import {createContext, useState} from 'react'



export type AuthContextType = {
    user : any,
    setUser: any
}


type AuthContextProviderType = {
    children : React.ReactNode
}

type AuthUser = {
    secret: string,
    name: string
}

export const AuthContext = createContext({} as AuthContextType) 


 const AuthContextProvider = ({children}: AuthContextProviderType) =>{
    const [user, setUser] = useState<AuthUser | null>(null);
    return (
    <AuthContext.Provider value ={{user, setUser}}>
        {children}
    </AuthContext.Provider>
    )
}

export default AuthContextProvider;