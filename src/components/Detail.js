import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Detail.module.css"

function Detail () {
  const {id} = useParams();
  const [info, setInfo] = useState({})
  const getMovies = async()=>{
    const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
    setInfo(json.data.movie)
  }
  useEffect(() => {
    getMovies();
  }, []);
  console.log(info)

  return (
  <div className={styles.Detail} style={{backgroundImage: `url(${info.large_cover_image})`}}>
    <div className={styles.body}>
      <img src={info.large_cover_image} className={styles.poster}></img>
      <div className={styles.contentbox}>
        <h1>{info.title}</h1>
        <span>{info.description_full}</span>
        {/* {info.genres.map((item)=><li>{item}</li>)} */}
      </div>      
    </div>
  </div>
  )
}

export default Detail;