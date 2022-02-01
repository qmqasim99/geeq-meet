import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchUser = async (user_id) => {
  const userRef = doc(db, "users", user_id);
  const userInfo = await getDoc(userRef);
  return userInfo.data();
};
