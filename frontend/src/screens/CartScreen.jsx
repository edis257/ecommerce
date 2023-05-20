import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, addToCart } from "../features/cartSlice";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Container>
      <Row className="my-4">
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${(item.price * item.qty).toFixed(2)}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart({
                              product: item.product,
                              name: item.name,
                              image: item.image,
                              price: item.price,
                              countInStock: item.countInStock,
                              qty: Number(e.target.value),
                            })
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                  items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + Number(item.qty) * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn btn-block btn-lg btn-dark"
                  type="button"
                  style={{
                    padding: "20px 30px",
                    fontSize: "16px",
                    fontWeight: "300",
                    backgroundColor: "#000",
                    width: "100%",
                  }}
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartScreen;
