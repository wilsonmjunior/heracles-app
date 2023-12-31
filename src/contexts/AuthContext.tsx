import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState
} from "react";

import { UserDTO } from "@dtos/UserDTO";
import { useMessage } from "@hooks/message.hook";
import {
  getAuthTokenFromStorage,
  removeTokenFromStorage,
  saveAuthTokenToStorage,
  StorageAuthTokenProps,
} from "@storage/authTokenStorage";
import {
  getUserFromStorage,
  removeUserFromStorage,
  saveUserToStorage
} from "@storage/userStorage";
import { api } from "@services/api";

type SessionResponse = StorageAuthTokenProps & {
  user: UserDTO;
}

type AuthContextDataProps = {
  user: UserDTO
  isLoadingUserFromStorage: boolean
  signIn(email: string, password: string): Promise<void>
  signOut(): void
  updateUser(value: UserDTO): void
}

type AuthProviderProps = { 
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthProvider({ children  }:AuthProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserFromStorage, setIsLoadingUserFromStorage] = useState(true);

  const { showErrorMessage } = useMessage();

  function updateUserAndTokenInStorage(userUpdate: UserDTO, tokenUpdate: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${tokenUpdate}`;
    setUser(userUpdate);
  }

  function updateUser(userUpdate: UserDTO) {
    setUser(userUpdate);
  }

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await api.post<SessionResponse>('sessions', { email, password });
      if (data.user && data.token && data.refresh_token) {
        setIsLoadingUserFromStorage(true);

        await saveUserToStorage(data.user);
        await saveAuthTokenToStorage({ token: data.token, refresh_token: data.refresh_token });

        updateUserAndTokenInStorage(data.user,  data.token);
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
      await removeTokenFromStorage();
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
        const { token } = await getAuthTokenFromStorage();

        if (token && userLoggedFromStorage) {
          updateUserAndTokenInStorage(userLoggedFromStorage, token);
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

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);
    return () => { subscribe(); }
  }, [signOut])
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingUserFromStorage,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}