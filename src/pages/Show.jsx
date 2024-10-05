import Header from '../component/Header'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import user from '/icons/user.png'
import like from '/icons/like.png'
import dislike from '/icons/dislike.png'

import '../App.css'


function Show() {
    const apiKey = "AIzaSyALUM2_WJk5PEBN_WD8x4cxMWm9B9gXSxA"
    let { id } = useParams()
    const [videos, setVideos] = useState([]);
    const [video, setVideo] = useState(null);
    const [newComment, setNewComment] = useState();
    const [ourComments, setOurComments] = useState([]);
    const [comments, setComments] = useState([]);
    let userID = sessionStorage.getItem("userID")
    let userName = sessionStorage.getItem("userName")

    useEffect(() => {
        axios
            .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${apiKey}`)
            .then(function (response) {
                setVideos(response.data.items);
            })
    }, []);
    useEffect(() => {
        axios
            .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${apiKey}`)
            .then(function (response) {
                setVideo(response.data.items[0])
            })
    }, [id]);

    useEffect(() => {
        axios
            .get(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${id}&key=${apiKey}`)
            .then(function (response) {
                setComments(response.data.items)
            })
    }, [id]);

    useEffect(() => {
        axios
            .get(`https://66ea79ae55ad32cda4790255.mockapi.io/comments?videoID=${id}`)
            .then(function (response) {
                setOurComments(response.data)

            })
    }, [id, ourComments])

    function submitComment() {
        if (userID > 0) {
            axios
                .post("https://66ea79ae55ad32cda4790255.mockapi.io/comments", {
                    userID: userID,
                    userName: userName,
                    videoID: id,
                    post: newComment
                })
                .then(function (response) {
                    console.log(response)
                })
            setNewComment("")
        }
        else {
            window.alert("you should sign in before")
        }

    }
    return (
        <div>
            <Header></Header>
            <div className='flex justify-center gap-x-[2rem] mt-[10vh] max-md:flex-col-reverse'>
                <div>
                    <div className='flex flex-col w-[35vw] gap-y-[1rem] items-center max-md:w-[100vw]'>
                        {videos.map(video => (
                            <div key={video.id.videoId} className='flex w-[35vw] justify-between max-md:w-[90vw] max-md:flex-col-reverse max-md:items-center'>
                                <div className='flex flex-col w-[20vw] text-right p-[20px] max-md:w-[90vw]'>
                                    <p className='font-semibold'>{video.snippet.title}</p>
                                    <p>{video.snippet.channelTitle}</p>
                                </div>
                                <Link to={`/show/${video.id.videoId}`} className='w-[15vw] max-md:w-[90vw]'>
                                    <img className='rounded-[10px] max-md:w-[90vw]' src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-[52vw] max-md:w-[100vw]'>
                    <iframe
                        className='rounded-[10px] max-md:w-[100vw] max-md:rounded-none'
                        width="800"
                        height="500"
                        src={`https://www.youtube.com/embed/${id}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <div className='w-[52vw] max-md:w-[100vw]'>
                        {video ? (
                            <>
                                <div className="video-details mt-[20px] text-right">
                                    <h2 className='font-bold text-[1.3rem]'>{video.snippet.title}</h2>
                                    <div className='flex flex-row-reverse mt-[20px] items-center justify-between px-[1rem]'>
                                        <ul className='flex items-center gap-x-[1rem]'>
                                            <li><p className='flex justify-end gap-x-[1rem]'>{video.snippet.channelTitle}</p></li>
                                            <li><img src={user}></img></li>
                                        </ul>
                                        <ul className='flex items-center gap-x-[1rem]'>
                                            <li><button className='h-[40px] rounded-[50px] px-[20px] max-md:px-[10px] bg-black text-white'>اشترك</button></li>
                                            <li><button className='h-[40px] rounded-[50px] px-[20px] max-md:px-[10px] bg-gray-200'>الانظمام</button></li>
                                        </ul>
                                        <ul className='flex items-center '>
                                            <li>
                                                <button className='h-[40px] px-[20px] max-md:px-[10px] gap-x-[5px] rounded-[50px] bg-gray-100 flex justify-center rounded-r-none items-center'>
                                                    <p>{video.statistics.dislikeCount}</p>
                                                    <img className='w-[20px] h-[20px]' src={dislike}></img>
                                                </button></li>
                                            <li>
                                                <button className='h-[40px] px-[20px] max-md:px-[10px] gap-x-[5px] rounded-[50px] bg-gray-100 flex justify-center rounded-l-none border-l-[2px] border-gray-200 items-center'>
                                                    <p>{video.statistics.likeCount}</p>
                                                    <img className='w-[20px] h-[20px]' src={like}></img>
                                                </button></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className='bg-gray-100 p-[20px] w-[52] rounded-[10px] mt-[5vh] flex flex-col'>
                                    <div className='flex gap-x-[1rem] justify-end'>
                                        <p>تم النشر في{video.snippet.publishedAt.substring(0, 10)}</p>
                                        <p className='text-right'>مشاهدة {video.statistics.viewCount} </p>
                                    </div>
                                    <p className='text-right'>{video.snippet.description}</p>
                                </div>

                                <div className='mt-[5vh] w-[52vw] max-md:w-[90vw]'>
                                    <div className='font-bold text-[1.3rem] text-right'><span >تعليقا</span> {video.statistics.commentCount} </div>
                                </div>
                                <div className='flex flex-col gap-y-[1rem] max-md:w-[100vw] max-md:px-[10px]'>
                                    <input className='h-[40px] w-[100%] border-b-[1px] border-gray-500 focus:outline-none focus:border-b-[2px] text-right' placeholder='...إضافة تعليق' type='text' value={newComment} onChange={(e) => { setNewComment(e.target.value) }}></input>
                                    <button className='h-[40px] w-[fit-content] rounded-[50px] px-[20px] bg-blue-800 text-white' onClick={submitComment}>تعليق</button>
                                </div>
                                <div>
                                    <div className='flex flex-col-reverse'>
                                        {ourComments.map(comment => (
                                            <div key={comment.id} className="flex flex-col gap-y-[1rem] mb-[1rem]">
                                                <p className='text-right'><strong>{comment.userName}</strong></p>
                                                <p className='text-right'>{comment.post}</p>
                                                <div className='flex gap-x-[2rem] items-center justify-end'>
                                                    <img className='w-[20px] h-[20px]' src={dislike}></img>
                                                    <img className='w-[20px] h-[20px]' src={like}></img>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {comments.length > 0 ? (
                                        comments.map(comment => (
                                            <div key={comment.id} className="flex flex-col gap-y-[1rem]  mb-[1rem]">
                                                <p className='text-right'><strong>{comment.snippet.topLevelComment.snippet.authorDisplayName}</strong></p>
                                                <p className='text-right'>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                                                <div className='flex gap-x-[2rem] items-center justify-end'>
                                                    <img className='w-[20px] h-[20px]' src={dislike}></img>
                                                    <img className='w-[20px] h-[20px]' src={like}></img>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className='text-right mb-[2rem]'>No comments found.</p>
                                    )}
                                </div>

                            </>
                        ) : (
                            <p>Loading video details...</p>
                        )}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Show
