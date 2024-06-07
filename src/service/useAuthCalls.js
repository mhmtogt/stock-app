// import axios from "axios"
// authantication işlemlerinin tamamını burada yaptım
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useDispatch } from "react-redux";
// import {  useSelector } from "react-redux"
import useAxios from "./useAxios";

const useAuthCalls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //"bu fonksyonun içerisine hook koymak gerekirse hooku bir js kodu içerisinde direk çağıramazsın bunun ya bir component olması gerekiyor yada custom hook olması gerekiyor  "

  //gireceğimiz verileri  bu fonksyon içerisinde uste belirtip  alta kullanacaz uzer insfo gibi
  // const { token } = useSelector((state) => state.auth) state içinde auth içinde tokenı çıkartıcaztokenı almak için useSelector hookunu kullanıyorum
  const { axiosWithToken, axiosPublic } = useAxios();

  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      // const { data } = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/auth/login/`,
      //   userInfo
      // )
      const { data } = await axiosPublic.post("/auth/login/", userInfo);
      dispatch(loginSuccess(data));
      toastSuccessNotify("Giriş işlemi basarili.");
      navigate("/deneme");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Giriş işlemi başarisiz oldu.");
      console.log(error);
    }
  };

  const register = async (userInfo) => {
    dispatch(fetchStart());
    console.log(userInfo);
    try {
      // const { data } = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/users/`,
      //   userInfo
      // )// dashboard sayfasında logout onClick edildiği zaman buraya y istek gelecek ve başarılıysa işelm
      const { data } = await axiosPublic.post("/user/", userInfo);
      dispatch(registerSuccess(data));
      console.log(data);
      navigate("/deneme");
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify("Başarıyla kayıt oldunuz.");
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      // await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
      //   headers: { Authorization: `Token ${token}` },
      // })//bilgiler token ile çıkış yapmak istersen bu token sytexi ile kullanacam
      await axiosWithToken("/auth/logout/");
      toastSuccessNotify("Çıkış işlemi başarili.");
      dispatch(logoutSuccess());
      // navigate("/")
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Çıkış işlemi başarisiz oldu.");
    }
  };

  return { login, register, logout };
};

export default useAuthCalls;
