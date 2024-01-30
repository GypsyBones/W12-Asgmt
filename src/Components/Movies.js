import React from "react";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Row, Collapse} from 'reactstrap';
import MovieReview from './MovieReview/MovieReview'

const LIST_API = 'https://65a096c3600f49256fb0123d.mockapi.io/api/v1/Movies/';

const Movie = ({ id, title, year, synopsis, poster, rating, director, writers, starring }) => {
    const [open, setOpen] = useState(false);

    return (
    <>
        <div className="movie" id={id}>
            <img src={poster} alt={title} />
            <div className="movie-info-btn">
                <Button
                    color="link" 
                    onClick={() => setOpen(!open)}  
                    aria-controls="movie-info" 
                    aria-expanded={open}
                    >
                        <h5>{title}</h5>
                </Button>
                <span>{rating}★</span>
            </div>
            <Collapse in={open}>
                <div id="movie-info" className="movie-info">
                    <Col>
                        <img src={poster} alt={title} />
                    </Col>
                    <Col>
                        <Row>
                            <h3>{title}</h3>
                            <span>{year}</span>
                        </Row>
                        <h5>
                            Directed by {director}
                            Written by {writers}
                        </h5>
                        <p>
                            {synopsis}
                        </p>
                        <h5>
                            {starring}
                        </h5>
                    </Col>
                    <Col>
                        <Row>
                            <h4>{rating}</h4>
                            <Button variant="close"></Button>
                        </Row>
                        <h3>Reviews</h3>
                        <MovieReview movieID={Movie.id}/>
                    </Col>
                </div>
            </Collapse>
        </div>
    </>
)};

/*TODO add a card body toggle here? Toggles a span across the page that covers all movie information
also put reviews to the right, with a scroll feature, and the form is at the top, and is expandable 
when you click on the link 'add a review' HOW DO YOU GET A POPUP FORM???? 
also darken everything else out on the screen
also like the thought of the movie image being on the left of the information toggle, and
the information toggle being center screen, almost like it's zoomed in (wonder if the toggle could really
    just be a whole ass popup too? can you do a popup on top of a popup?)
*/
export default Movie