import { useEffect, useState } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import useLocalStorage from "use-local-storage";
import { jwtDecode } from "jwt-decode";

export default function Main() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [date, setDate] = useState(new Date());
  console.log(date);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
    console.log(content);
  };

  const handleAuthor = (e) => {
    setAuthor(e.target.value);
    console.log(author);
  };

  const handleEdit = (id) => {
    navigate(`edit/${id}`);
  };

  const add = async () => {
    setShow(false);

    let obj = {
      title: title,
      content: content,
      author: author,
    };

    try {
      const response = await fetch(
        "https://blog-api-expressjs-git-main-rexes123s-projects.vercel.app/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(obj),
        },
      );
      const data = await response.json();
      console.log(data);
      setAllData((prevData) => {
        const updatedData = [...prevData, data];
        return updatedData.sort(
          (a, b) => new Date(a.createAt) - new Date(b.createAt),
        );
      });
      return;
    } catch (error) {
      console.error(error.message);
    }
  };

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const decode = jwtDecode(token);
      const id = decode.id;
      const email = decode.email;
      console.log(email);

      const response = await fetch(
        `https://blog-api-expressjs-git-main-rexes123s-projects.vercel.app/posts/user/${id}`,
      );
      const data = await response.json();
      console.log(data);
      const sortedData = data.sort(
        (a, b) => new Date(a.createAt) - new Date(b.createAt),
      );
      setAllData(sortedData);
    };
    getData();
  }, []);

  const handleDelete = async (index) => {
    const id = allData[index].id;
    console.log(id);

    try {
      const response = await fetch(
        `https://blog-api-expressjs-git-main-rexes123s-projects.vercel.app/post/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        const updatedData = [...allData];
        updatedData.splice(index, 1);
        setAllData(updatedData);
      } else {
        console.error(`Error: ${response.status} - ${await response.text()}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <div>
        <Button variant="outline-primary" onClick={handleShow}>
          Post
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="Text"
                  placeholder="Title"
                  onChange={handleTitle}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Content"
                  rows={3}
                  onChange={handleContent}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="Text"
                  placeholder="Author"
                  onChange={handleAuthor}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={add}>
              Post
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {allData.map((post, index) => {
          const updateAt = post.update_at ? new Date(post.update_at) : null;
          const createAt = new Date(post.create_at);
          return (
            <div key={index}>
              <Card>
                {/* <Card.Header>{post.id}</Card.Header> */}
                <Card.Header>
                  {updateAt ? (
                    <span>Updated At: {updateAt.toLocaleString()}</span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </Card.Header>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <blockquote className="blockquote mb-0">
                    <p> {post.content} </p>
                    <footer className="blockquote-footer">
                      {" "}
                      <cite title="Source Title">{post.author}</cite>
                    </footer>
                  </blockquote>
                  <div style={{ marginTop: "10px" }}>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(index)}
                      style={{ marginRight: "10px" }}
                    >
                      Delete
                    </Button>

                    <Button
                      variant="outline-info"
                      onClick={() => handleEdit(post.id)}
                    >
                      Edit
                    </Button>
                  </div>
                </Card.Body>
                <Card.Footer className="text-muted">
                  Created At: {createAt.toLocaleString()}
                </Card.Footer>{" "}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
