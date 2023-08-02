import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToken } from "../features/token/tokenSlice";
import { updateDatabase } from "../features/database/databaseSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const authLogin = async (e) => {
    e.preventDefault();
    const options = {
      method: "post",
      url: "https://reqres.in/api/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: { email: username, password: password },
    };
    await axios(options)
      .then(function (response) {

        dispatch(addToken(response.data.token));
        localStorage.setItem("token", response.data.token);

        dispatch(updateDatabase(JSON.parse(localStorage.getItem("database")) || []));
        navigate("/dashboard");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div
      className="layout-container"
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <div
        className="form-container"
        style={{
          backgroundColor: "whitesmoke",
          width: "100%",
          maxWidth: "600px",
          height: "max-content",
          outline: "1px solid lightgray",
          padding: "1rem",
          borderRadius: "1rem",
        }}
      >
        <Form onSubmit={(e) => authLogin(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Text className="text-muted">
              We&apos;ll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
