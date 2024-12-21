import React, { useState } from "react";
import Input from "../ui2/input";
import Button from "../ui2/Button";
import { MdOutlineMailLock } from "react-icons/md";
import { Link } from "react-router-dom";
import BackToLogin from "../ui2/BackToLogin";
import { useNavigate } from "react-router-dom";
import apis from "../../utils/apis";
import toast from "react-hot-toast";
import LoadingButton from "../ui2/LoadingButton";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading,setLoading] = useState(false)
  
  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(apis().forgetPassword, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();

      setLoading(false);

      if (!response.ok) {
        throw new Error(result?.message);
      }
      if (result?.status) {
        toast.success(result?.message);
        //console.log(result);
        localStorage.setItem("passToken", result?.token);
        localStorage.setItem("email",email)
        navigate("/otp/verify");
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
            <MdOutlineMailLock />
            <p className="auth_heading">Forgot Password?</p>
            <p className="auth_title">
              Enter your registered e-mail to get 6-digit OTP
            </p>
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

          <div className="auth_action">
            <Button>
              <LoadingButton loading={loading} title="Send OTP" />
            </Button>
          </div>

          <div className="auth_action">
            <BackToLogin />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
