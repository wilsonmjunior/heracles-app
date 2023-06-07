import { ReactNode, createContext, useCallback, useState } from "react"

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";

type AuthContextDataProps = {
  user: UserDTO;
  signIn(email: string, password: string): Promise<void>
}

type AuthProviderProps = { 
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthProvider({ children  }:AuthProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.post('sessions', { email, password });
      setUser(response.data)
    } catch (error) {
      throw error;
    }
  }, [])
  
  return (
    <AuthContext.Provider
      value={{ user, signIn }}
    >
      {children}
    </AuthContext.Provider>
  )
}