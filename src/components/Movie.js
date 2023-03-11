import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import styles from "./Movie.module.css"

function Movie ({id, coverImg, title, summary, genres, rating}) {
  return (
    <Link to={`/movie/${id}`} style={{ textDecoration: 'none', color: "black", width: "700px"}}>
      <div className={styles.background} style={{backgroundImage: `url(${coverImg})`}}>
        <div className={styles.movie_box}>
          <img src={coverImg} alt={title} className={styles.poster}></img>
          <div style={{padding: "0px 30px", width: "100%", position: "relative"}}>
            <h2>
              {title}
            </h2>
            <p className={styles.summary}>{summary}</p>
            <div className={styles.bottom}>
              <div style={{display:"flex", alignItems: "center", marginRight:"20px"}}>
                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt="rating" style={{width: "20px", marginRight: "5px"}}></img>
                <span style={{fontSize:"1.2rem", marginTop:"3px"}}>{rating}</span>
              </div>
              <div>
              {typeof genres !== 'undefined' && genres.length > 0 ? genres.slice(0, 4).map((g, i) => (
                <span className={styles.tag} key={g}>#{g}</span>
              )) : null}
              </div>
            </div>

          </div>
        </div>
      </div>
      
    </Link>
  )
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;