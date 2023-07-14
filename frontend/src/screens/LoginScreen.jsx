import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { loginUser } from "../features/userSlice";

const LoginScreen = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.user);
  const { userInfo, loading, error } = userLogin;

  const navigate = useNavigate(); // get navigate function

  useEffect(() => {
    if (userInfo) {
      navigate(redirect); // navigate instead of history.push
    }
  }, [navigate, userInfo, redirect]); // pass navigate to the dependencies array

  const submitHandler = (e) => {
    e.preventDefault();
    // DISPATCH LOGIN
    console.log("submitted");
    dispatch(loginUser({ username, password }));
  };

  return (
    <div className="py-3">
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading === "loading" && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default LoginScreen;
