import PropTypes from "prop-types";
import "../App.css";

function Card({ serie }) {
 
  return (
    <>
      <div className="col-12 col-md-8 col-lg-4 col-xxl-2 ms-3">
        <div
          className=" ms_card mx-auto"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w342${serie.poster_path})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            maxWidth:'200px',
          }}
        >
          <div className="ms_credits d-flex flex-column align-items-start justify-content-center p-2">
            <p className="m-0">
              <strong>Title: </strong>
              {serie.title}
            </p>
            <div>
              <strong>Cast:</strong>
              {serie.credits.map((credit, index) => {
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
  serie: PropTypes.object.isRequired,
};

export default Card;