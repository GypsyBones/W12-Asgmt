import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import axios from "axios";
import '../../index.css'

const REVIEW_API = 'https://65a096c3600f49256fb0123d.mockapi.io/api/v1/Movies/';
//{REVIEW_API} + {movieID:movieID} + "/Reviews"
const MovieReview = ({movieID}) => {
    console.log({movieID});
    const [reviews, setReviews] = useState([]);
    // lists the reviews from the API
     const [updateReviews, setUpdateReviews] = useState(false); 
    // updates the reivews, Boolean, when new review added, re-trigger API to get the latest one
    const [review, setReview] = useState({
        stars: "",
        name: "",
        text: ""
    });
    //a single review added by the guest

    const handleRating = (newRating) => {
        setReview({ ...review, stars: newRating});
    };
    const handleReviewText = ({ target: { value } }) => {
        setReview({ ...review, text: value });
    };
    const handleNameText = ({ target: { value } }) => {
        setReview({...review, name: value });
    };

    useEffect(() => {
        const getReviews = async () => {
            try {
                const { data = [] } = await axios.get(
                `https://65a096c3600f49256fb0123d.mockapi.io/api/v1/Movies/${movieID}/Reviews`,
                );

                setReviews(data.reverse());
                setUpdateReviews(false);
                setReview({});
            } catch (error) {
            console.log({ error });
            }
        };
        getReviews();
    }, [movieID, updateReviews]);

    const handleSubmit = async() => { 
        console.log(`This is the movieID at handleSubmit:` + movieID)
        if (!review.text || !review.stars || !review.name) {
            toast.error("Both review stars and all text fields are required", {
                hideProgressBar: true,
            });
            return;
        }
        if (review.text && review.stars && review.name && movieID) {
            try {
                await axios.post(
                    `https://65a096c3600f49256fb0123d.mockapi.io/api/v1/Movies/${movieID}/Reviews`,
                    {
                        ...review
                    }
                );
                setUpdateReviews(true);
                } catch (error) {
                    toast.error("An error has occurred!", {
                        hideProgressBar: true,
                    });
                    console.log({error});
                }
        } else {
            toast.error("An error has occurred!", {
                hideProgressBar: true,
            });
        };
        setReview({
        stars: "",
        name: "",
        text: ""
        })
    };

    return(
        <div className="movie-reviews">
            {reviews.length ? (
                <div className="reviews">
                {reviews.map(({ id, text, stars, name, createdAt }) => (
                    <div className="review" key={`${movieID}:${id}`}>
                        <div className="reviewName">
                            <span>{name}</span>
                        <Rating className="reviewStars"size={15} readonly initialValue={stars} />
                        </div>
                        <p className='reviewDate'>Reviewed at: {new Date(createdAt).toLocaleDateString()}</p>
                        <p className='reviewText'>{text}</p>
                    </div>
                ))}
                </div>
            ) : null}
            <div>
                <h4>Create a Review!</h4>
                <Form>
                    <FormGroup>
                        <div>
                            <Rating 
                            onClick={handleRating}
                            initialValue={review.stars}
                            size={24}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="reviewText">Leave your review here:</Label>
                        <Input
                        placeholder="Name"
                        type="namearea"
                        name="nameText"
                        id="nameText"
                        value={review.name}
                        onChange={handleNameText}
                        />
                        <Input
                        placeholder="Review"
                        type="textarea"
                        name="reviewText"
                        id="reviewText"
                        value={review.text}
                        onChange={handleReviewText}
                        />
                    </FormGroup>
                    <Button color="primary" onClick={handleSubmit}>Submit</Button>
                </Form>
            </div>
        </div>
    )
};

export default MovieReview;