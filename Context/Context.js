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

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [currentGroup, setCurrentGroup] = useState({});
  const [uid, setUid] = useState("ef83N7qN5beB5oJtm9CgCnW7Ydv1");
  const [groups, setGroups] = useState([]);

  const getUser = async () => {
    console.log("I start happening");
    console.log("uid set to", uid);
    // setUid(auth.currentUser.uid)
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    console.log("inside getUser", docSnap);
    setUser(docSnap.data());
  };

  const getGroups = async () => {
    const q = query(
      collection(db, "groups"),
      where("users", "array-contains", `{name:${user.name},uid:${uid}}`)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("setting Group and last set to:", groups);
      setGroups((prevGroups) => {
        return [...prevGroups, doc.data()];
      });
    });
  };

  useEffect(() => {
    // ApiCallToUpdateUser();
    getUser();
    getGroups();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        currentGroup,
        setCurrentGroup,
        groups,
        setGroups,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
