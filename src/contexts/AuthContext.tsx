import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState
} from "react"

import { UserDTO } from "@dtos/UserDTO";
import { useMessage } from "@hooks/message.hook";
import { getAuthTokenFromStorage, saveAuthTokenToStorage } from "@storage/authTokenStorage";
import {
  getUserFromStorage,
  removeUserFromStorage,
  saveUserToStorage
} from "@storage/storageUser";
import { api } from "@services/api";

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

  function updateUserAndTokenInStorage({ userUpdate, tokenUpdate }: { userUpdate: UserDTO, tokenUpdate: string }) {
    api.defaults.headers.common['Authorization'] = `Bearer ${tokenUpdate}`;
    setUser(userUpdate);
  }

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await api.post('sessions', { email, password });
      if (data.user && data.token) {
        setIsLoadingUserFromStorage(true);

        await saveUserToStorage(data.user);
        await saveAuthTokenToStorage(data.token);

        updateUserAndTokenInStorage({ 
          userUpdate: data.user, 
          tokenUpdate: data.token,
        });
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserFromStorage(false);
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
        setIsLoadingUserFromStorage(true);

        const userLoggedFromStorage = await getUserFromStorage();
        const tokenFromStorage = await getAuthTokenFromStorage();

        if (tokenFromStorage && userLoggedFromStorage) {
          updateUserAndTokenInStorage({ 
            userUpdate: userLoggedFromStorage, 
            tokenUpdate: tokenFromStorage,
          });
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