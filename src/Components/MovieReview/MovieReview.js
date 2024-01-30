import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import axios from "axios";

const REVIEW_API = 'https://65a096c3600f49256fb0123d.mockapi.io/api/v1/Movies/';
//{REVIEW_API} + {movieID:movieID} + "/Reviews"
const MovieReview = ({movieID}) => {
    console.log({movieID:movieID});
    const [reviews, setReviews] = useState([]);
    // lists the reviews from the API
     const [updateReviews, setUpdateReviews] = useState(false); 
    // updates the reivews, Boolean, when new review added, re-trigger API to get the latest one
    const [review, setReview] = useState({});
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
                    "https://65a096c3600f49256fb0123d.mockapi.io/api/v1/Movies/" + {movieID:movieID} + "/Reviews",
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
        if (!review.text || !review.stars) {
            toast.error("Both review stars and all text fields are required", {
                hideProgressBar: true,
            });
            return;
        }
        if (review.text && review.stars && review.name && movieID) {
            try {
                await axios.post(
                    REVIEW_API,
                    {
                        ...review,
                        movieID,
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
        }
    };

    return(
        <div className="movie-reviews">
            <div>
                <h4>Create a Review!</h4>
                <Form>
                    <FormGroup>
                        <Label for="exampletext">Overall Rating</Label>
                        <div>
                            <Rating 
                            onClick={handleRating}
                            initialValue={review.stars}
                            size={24}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="reviewText">Leave your review here</Label>
                        <Input
                        type="namearea"
                        name="nameText"
                        id="nameText"
                        onChange={handleNameText}
                        />
                        <Input
                        type="textarea"
                        name="reviewText"
                        id="reviewText"
                        onChange={handleReviewText}
                        />
                    </FormGroup>
                    <Button color="info" onClick={handleSubmit}>Submit</Button>
                </Form>
            </div>
            {reviews.length ? (
                <div className="reviews">
                <h2>Customer Reviews</h2>
                {reviews.map(({ text, stars, name, createdAt }) => (
                    <div className="review">
                        <div className="name">
                            <span>{name}</span>
                        <Rating size={24} readonly initialValue={stars} />
                        </div>
                        <p>Reviewed at: {new Date(createdAt).toLocaleDateString()}</p>
                        <p>{text}</p>
                    </div>
                ))}
                </div>
            ) : null}
        </div>
    )
};

export default MovieReview;