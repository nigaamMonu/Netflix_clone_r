import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { Link, useParams } from 'react-router-dom';

const Player = () => {
  const { movie_id } = useParams();
  

  const [apiData, setApiData] = useState({
    key: "",
    name: "",
    published_at: "",
    type: ""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzdjYTI0YzJhMWJlM2NlZDNmZDgwNTBjYjljMWMzYiIsIm5iZiI6MTc0MDI5MDY4NS40NTQwMDAyLCJzdWIiOiI2N2JhYmE3ZDA2YjU1MzZiZGMwYWE4YWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.LKl-I4IMmiooHFm2_IhlGUQWXXHEX947ZBABEBMa8Uk'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]);
        }
      })
      .catch(err => console.error(err));
  }, [movie_id]); // ✅ Added dependency array

  return (
    <div className='player'>
      <Link to="/"><img src={back_arrow_icon} alt="Back" className="back-button" /></Link>
      <iframe 
        width="90%" 
        height="90%" 
        src={`https://www.youtube.com/embed/${apiData.key}`} 
        title='trailer' 
        frameBorder={0} 
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at ? apiData.published_at.slice(0,10) : "N/A"}</p>
        <p>{apiData.name || "Unknown"}</p>
        <p>{apiData.type || "Unknown"}</p>
      </div>
    </div>
  );
};

export default Player;
