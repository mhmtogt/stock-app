import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";

const useAuthApiCalls = () => {
  const navigate = useNavigate(); //"bu fonksyonun içerisine hook koymak gerekirse hooku bir js kodu içerisinde direk çağıramazsın bunun ya bir component olması gerekiyor yada custom hook olması gerekiyor  "

  //gireceğimiz verileri  bu fonksyon içerisinde uste belirtip  alta kullanacaz uzer insfo gibi
  const login = async (userInfo) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        userInfo
      );
      toastSuccessNotify("Login islemi basarili");
      navigate("/stock");
      console.log(data);
    } catch (error) {
      toastErrorNotify("login islemi basarisiz oldu. ");
      console.log(error);
    }
  };

  const register = async () => {};

  const logout = async () => {};
  return { login, logout, register };
};

export default useAuthApiCalls;
