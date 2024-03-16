import PropTypes from "prop-types";
import "../App.css";

function Card({ movie }) {
 
  return (
    <>
      <div className="col-12 col-md-6 col-lg-4 col-xxl-2">
        <div
          className=" ms_card mx-auto"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w342/${movie.poster_path})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            width:'100%',
            height:'100%'
          }}
        >
          <div className="ms_credits d-flex flex-column align-items-start justify-content-center p-2">
            <p className="m-0">
              <strong>Title: </strong>
              {movie.title}
            </p>
            <div>
              <strong>Cast:</strong>
              {movie.credits.map((credit, index) => {
                if (index < 5) {
                  return <span className="mx-1" key={index}>{credit.name},</span>;
                } else if (index === 5) {
                  return <span className="mx-1" key={index}>{credit.name}.</span>;
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default Card;
