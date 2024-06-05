import { createSlice } from "@reduxjs/toolkit"

// bizim burada login işlemini tutacak global statelere ihtiyacımız var 
const initialState = {
  user:"",
  loading: false,
   error: false,
   token:"",



}




// biz slice'a yani global state veri aktarıcaz ama 
//bu veri API den gelecek ya ayscn tunk yöndemiyle 
//ekştra reucer yazacaz yada work arount yöntemi
 
const authSlice = createSlice({
  name: "auth",

  initialState: {},
  reducers: {

    fetchStart:(state)=>{
      state.loading=true
    },
    loginSuccess:(state, {payload})=>{
      state.loading=false;
      state.user= payload.user.username
      state.token=payload.token
    },
    fetchFail:(state)=>{
      state.loading=false;
      state.error=true;
    },
  },
})
//
export const {fetchStart,fetchFail,loginSuccess} = authSlice.actions
export default authSlice.reducer
