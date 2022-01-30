import { useEffect, useState, createContext } from "react";
import { defaultTheme } from "../Themes/Themes";

//User context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [currentGroup, setCurrentGroup] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

//Theme context
export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  //how we could implement dark mode
  // const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};
