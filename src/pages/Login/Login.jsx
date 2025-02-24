import React, { useRef, useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { login, signup } from "../../firebase";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import { toast } from "react-toastify";

const Login = () => {
  const name = useRef("");
  const email = useRef("");
  const password = useRef("");
  const [signState, setSignState] = useState("Sign In");
  const [loading,setLoading]=useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const userEmail = email.current.value;
      const userPassword = password.current.value;
      const userName = name.current?.value || "";
  
      if (signState === "Sign In") {
        await login(userEmail, userPassword);
      } else {
        await signup(userName, userEmail, userPassword);
      }
  
      email.current.value = "";
      password.current.value = "";
      if (name.current) name.current.value = "";
    } catch (error) {
      console.error(error);
      toast.error(error.code) 
    } finally {
      setLoading(false); 
    }
  };
  

  const handleSignIn = () => {
    setSignState("Sign In");
  };
  const handleSignUp = () => {
    setSignState("Sign Up");
  };

  return (
    loading?<div className="netflix-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className="login">
      <img src={logo} alt="" className="login-logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" && (
            <input type="text" placeholder="Your name" ref={name} />
          )}
          <input type="email" placeholder="Your email" ref={email} />
          <input
            type="password"
            placeholder="enter your password"
            ref={password}
          />
          <button onClick={user_auth} type="submit">
            {signState}
          </button>
          <div className="form-help">
            {signState === "Sign In" && (
              <div className="remember">
                <input type="checkbox" />
                <label htmlFor="">Remember Me</label>
              </div>
            )}
            <p>Need Help!</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix? <span onClick={handleSignUp}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have account?{" "}
              <span onClick={handleSignIn}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
