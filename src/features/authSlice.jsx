import { createSlice } from "@reduxjs/toolkit"
// bizim burada login işlemini tutacak global statelere ihtiyacımız var 
const initialState = {
  user: "",
  username:"",
  loading: false,
  error: false,
  token: "",
}
// biz slice'a yani global state veri aktarıcaz ama 
//bu veri API den gelecek ya ayscn tunk yöndemiyle 
//ekştra reucer yazacaz yada work arount yöntemi
// auth slice denilen bu sayfa oluşturulan sayfaların 
//uzun uzun yazılmak yerine yeni biri reducer oluşturup 
//tek sayfa üzerinden yöntelilmesi için sstatleri obyeleştiriyor
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false
      state.user = payload.user.username
      state.token = payload.token
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false
      state.user = payload.data.username
      state.token = payload.token
    },
    logoutSuccess: (state) => {
      state.user = ""
      state.loading = false
      state.token = ""
    },
    fetchFail: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export const {
  fetchStart,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  fetchFail,
} = authSlice.actions

export default authSlice.reducer
