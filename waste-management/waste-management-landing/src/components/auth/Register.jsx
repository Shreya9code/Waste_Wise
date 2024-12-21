import React, { useState } from "react";
import "./auth.css";
import { FaFolderPlus } from "react-icons/fa";
import Input from "../ui/input";
import Button from "../ui/Button";
import BackToLogin from "../ui/BackToLogin";
import { useNavigate } from "react-router-dom";
import apis from "../../utils/apis";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";
import LoadingButton from "../ui/LoadingButton";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");

  const [loading,setLoading]=useState(false)

  const nameChange = (event) => {
    setName(event.target.value);
  };
  const emailChange = (event) => {
    setEmail(event.target.value);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true)
      const response = await fetch(apis().registerUser, {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      console.log(result);
      setLoading(false)

      if(!response.ok){
        throw new Error(result?.message)
      }

      if(result?.status){
        toast.success(result?.message)
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
    //console.log(name, email, password);

  };

  return (
    <div className="auth_main">
      <form onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <FaFolderPlus />
            <p className="auth_heading">Welcome</p>
            <p className="auth_title">Create a new Account</p>
          </div>
          <div className="auth_item">
            <label>Name*</label>
            <Input
              onChange={nameChange}
              required
              type="text"
              placeholder="Enter your name"
            />
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
              type="password"
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="auth_action">
            <Button>
              <LoadingButton loading={loading} title='Register'/>
            </Button>
          </div>
          <div className="auth_action">
            <BackToLogin />
          </div>
          <Spinner/>
        </div>
      </form>
    </div>
  );
};

export default Register;
