import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
// import cards_data from "../../assets/cards/Cards_data";

const TitleCards = ({title,category}) => {
  const [apiData, setApiData]=useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzdjYTI0YzJhMWJlM2NlZDNmZDgwNTBjYjljMWMzYiIsIm5iZiI6MTc0MDI5MDY4NS40NTQwMDAyLCJzdWIiOiI2N2JhYmE3ZDA2YjU1MzZiZGMwYWE4YWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.LKl-I4IMmiooHFm2_IhlGUQWXXHEX947ZBABEBMa8Uk'
    }
  };
  


  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const ref = cardsRef.current;
    ref.addEventListener("wheel", handleWheel);


    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => {setApiData(res.results)})
    .catch(err => console.error(err));

    return () => {
      ref.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index} >
              <img src={`https://image.tmdb.org/t/p/original${card.backdrop_path}`} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
