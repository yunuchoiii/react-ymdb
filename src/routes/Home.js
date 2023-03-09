import { useState, useEffect } from "react";
import Loader from "../components/Loader.js";
import Movie from "../components/Movie.js";
import styles from "./Home.module.css"

function Home () {

  const sortList = ['title', 'year', 'rating', 'download_count', 'like_count', 'date_added'];
  const sortKr = ['제목', '연도', '평가', '다운로드 수', '좋아요 수', '추가 일자']
  const orderLsit = ['asc', 'desc'];
  const orderKr = ['오름차순', '내림차순']

  const [selectSort, setSelectSort] = useState('');
  const [selectOrder, setSelectOrder] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  function changeSort (event) {
    setSelectSort(event.target.value);
    setPage(1);
  }
  function changeOrder (event) {
    setSelectOrder(event.target.value);
    setPage(1);
  }
  function nextPage () {
    setPage(page + 1);
    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  }
  function prevPage () {
    setPage(page - 1);
    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  }
  function clickMovie () {
    localStorage.setItem("page", page);
    localStorage.setItem("sort", selectSort);
    localStorage.setItem("order", selectOrder);
  }

  const getMovies = async () => {
    const json = await (await fetch(`https://yts.mx/api/v2/list_movies.json?sort_by=${selectSort}&order_by=${selectOrder}&page=${page}`)).json();
    setMovies(json.data.movies);
    setLoading(false);
  }

  useEffect(()=>{
    setLoading(true);
    getMovies();
  }, [selectOrder, selectSort, page])

  return <div className={styles.Home} style={{display: "flex", justifyContent: "center"}}>
    <div style={{padding: "30px 20%", width: "100%"}}>
      <div className={styles.upperbody}>
        <a href="/react-ymdb" className={`${styles.montserrat} ${styles.title}`}>
          <img src="https://cdn-icons-png.flaticon.com/512/4533/4533935.png" alt="ymdb" height="45px" style={{marginRight: "10px"}}></img>
          YMDB
        </a>
        <div style={{display: "flex", alignItems: "center"}}>
          <select onChange={changeSort}>
            <option value="" disabled>정렬</option>
            {
              sortList.map((item, i) => (
                item === 'date_added' ?
                <option value={item} key={item} selected>{sortKr[i]}</option> :
                <option value={item} key={item}>{sortKr[i]}</option>                
              )) 
            }
          </select>
          <select onChange={changeOrder}>
            <option value="" disabled>순서</option>
            {orderLsit.map((item, i) => (
                item === 'desc' ? 
                <option value={item} key={item} selected>{orderKr[i]}</option> :
                <option value={item} key={item}>{orderKr[i]}</option>
              ))
            }
          </select>
          <img src="https://cdn-icons-png.flaticon.com/512/151/151773.png" alt="" height="20px" style={{filter: "invert(1)", marginLeft:"10px"}}></img>
        </div>
      </div>
      {loading ? 
      <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems:"center"}}>
        <Loader/>
      </div>
      : movies.map(movie => 
        <button onClick={clickMovie} style={{width: "100%", textAlign: "left"}}>
          <Movie
            key={movie.id}
            id={movie.id}
            coverImg={movie.medium_cover_image}
            title={movie.title_long}
            summary={movie.summary}
            genres={movie.genres}
            rating={movie.rating}
          />          
        </button>
      )}
    </div>
    <div className={styles.buttonBox}>
      {page > 1 ? <button onClick={prevPage} className={`${styles.btn} ${styles.montserrat}`}>Prev</button> : <div></div>}
      {page < 4 ? <button onClick={nextPage} className={`${styles.btn} ${styles.montserrat}`}>Next</button> : <div></div>}        
    </div>
  </div>
};

export default Home;