import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function SignUp() {
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  console.log(password);
  console.log(confirmPassword);

  // const handleOnChangeEmail = (event) => {
  //   setEmail(event.target.value);
  // }; similar to {(event)=> setEmail(even.target.value)})}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password not match");
      return; //Return further execution if password not match
    }

    const obj = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://901a66ca-eef2-4109-b2e9-a7fbdf25d72b-00-37gi8kq2m7k84.sisko.replit.dev/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        },
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container">
      <h3>Sign Up page</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            value={confirmPassword}
          />
        </Form.Group>

        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
