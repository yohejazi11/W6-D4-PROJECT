import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react"
import googleLogo from "/icons/google.png"

function Signup() {

  const [firstName, setFirstName] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail,setUserEmail]=useState("")
  const [userPassword, setUserPassword] = useState("")

  const navigate = useNavigate();

  function createAccount(){
    if(!firstName || !userName || !userEmail || !userPassword){
      window.alert("please enter correct value")
    }
    else if(userPassword.length < 8)
    {
      window.alert("password should more then 8 carachter")
    }
    else if(!userEmail.includes("@")){
      window.alert("email should contain @")
    }
    else{
      axios
      .post("https://66ea79ae55ad32cda4790255.mockapi.io/user",{
        name:firstName,
        username:userName,
        email:userEmail,
        password:userPassword
      })
      .then(function(response){
        navigate("/login")
        console.log(response)
      })
    }

  }
  return (
    <div className="w-[100vw] h-[100vh] bg-gray-100 flex justify-center items-center ">
      <div className="w-[80vw] h-[70vh] flex bg-white rounded-[50px] p-[20px]">

        <div className="flex flex-col w-[50%] h-[70vh] gap-y-[2rem]">
          <img className="w-[5vw]" src={googleLogo}></img>
          <h1 className="text-[2rem] font-semibold">Create a Google Account</h1>
          <p>Enter your info</p>
        </div>
        <div className="flex flex-col w-[50%] h-[70vh] justify-center items-end gap-y-[2rem]">
          <input className="border-[1px] rounded-[5px] h-[60px] w-[100%] text-right border-gray-900 focus:outline-blue-700 px-[20px]" type="text" value={userName} onChange={(e) => { setUserName(e.target.value) }} placeholder="Username"></input>
          <input className="border-[1px] rounded-[5px] h-[60px] w-[100%] text-right border-gray-900 focus:outline-blue-700 px-[20px]" type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} placeholder="first name"></input>
          <input className="border-[1px] rounded-[5px] h-[60px] w-[100%] text-right border-gray-900 focus:outline-blue-700 px-[20px]" type="email" value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} placeholder="Email"></input>
          <input className="border-[1px] rounded-[5px] h-[60px] w-[100%] text-right border-gray-900 focus:outline-blue-700 px-[20px]" type="password" value={userPassword} onChange={(e) => { setUserPassword(e.target.value) }} placeholder="password"></input>
          <div className="flex justify-end gap-x-[2rem]">
            <button className="text-blue-700"><Link to="/login">I alredy have accuont</Link></button>
            <button className="h-[40px] px-[20px] bg-blue-700 rounded-[50px] text-white" onClick={createAccount}>Create</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
