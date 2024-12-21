import React, { useEffect, useRef, useState } from "react";
import Input from "../ui/input";
import Button from "../ui/Button";
import BackToLogin from "../ui/BackToLogin";
import { IoFingerPrint } from "react-icons/io5";
import Timer from "./Timer";
import "../auth/auth.css";
import { useNavigate } from "react-router-dom";
import UpdatePassword from "./UpdatePassword";
import toast from "react-hot-toast";
import apis from "../../utils/apis";
import LoadingButton from "../ui/LoadingButton";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [otpTime, setOtpTime] = useState(null);
  const [isexpire, setIsExpire] = useState(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  const inputRef = [ref1, ref2, ref3, ref4, ref5, ref6];

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    const otp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    console.log(otp);

    try {
      setLoading(true);

      const response = await fetch(apis().otpVerify, {
        method: "POST",
        body: JSON.stringify({ otp: otp }),
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
        navigate("/password/update");
        //localStorage.setItem('accessToken',result?.token)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //useEffect(() => {
    const getTime = async () => {
      try {
        const response = await fetch(apis().getOtpTime, {
          method: "POST",
          body: JSON.stringify({ token: localStorage.getItem("passToken") }),
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message);
        }
        if (result?.status) {
          //toast.success(result?.message);
          console.log(result);
          const remainingTime =
            new Date(result?.sendTime).getTime() - new Date().getTime();
          if (remainingTime > 0) {
            setOtpTime(remainingTime);
          } else {
            setIsExpire(true);
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
  //});
  const otpArray = [setOtp1, setOtp2, setOtp3, setOtp4, setOtp5, setOtp6];
  useEffect(() => {
    if (ref1.current) {
      ref1.current.focus();
    }
    getTime();
  }, []);

  const inputChange = (event, location) => {
    console.log(location);
    if (location < 5 && event.target.value) {
      inputRef[location + 1].current.focus();
    }
    otpArray[location](event.target.value);
  };

  const resendHandler=async()=>{
    try {
      const response = await fetch(apis().forgetPassword, {
        method: "POST",
        body: JSON.stringify({ email: localStorage.getItem('email') }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message);
      }
      if (result?.status) {
        toast.success(result?.message);
        console.log(result);
        localStorage.setItem("passToken", result?.token);
        //localStorage.setItem("email",email)
        setOtpTime(1*60*1000)
        setIsExpire(false)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="auth_main">
      <form onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <IoFingerPrint />
            <p className="auth_heading">Verify your OTP</p>
            <p className="auth_title">
              Enter your 6-digit OTP we just sent you in mail
            </p>
          </div>
          <div className="auth_item">
            <label>OTP*</label>
            <div className="otp_input_container">
              {inputRef.map((item, index) => {
                return (
                  <input
                    required
                    key={index}
                    onChange={(event) => inputChange(event, index)}
                    ref={item}
                    onInput={(event) => {
                      if (event.target.value.length > 1)
                        event.target.value = event.target.value.slice(0, 1);
                    }}
                    type="number"
                    className="ui_input otp_input"
                  />
                );
              })}
            </div>
          </div>
          <div className="auth_action">
            <Button>
              <LoadingButton loading={loading} title="Verify" />
            </Button>
          </div>
          <div>
            {otpTime !== null && !isexpire ? (
              <Timer setIsExpire={setIsExpire} time={otpTime} />
            ) : (
              <span onClick={resendHandler} className="otp_resend_action">Resend</span>
            )}
          </div>
          <div className="auth_action">
            <BackToLogin />
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;
