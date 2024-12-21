import React, { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/Button";
import { FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import apis from "../../utils/apis";
import LoadingButton from "../ui/LoadingButton";

const Login = () => {
  const navigate=useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");

  const [loading,setLoading]=useState(false)

  const emailChange = (event) => {
    setEmail(event.target.value);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    //console.log(email, password);
    try {
      setLoading(true)
      const response = await fetch(apis().loginUser, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      setLoading(false)

      //console.log(result);

      if (!response.ok) {
        throw new Error(result?.message);
      }
      if (result?.status) {
        toast.success(result?.message);
        localStorage.setItem('accessToken',result?.token)
        //navigate('./')

      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="auth_main">
      <form onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <FiLogIn />
            <p className="auth_heading">Welcome Back</p>
            <p className="auth_title">Login to Continue</p>
          </div>
          <div className="auth_item">
            <label>Email*</label>
            <Input
              onChange={emailChange}
              required
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="auth_item">
            <label>Password*</label>
            <Input
              onChange={passwordChange}
              required
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="auth_action">
            <Button>
              <LoadingButton loading={loading} title='Login'/>
            </Button>
          </div>
          <div className="auth_options">
            <Link to="/register">Create new Account?</Link>
            <Link to="/forget/password">Forgot Password</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
