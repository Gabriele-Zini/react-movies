import PropTypes from "prop-types";
import "../App.css";

function Card({ serie }) {
  return (
    <>
      <div className="col-12 col-md-4 col-xl-2">
        <div
          className=" ms_card mx-auto"
          style={{
            backgroundImage: `url(${
              serie.poster_path
                ? `https://image.tmdb.org/t/p/w342/${serie.poster_path}`
                : "/src/assets/no-image-available.svg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: `${!serie.poster_path ? "center" : ""}`,
            backgroundRepeat: "no-repeat",
            maxWidth: "200px",
          }}
        >
          <div className="ms_credits d-flex flex-column align-items-start justify-content-center p-2">
            <p className="m-0">
              <strong>Title: </strong>
              {serie.name}
            </p>
           { serie.credits.length>0 && <div>
              <strong>Cast:</strong>
              {serie.credits.map((credit, index) => {
                if (index < 5 && index < serie.credits.length - 1) {
                  return (
                    <span className="mx-1" key={index}>
                      {credit.name},
                    </span>
                  );
                } else if (index === 5 || index === serie.credits.length - 1) {
                  return (
                    <span className="mx-1" key={index}>
                      {credit.name}.
                    </span>
                  );
                } else {
                  return null;
                }
              })}
            </div>}
          </div>
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  serie: PropTypes.object.isRequired,
};

export default Card;
