import { useState, createContext } from "react";
import { auth } from "../firebase";
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
  const [uid, setUid] = useState("");
  const [groups]

  const getUser = async () => {
    setUid(auth.currentUser.uid);
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };

  const getGroups = async () => {
    const q = query(collection(db, "groups"), where("users","array-contains",`{name:${},uid:${uid}}`));
   const querySnapshot = await getDocs(q)
   
  
  };

  useEffect(() => {
    ApiCallToUpdateUser();
    setUser(getUser());
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
