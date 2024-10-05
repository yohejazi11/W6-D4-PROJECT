import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react"
import googleLogo from "/icons/google.png"
function Signin() {
  const [userName, setUserName] = useState()
  const [userPassword, setUserPassword] = useState()
  const navigate = useNavigate();

  function loginFun() {
    axios
      .get("https://66ea79ae55ad32cda4790255.mockapi.io/user")
      .then(function (response) {
        const user = response.data.find((user) =>
          user.username === userName && user.password === userPassword
        );
        if (user) {
          sessionStorage.setItem("userID", user.id);
          sessionStorage.setItem("userName", user.username);
          navigate("/");
        } else {
          alert("Invalid username or password");
        }
      })
  }
  return (
    <div className="w-[100vw] h-[100vh] bg-gray-100 flex justify-center items-center ">
      <div className="w-[80vw] h-[70vh] flex bg-white rounded-[50px] p-[20px]">

        <div className="flex flex-col w-[50%] h-[70vh] gap-y-[2rem]">
          <img className="w-[5vw]" src={googleLogo}></img>
          <h1 className="text-[2rem] font-semibold">Sign in</h1>
          <p>to continue to youtube</p>
        </div>
        <div className="flex flex-col w-[50%] h-[70vh] justify-center items-end gap-y-[2rem]">
          <input className="border-[1px] rounded-[5px] h-[60px] w-[100%] text-right border-gray-900 focus:outline-blue-700 px-[20px]" type="text" value={userName} onChange={(e) => { setUserName(e.target.value) }} placeholder="Username"></input>
          <input className="border-[1px] rounded-[5px] h-[60px] w-[100%] text-right border-gray-900 focus:outline-blue-700 px-[20px]" type="password" value={userPassword} onChange={(e) => { setUserPassword(e.target.value) }} placeholder="password"></input>
          <p className="text-blue-700 self-start">Forget Password?</p>
          <p className="w-[80%] self-start">Not your computer? Use Guest mode to sign in privately. <span className="text-blue-700 font-medium">Learn more about using Guest mode</span></p>
          <div className="flex justify-end gap-x-[2rem]">
            <button className="text-blue-700"><Link to="/signup">Create account</Link></button>
            <button className="h-[40px] px-[20px] bg-blue-700 rounded-[50px] text-white" onClick={loginFun}>log in</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
