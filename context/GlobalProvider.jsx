import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    getCurrentUser().then(res => {
      if (res) {
        setIsLogged(true)
        setUser(res);
        return;
      }

      setIsLogged(false)
      setUser(null);
    }).finally(() => {
      setIsLoading(false)
    })

  }, []);
  return <GlobalContext.Provider value={{ isLogged, setIsLogged, user, setUser, isLoading, setIsLoading }}>
    {children}
  </GlobalContext.Provider>
}