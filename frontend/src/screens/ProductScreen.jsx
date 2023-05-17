import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Container, Card } from "react-bootstrap";
import Rating from "../components/Rating";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductScreen = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

    const fetchData = async () => {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
    };

    useEffect(() => {
        fetchData();
    }, []);


  return (
    <Container>
      <Link to="/" className="btn btn-light my-3">
        Go back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: "15px" }}>
                {" "}
                {/* Adjust the padding here */}
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-block btn-lg btn-dark"
                    type="button"
                    disabled={product.countInStock === 0}
                    style={{
                      padding: "20px 30px",
                      fontSize: "16px",
                      fontWeight: "300",
                      backgroundColor: "#000",
                      width: "100%",
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductScreen;