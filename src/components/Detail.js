import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Detail.module.css"
import Loader from "./Loader";

function Detail (props) {
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({})

  const getMovies = async()=>{
    const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
    setInfo(json.data.movie)
    setLoading(false);
  }
  useEffect(() => {
    getMovies();
  }, []);
  const runtime = `${Math.floor(info.runtime / 60)}h ${info.runtime % 60}m`

  function pagePop () {
    window.history.back();
  }

  console.log(info);

  return (
  <div className={styles.Detail} style={{backgroundImage: `url(${info.large_cover_image})`}}>
    {loading ? (
      <div className={styles.body} style={{backgroundColor: "#2a2b2b"}}>
        <Loader></Loader>
      </div>
    ) : (
    <div className={styles.body}>
      <div className={styles.box}>
        <img src="https://cdn-icons-png.flaticon.com/512/2997/2997911.png" alt="close" className={styles.closeBtn} onClick={pagePop}></img>
        <img src={info.large_cover_image} alt="poster" className={styles.poster}></img>
        <div className={styles.contentboxWrapper}>
          <div className={styles.contentbox}>
            <h1 className={styles.title}>{info.title}</h1>
            <div style={{display: "flex"}}>
              <a href={`https://www.imdb.com/title/${info.imdb_code}`}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png" alt="imdb" className={styles.imdbBtn}></img>
              </a>
              <div className={styles.minibox}>
                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt="rating" className={styles.miniicon} style={{filter: "invert(0)"}}></img>
                {info.rating}
              </div>
              <div className={styles.minibox}>
                <img src="https://cdn-icons-png.flaticon.com/512/5644/5644728.png" alt="year" className={styles.miniicon}></img>
                {info.year}
              </div>
              {info.runtime !== 0 ? (
                <div className={styles.minibox}>
                  <img src="https://cdn-icons-png.flaticon.com/512/992/992700.png" alt="runtime" className={styles.miniicon}></img>
                  {info.runtime < 60 ? info.runtime : runtime}
                </div>                
              ) : null}
              {info.mpa_rating !== "" ? (
                <div className={styles.minibox}>
                  <img src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="mpa_rating" className={styles.miniicon}></img>
                  {info.mpa_rating}
                </div>
              ) : null}
            </div>
            <span className={styles.summary}>{info.description_full}</span>
            <div style={{marginBlockStart: "25px"}}>
              {info.genres.map((g) => {
                return <span className={styles.tag} key={g}>#{g}</span>
              })}
            </div>
          </div>    
        </div>
      </div>
    </div>
    )}
    
  </div>
  )
}

export default Detail;