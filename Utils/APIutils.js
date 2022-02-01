export const fetchUser = async () => {
  const userRef = doc(db, "users", user_id);
  const userInfo = await getDoc(userRef);
  return userInfo.data();
};
