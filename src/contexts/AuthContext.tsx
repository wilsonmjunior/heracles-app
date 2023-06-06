import { ReactNode, createContext, useState } from "react"

import { UserDTO } from "@dtos/UserDTO";

type AuthContextDataProps = {
  user: UserDTO;
}

type AuthProviderProps = { 
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthProvider({ children  }:AuthProviderProps) {
  const [user, setUser] = useState({
    name: "Wilow",
  } as UserDTO);
  
  return (
    <AuthContext.Provider
      value={{ user }}
    >
      {children}
    </AuthContext.Provider>
  )
}