import PropTypes from "prop-types";
import "../App.css";

function Card({ movie }) {
  return (
    <>
      <div className="col-12 col-md-4 col-xl-2">
        <div
          className="ms_card mx-auto"
          style={{
            backgroundImage: `url(${
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
                : "/src/assets/no-image-available.svg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: `${!movie.poster_path ? "center" : ""}`,
            backgroundRepeat: "no-repeat",
            maxWidth: "200px",
          }}
        >
          <div className="ms_credits d-flex flex-column align-items-start justify-content-center p-2">
            <p className="m-0">
              <strong>Title: </strong>
              {movie.title}
            </p>
            {movie.credits.length > 0 && (
              <div>
                <strong>Cast:</strong>
                {movie.credits.map((credit, index) => {
                  if (index < 5 && index < movie.credits.length - 1) {
                    return (
                      <span className="mx-1" key={index}>
                        {credit.name},
                      </span>
                    );
                  } else if (
                    index === 5 ||
                    index === movie.credits.length - 1
                  ) {
                    return (
                      <span className="mx-1" key={index}>
                        {credit.name}.
                      </span>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            )}
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
