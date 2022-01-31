import { useState, createContext, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  doc,
  getDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { defaultTheme } from "../Themes/Themes";

//User context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({});
  const [currentGroup, setCurrentGroup] = useState({});
  const [uid, setUid] = useState("");
  const [groups, setGroups] = useState([]);
  // ef83N7qN5beB5oJtm9CgCnW7Ydv1

  //extract these to separate API calls, use try catch with async await

  const getUser = async () => {
    setUid(auth.currentUser.uid);
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    setUser(docSnap.data());
  };

  const getGroups = async () => {
    const q = query(
      collection(db, "groups"),
      where("users", "array-contains", `{name:${user.name},uid:${uid}}`)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setGroups((prevGroups) => {
        return [...prevGroups, doc.data()];
      });
    });
  };

  useEffect(() => {
    if (auth.currentUser) {
      console.log("I'm getting the bits");
      getUser();
      getGroups();
      console.log("incontext", user);
      console.log("incontext", groups);
    } else {
      console.log("not logged in");
    }
  }, [isSignedIn]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        currentGroup,
        setCurrentGroup,
        groups,
        setGroups,
        isSignedIn,
        setIsSignedIn,
      }}
    >
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
