import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useLocalStorage("token", "");
  console.log(token);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://901a66ca-eef2-4109-b2e9-a7fbdf25d72b-00-37gi8kq2m7k84.sisko.replit.dev/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.token);
        setToken(data.token);
        console.log(token);
      } 
    } catch (error) {
      console.error(error.message);
    }
  };

  const navToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="container">
      <h3>Login page</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>

        <Button
          variant="outline-primary"
          type="submit"
          style={{ marginRight: "10px" }}
        >
          Submit
        </Button>

        <Button variant="outline-secondary" onClick={navToSignUp}>
          Sign Up
        </Button>
      </Form>
    </div>
  );
}
