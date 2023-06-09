import { ReactNode, createContext, useCallback, useEffect, useState } from "react"

import { UserDTO } from "@dtos/UserDTO";
import { useMessage } from "@hooks/message.hook";
import { api } from "@services/api";
import { getUserFromStorage, removeUserFromStorage, saveUserToStorage } from "@storage/storageUser";

type AuthContextDataProps = {
  user: UserDTO;
  isLoadingUserFromStorage: boolean;
  signIn(email: string, password: string): Promise<void>
  signOut(): void;
}

type AuthProviderProps = { 
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthProvider({ children  }:AuthProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserFromStorage, setIsLoadingUserFromStorage] = useState(true);

  const { showErrorMessage } = useMessage();

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.post('sessions', { email, password });
      if (response.data) {
        saveUserToStorage(response.data.user)
        setUser(response.data.user);
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setIsLoadingUserFromStorage(true);

      setUser({} as UserDTO);
      await removeUserFromStorage();
    } catch (error) {
      showErrorMessage({ title: "Erro a sair do aplicativo." })
    } finally {
      setIsLoadingUserFromStorage(false);
    }
  }, []);

  useEffect(() => {
    async function loadUserData() {
      try {
        const userLoggedFromStorage = await getUserFromStorage();
        if (userLoggedFromStorage) {
          setUser(userLoggedFromStorage);
        }
      } catch (error) {
        showErrorMessage({
          title: "Erro ao carregar usuário.",
        })
      } finally {
        setIsLoadingUserFromStorage(false);
      }
    }

    loadUserData();
  }, []);
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingUserFromStorage,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}