import { useState, useEffect } from "react";
import Movie from "../components/Movie.js";
import styles from "./Home.module.css"

function Home () {

  const sortList = ['title', 'year', 'rating', 'peers', 'seeds', 'download_count', 'like_count', 'date_added'];
  const orderLsit = ['asc', 'desc'];

  const [selectSort, setSelectSort] = useState('');
  const [selectOrder, setSelectOrder] = useState('');

  function changeSort (event) {
    setSelectSort(event.target.value);
  }
  function changeOrder (event) {
    setSelectOrder(event.target.value);
  }

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (await fetch(`https://yts.mx/api/v2/list_movies.json?sort_by=${selectSort}&order_by=${selectOrder}`)).json();
    setMovies(json.data.movies);
    setLoading(false);
  }
  useEffect(()=>{
    getMovies();
    console.log('yes')
  }, [selectOrder, selectSort])

  return <div className={styles.Home} style={{display: "flex", justifyContent: "center", padding: "30px 20%"}}>
    {loading ? 
      <div style={{height: "100vh"}}>
        <h1>Loading...</h1> 
      </div>
      : 
      <div>
        <div className={styles.upperbody}>
          <div className={`${styles.montserrat} ${styles.title}`}>
            <img src="https://cdn-icons-png.flaticon.com/512/4533/4533935.png" height="45px" style={{marginRight: "10px"}}></img>
            YMDB
          </div>
          <div style={{display: "flex", alignItems: "center"}}>
            <select onChange={changeSort}>
              <option value="" disabled selected>Sort By</option>
              {sortList.map((item) => <option value={item} key={item}>{item}</option>)}
            </select>
            <select onChange={changeOrder}>
              <option value="" disabled selected>Order By</option>
              {orderLsit.map((item) => <option value={item} key={item}>{item}</option>)}
            </select>
            <img src="https://cdn-icons-png.flaticon.com/512/151/151773.png" height="20px" style={{filter: "invert(1)", marginLeft:"10px"}}></img>
          </div>
        </div>
        {movies.map(movie => 
          <Movie
            key={movie.id}
            id={movie.id}
            coverImg={movie.medium_cover_image}
            title={movie.title_long}
            summary={movie.summary}
            genres={movie.genres}
            rating={movie.rating}
          />
        )}
      </div>
    }
  </div>
};

export default Home;