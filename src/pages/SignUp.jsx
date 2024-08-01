import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [existingEmails, setExistingEmails] = useState([]);

  console.log(existingEmails);

  const navigate = useNavigate();
  const navToLogin = () => {
    navigate("/login");
  };

  console.log(password);
  console.log(confirmPassword);

  useEffect(() => {
    const checkEmail = async () => {
      try {
        const response = await fetch(
          "https://blog-api-express-js-l9by.vercel.app/signup",
        );
        const data = await response.json();
        const email = data.map((usersAccount) => usersAccount.email);
        console.log(email);
        setExistingEmails(email);
      } catch (error) {
        console.error(error.message);
      }
    };

    checkEmail();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (existingEmails.includes(email)) {
      alert("Email is registered, Please try another email");
    }

    if (password !== confirmPassword) {
      alert("Password not match");
      return;
    }

    const obj = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://blog-api-expressjs-git-main-rexes123s-projects.vercel.app/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        },
      );

      if (!response.ok) {
        throw new Error("Sign-up failed");
      }

      const data = await response.json();
      console.log(data);
      alert("Sign up successful!");
    } catch (error) {
      console.error(error.message);
      // alert("Invalid email or password");
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

        <Button
          variant="outline-primary"
          type="submit"
          style={{ marginRight: "10px" }}
        >
          Submit
        </Button>

        <Button variant="outline-secondary" onClick={navToLogin}>
          Login
        </Button>
      </Form>
    </div>
  );
}
