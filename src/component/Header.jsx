import microphone from '/icons/microphone.png'
import bell from '/icons/bell.png'
import video from '/icons/video.png'
import user from '/icons/user.png'
import search from '/icons/search.png'
import userr from '/icons/userr.png'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Header() {
    const [userID, setUserId] = useState(null)
    useEffect(() => {
        const storedUserID = sessionStorage.getItem("userID")
        setUserId(storedUserID)
    }, [])

    function logoutFun(){
        sessionStorage.clear();
        setUserId(null);
    }
    return (
        <div className='flex justify-between items-center fixed h-[10vh] w-[100%] top-0 bg-white px-[2rem]'>

            <ul className='flex gap-x-[2rem] items-center'>
                {
                    userID ? (
                        <>
                            <li><img src={user} alt="User Icon" /></li>
                            <li className='w-[20px] max-md:hidden'><img src={bell} alt="Bell Icon" /></li>
                            <li className='w-[30px] max-md:hidden'><img src={video} alt="Video Icon" /></li>
                            <li><button className='h-[40px] border-[1px] border-gray-200 gap-x-[1rem] rounded-[50px] text-[14px] px-[10px]' onClick={logoutFun}>Log out</button></li>
                        </>
                    ) : (
                        <li><Link to="/login">
                            <button className='h-[40px] border-[1px] flex flex-row-reverse justify-between items-center border-gray-200 gap-x-[1rem] rounded-[50px] text-[14px] px-[10px]'>
                                <p>Log In</p>
                                <img className='w-[24px]' src={userr}></img>
                            </button>
                        </Link></li>
                    )
                }
            </ul>

            <ul className='flex gap-x-[0.5rem] items-center max-md:hidden'>
                <li className='bg-gray-100 rounded-[50%] h-[40px] w-[40px] flex justify-center items-center'><img className=' w-[18px]' src={microphone}></img></li>
                <li className='flex justify-center'>
                    <button className='rounded-l-[50px] border-[1px] border-gray-300 h-[40px] w-[4vw] bg-gray-50 flex justify-center items-center'><img src={search} className='w-[20px]'></img></button>
                    <input type='search' placeholder='بحث' className='border-[1px] border-gray-300 rounded-r-[50px] h-[40px] w-[35vw] text-right border-l-0'></input>
                </li>
            </ul>

            <ul className='flex items-center gap-x-[0.5rem]'>
                <li className='w-[2vw]'><img src='https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png'></img></li>
                <li className='font-bold text-xl'>YouTube<sup className='font-thin text-sm'>SA</sup></li>
                <li className='w-[50px] h-[5vh] flex flex-col gap-y-[6px] items-center justify-center'>
                    <div className='w-[25px] h-[2px] bg-slate-600 rounded-2xl'></div>
                    <div className='w-[25px] h-[2px] bg-slate-600 rounded-2xl'></div>
                    <div className='w-[25px] h-[2px] bg-slate-600 rounded-2xl'></div>

                </li>
            </ul>


        </div>
    )
}

export default Header
