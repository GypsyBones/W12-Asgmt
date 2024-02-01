import React from "react";
import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Collapse } from "reactstrap";
import { Rating } from "react-simple-star-rating";
import MovieReview from "./MovieReview/MovieReview";
import '../index.css'

//const LIST_API = 'https://65a096c3600f49256fb0123d.mockapi.io/api/v1/Movies/';

const Movie = ({ movie }) => {
  const {
    id,
    title,
    year,
    director,
    writers,
    starring,
    rating,
    synopsis,
    poster,
  } = movie;
  const [open, setOpen] = useState(false);
  const collapseRef = useRef([]);
  const buttonHandler = () => {
    setOpen(true);
    //collapseRef.current.scrollIntoView({behavior: 'smooth', block: "end", inline: "nearest"});
  }

  
  console.log(open);
  return (
    <div>
      <div>
          <div className='col'>
            <div className='movie' id={id}>
              <img src={poster} alt={title} />
              <div className='movie-info-btn'>
                <Button
                  color='link'
                  onClick={buttonHandler}
                  aria-controls='movie-info'
                  aria-expanded={open}
                >
                  <h5>{title}</h5>
                </Button>
                <span>{rating}★</span>
              </div>
            </div>
        </div>
        {open === true && (
        <Collapse ref={collapseRef} isOpen={open}>  
          <Row className="movie-toggle">
            <Col>
              <Row>
                <Col id='movie-info' className='col-3 movie-info'>
                  <div>
                    <img src={poster} alt={title} width='250px' />
                  </div>
                </Col>
                <Col className='col info-container'>
                  <div className="titleContainer">
                    <h2>{title}</h2>{year}
                  </div>
                  <div className="infoItems">
                    <h5>Directed by {director}</h5>
                    <h6>Written by {writers}</h6>
                  </div>
                  <div className="infoItems">
                    <p>{synopsis}</p>
                  </div>
                  <div className="infoItems">
                    <h5>Starring {starring}</h5>
                  </div>
                </Col>
                <Col className='col'>
                  <div>
                    <Row className="btnContainer">
                      <div className="empty">d</div>
                      <Button className="button-close"variant='close' onClick={() => setOpen(false)}>
                        X 
                      </Button>
                    </Row>
                    <Row className='reviewRow'>
                      <Col className="review-col">
                        <Row>
                          <Col className="titleContainer">
                            <Col className="col">
                              <h2>Reviews</h2>
                            </Col>
                            <Col>
                              <Row className=" movieRating">
                                <Col className="col">
                                  Average:
                                </Col>
                                <Col className="col rating">
                                  <Rating 
                                  size={20} 
                                  readonly 
                                  initialValue={rating}/>
                                </Col> 
                              </Row>
                            </Col>
                          </Col>
                        </Row>
                        <div>
                          <MovieReview movieID={id} />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>  
        </Collapse>
        )}
      </div>
    </div>
  );
};

/*TODO if/else statement that closes any other toggled movie section to close before opening the new one

*/
export default Movie;
