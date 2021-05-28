import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
    Container,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Button
} from "reactstrap";

export default function Profiledetails(props) {
    console.log("Rd");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const { id } = useParams();
    console.log(id);
    const history = useHistory();

    useEffect(() => {
        getDetails();
    }, []);

    function getDetails() {
        setLoading(true);
        fetch(`https://reqres.in/api/users/${id}`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setLoading(false);
                setData(result.data);
            })
            .catch((error) => {
                setLoading(false);
                console.log("error", error);
            });
    }

    return (
        <Container>
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                <>
                    <section className="movie-details-section">
                        <br />
                        <Card className="align-items-center text-center">
                            <br />
                            <CardTitle>
                                <h2>{data.first_name}</h2>
                            </CardTitle>
                            <CardImg
                                top
                                style={{ height: "480px", width: "360px" }}
                                src={data.avatar}
                                alt="Card image cap"
                            />
                            <CardBody>
                                <CardText>
                                    <p>
                                        <strong>Email Id: </strong>
                                        {data.email}
                                    </p>
                                    <p>
                                        <strong>First Name: </strong>
                                        {data.first_name}
                                    </p>
                                    <p>
                                        <strong>Last Name:</strong>
                                        {data.last_name}
                                    </p>
                                </CardText>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => history.goBack("/")}
                                >
                                    Go Back
                                 </button>
                            </CardBody>
                        </Card>
                    </section>
                </>
            )}
        </Container>
    );
}
