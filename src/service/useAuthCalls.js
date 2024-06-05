import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import { fetchFail, fetchStart, loginSuccess } from "../features/authSlice";
import { useDispatch } from "react-redux";

const useAuthApiCalls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //"bu fonksyonun içerisine hook koymak gerekirse hooku bir js kodu içerisinde direk çağıramazsın bunun ya bir component olması gerekiyor yada custom hook olması gerekiyor  "

  //gireceğimiz verileri  bu fonksyon içerisinde uste belirtip  alta kullanacaz uzer insfo gibi
  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        userInfo
      );
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login islemi basarili");
      navigate("/stock");
      // console.log(data);
      // return data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("login islemi basarisiz oldu. ");
      console.log(error);
    }
  };

  const register = async () => {};

  const logout = async () => {};
  return { login, logout, register };
};

export default useAuthApiCalls;
