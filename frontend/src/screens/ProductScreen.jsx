import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Container,
  Card,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useEffect, useState } from "react";

import Loader from "../components/Loader";
import Message from "../components/Message";

import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../features/productSlice";

import { addToCart } from "../features/cartSlice"; 




const ProductScreen = (props) => {
  // get id
  const { id } = useParams();
  const navigate = useNavigate();
  //NOT REDUX
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart({
      product: id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty
    }));
    navigate(`/cart/${id}?qty=${qty}`);
  };
  // REDUX
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { product, loading, error } = productList;

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  if (loading === "loading") return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

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

              {/* If product is in stock, show the quantity dropdown */}
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col xs="auto" className="my-1">
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                      {
                        [...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))
                      }
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item style={{ padding: "15px" }}>
                {" "}
                {/* Adjust the padding here */}
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    onClick={addToCartHandler}
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
