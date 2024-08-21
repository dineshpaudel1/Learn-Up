import { useContext } from "react";
import UserContext from "../context/UserInfoProvider";

const useUserInfo = () => {
  const userInfo = useContext(UserContext);
  return userInfo;
};
export default useUserInfo;
