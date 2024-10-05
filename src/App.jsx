import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './component/Header';
import { Link } from 'react-router-dom';


function App() {
  const apiKey="AIzaSyALUM2_WJk5PEBN_WD8x4cxMWm9B9gXSxA"

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${apiKey}`)
      .then(function (response) {
        setVideos(response.data.items);
      })
      .catch(function (error) {
        console.error('Error fetching videos:', error);
      });
  }, []);




  return (
    <>
      <Header></Header>
      <div className='flex flex-wrap w-[90vw] mt-[15vh]  gap-[2rem] mx-[auto] max-md:flex-col max-md:w-[100vw] max-md:items-center'>
        {videos.map(video => (
          <div  key={video.id.videoId} className='flex flex-col w-[20vw] max-md:w-[90vw]'>
            <Link to={`/show/${video.id.videoId}`}>
            <img className='rounded-[10px] max-md:w-[90vw]' src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            </Link>
            <h3>{video.snippet.title}</h3>
            <h4>{video.snippet.channelTitle}</h4>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

