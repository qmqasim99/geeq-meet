import { useState, createContext, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  doc,
  getDoc,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { defaultTheme } from "../Themes/Themes";

//User context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({});
  const [currentGroup, setCurrentGroup] = useState({});
  const [groups, setGroups] = useState([]);
  // ef83N7qN5beB5oJtm9CgCnW7Ydv1

  //extract these to separate API calls, use try catch with async await

  const getUser = async () => {
    // console.log("UID:>>>>>>>>>>", auth.currentUser.uid);
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    // console.log("DATA>>>>>>>>>>", docSnap.data());
    setUser(docSnap.data());
  };

  // DEPRECATED IN FAVOUR OF LISTENERS
  // const q = query(
  //   collection(db, "groups"),
  //   where("users", "array-contains", `{uid:${auth.currentUser.uid}}`)
  // );
  // const getGroups = async () => {
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     setGroups((prevGroups) => {
  //       return [...prevGroups, doc.data()];
  //     });
  //   });
  // };

  useEffect(() => {
    if (auth.currentUser) {
      console.log("I'm getting the bits");
      getUser();

      // ! Use following line for collection
      // const unsubscribe = onSnapshot(collection(db, "groups"), (fdocs) => {
      // ! use following for query

      const q = query(
        collection(db, "groups"),
        where("users", "array-contains", `{uid:${auth.currentUser.uid}}`)
      );
      const groupListener = onSnapshot(q, (fdocs) => {
        let groups = [];
        fdocs.docs.map((doc) => {
          console.log("doccy", doc);
          groups.push({ id: doc.id, ...doc.data() });
        });
        console.log("in gettingDocs", groups);
        setGroups(groups);
      });

      return () => {
        groupListener();
      };
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
