import React from "react"
import Avatar from "@mui/material/Avatar"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import LockIcon from "@mui/icons-material/Lock"
import image from "../assets/result.svg"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { Button } from "@mui/material"
import { Formik, Form } from "formik"
import { object, string } from "yup"
import  useAuthCalls from "../service/useAuthCalls"
//import useAuthCalls from "../service/useAuthCalls"

const Login = () => {
  const { login } = useAuthCalls()// burada useAuthCalls içerisinden logini çıkartık named gibi burada kullanabilieclim

  const loginSchema = object({
    email: string()
      .email("Lütfen geçerli bir email giriniz")
      .required("Email girişi zorunludur"),
    password: string()
      .required("Şifre zorunludur.")
      .min(8, "Şifre en az 8 karakter içermelidir")
      .max(16, "Şifre en falza 16 karakter içermelidir")
      .matches(/\d+/, "Şifre en az bir rakam içermelidir")
      .matches(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
      .matches(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
      .matches(
        /[@$!%*?&]+/,
        "Şifre en az bir özel karakter (@$!%*?&) içermelidir"
      ),
  })
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

          <Formik // formik ile yapacağmış inputlara koşul belirterek girişleri kontrol edebiliriz "yup" ile birlikte kullanacağız 
            initialValues={{ email: "", password: "" }} // burada içerde bir state oluşturuyor
            validationSchema={loginSchema}//loginShema validate yerine bunu kullandık
            onSubmit={(values, actions) => {
          // login(post) isteği atmamız gerekiyor apiye veri gönderiyoruz
              // navigasyon yapılabilir yönlendirme 
              // toast işlermleri yapılabilir 
              // login işlermi başarılaı biterse verileri globall state'e aktarıp kaydedicez
              // yazdığımız form silinebilir subfmitten sonra
              login(values)
              actions.resetForm()
              actions.setSubmitting(false) // form submit edildiği süre içerisinde  bu true ya kuruluyor
              //? veriler global state'e aktırlabilir
              //? navigasyon yapılabilir
              //? tost yapılabilr
            }}//içerisine bir callback alıyor bu callabackin içerisinde birinci parametre olarak values var ve bu values ile diğer parametreleri çağıracağız email parsswor gibi           
            
          >
            {({ handleChange, values, touched, errors, handleBlur }) => (
              <Form>{/*fromiğin içindeki bu errors validate veya validationSchame ile birlikte çalışır
              touched forma dokunup hiç bir şey yazmadan geliyorsan tochedi calıştırır dokunuldumu özelliğini tetikler
              formiğin formunun içine kendi yazmış olduğumuz text fieldları alıyoruz */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}// önceden handleChange kendimiz yazıyorduk şimdi ise formik kendisi getirmiş hazır kullanıyoruz
                    onBlur={handleBlur}//bir inputun üstüne gelince onFocus üstünden çekilince onBlur bunu anlar
                    error={touched.email && Boolean(errors.email)} //string ifadeyi booleanlaştırıp errors değişkeni true olursa helperTexti ekrana basar 
                    helperText={errors.email}//yup errors mesajını hazır verdiği için rorrs içinden direk alıyoruz
                    
                  />
                  <TextField
                    label="password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={errors.password}
                  />
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Box>
              </Form> //* burada değişkenleri yakalamak istiyorsanız burada callback kısmına bir süslü daha açıp valuesları yakalayapbilirsiniz email pass vbi */}
            )}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Do you have not an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login

