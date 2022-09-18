import React from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    var logInData = qs.stringify({
      'email': formData.get("email") as string,
      'password': formData.get("pswrd") as string,
    });
    console.log(logInData)
    try {
      var config = {
        method: "post",
        url: "https://demo-api-work-test.herokuapp.com/login",
        headers: {},
        data: logInData,
      };
      axios(config).then(function(response:any){
        console.log(response.data);
        navigate("/groups",{state:{token:response?.data?.token}});
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-1/3 border-solid border-2 border-blueTwo rounded-lg  m-auto ">
      <p className="text-5xl text-center text-blueOne mb-8 mt-8">
        Group Management Login
      </p>
      <form className="flex flex-col " onSubmit={handleSubmit}>
        <label className="text-blueOne text-lg w-2/4 m-auto mt-3 flex justify-between">
          EMAIL
          <input
            name="email"
            type="text"
            className="border-solid border-2 border-blueTwo rounded-md w-3/5 bg-pinkTwo focus:outline-none"
          />
        </label>
        <label className="text-blueOne text-lg w-2/4 m-auto mt-4 flex justify-between">
          PASSWORD
          <input
            name="pswrd"
            type="password"
            className="border-solid border-2 border-blueTwo rounded-md w-3/5 bg-pinkTwo focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="w-2/4 m-auto mt-7 mb-5 border-solid border-2 border-blueTwo rounded-md text-3xl pb-2 text-blueTree bg-blueOne"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
