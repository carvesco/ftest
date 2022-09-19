import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<any>({ email: "", password: "" });
  const handleLogin = () => {
    console.log(loginData);
    var logInData = qs.stringify({
      email: loginData.email,
      password: loginData.password,
    });
    try {
      var config = {
        method: "post",
        url: "https://demo-api-work-test.herokuapp.com/login",
        headers: {},
        data: logInData,
      };
      axios(config).then(function (response: any) {
        console.log(response.data);
        navigate("/groups", { state: { token: response?.data?.token } });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        width: "50%",
        margin: "auto",
        mt: 10,
        padding: 5,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "primary.main",
      }}
    >
      <Typography variant="h2" align="center" color={"primary"}>
        Group Management Login
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", mb: 5 }}>
        <TextField
          id="outlined-textarea"
          label="Email"
          placeholder="Placeholder"
          sx={{ width: "50%", margin: "auto", mt: 3 }}
          value={loginData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLoginData((prev: any) => ({
              ...prev,
              email: e.target.value,
            }));
          }}
        />
        <TextField
          id="outlined-textarea"
          label="Password"
          type="password"
          placeholder="Placeholder"
          sx={{ width: "50%", margin: "auto", mt: 3 }}
          value={loginData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLoginData((prev: any) => ({
              ...prev,
              password: e.target.value,
            }));
          }}
        />
        <Button
          variant="contained"
          sx={{ width: "40%", margin: "auto", mt: 3 }}
          onClick={handleLogin}
        >
          <Typography variant="h5">LOGIN</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
