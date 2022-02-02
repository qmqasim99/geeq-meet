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

  const getUser = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    setUser(docSnap.data());
  };

  useEffect(() => {
    if (auth.currentUser) {
      console.log("I'm getting the bits");
      // getUser();
      const userListener = onSnapshot(
        doc(db, "users", auth.currentUser.uid),
        (doc) => {
          setUser(doc.data());
        }
      );

      const q = query(
        collection(db, "groups"),
        where("users", "array-contains", {
          uid: `${auth.currentUser.uid}`,
          name: `${auth.currentUser.displayName}`,
        })
      );
      const groupListener = onSnapshot(q, (fdocs) => {
        console.log("getting groups");
        let groupsFrmDb = [];
        fdocs.docs.map((doc, i) => {
          groupsFrmDb.push({ id: doc.id, ...doc.data() });
          console.log("uid", i, groupsFrmDb);
        });
        setGroups(groupsFrmDb);
      });

      return () => {
        userListener();
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
