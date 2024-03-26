import { Dispatch, createContext, useState } from "react";

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserType {
  id: null | string;
  username: null | string;
}

interface CurrentUserContextType {
  currentUser: UserType;
  setCurrentUser: Dispatch<UserType>;
}

export const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: { id: null, username: null },
  setCurrentUser: () => null,
});

const UserContextProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<{
    id: null | string;
    username: null | string;
  }>({ id: null, username: null });

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
export default UserContextProvider;
