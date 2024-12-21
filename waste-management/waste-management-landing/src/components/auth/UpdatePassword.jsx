import React, { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/Button";
import BackToLogin from "../ui/BackToLogin";
import { MdAutorenew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import apis from "../../utils/apis";
import LoadingButton from "../ui/LoadingButton";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false)

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true)
      const response = await fetch(apis().updatePassword, {
        method: "POST",
        body: JSON.stringify({
          password,
          confirmPassword,
          token: localStorage.getItem("passToken"),
        }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      setLoading(false)

      if (!response.ok) {
        throw new Error(result?.message);
      }
      if (result?.status) {
        toast.success(result?.message);
        console.log(result)
        navigate("/login");
        localStorage.removeItem('email')
        localStorage.removeItem('passToken')

      }
    } catch (error) {
      toast.error(error.message);
    }
    console.log(password);
  };
  return (
    <div className="auth_main">
      <form onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <MdAutorenew />
            <p className="auth_heading">New Password</p>
            <p className="auth_title">Enter atleast 6-digit long password</p>
          </div>
          <div className="auth_item">
            <label>New Password*</label>
            <Input
              onChange={passwordChange}
              type="password"
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="auth_item">
            <label>Confirm new Password*</label>
            <Input
              onChange={confirmPasswordChange}
              type="password"
              required
              placeholder="Confirm your password"
            />
          </div>
          <div className="auth_action">
            <Button>
            <LoadingButton loading={loading} title='Update Password'/>
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

export default UpdatePassword;
