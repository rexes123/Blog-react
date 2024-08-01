import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

export default function Edit() {
  const [editItem, setEditItem] = useState({
    title: "",
    content: "",
    author: "",
    update_at: "",
  });

  console.log(editItem);
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage("token", "");
  console.log(token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const { id } = useParams();
  console.log("ID from params", id);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://blog-api-expressjs-git-main-rexes123s-projects.vercel.app/posts/${id}`,
        );
        const data = await response.json();
        setEditItem({ ...data[0], update_at: new Date().toISOString() });
      } catch (error) {
        console.error(error.message);
      }
    };
    getData();
  }, [id]);

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://blog-api-expressjs-git-main-rexes123s-projects.vercel.app/post/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            //Include JWT in the Authorization header
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...editItem,
            update_at: new Date().toISOString(),
          }),
        },
      );
      const data = await response.json();
      console.log(data);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleOnChgTitle = (e) => {
    setEditItem({
      ...editItem,
      title: e.target.value,
    });
  };

  const handleOnChgContent = (e) => {
    setEditItem({
      ...editItem,
      content: e.target.value,
    });
  };

  const handleOnChgAuthor = (e) => {
    setEditItem({
      ...editItem,
      author: e.target.value,
    });
  };

  return (
    <div className="container">
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="Text"
            placeholder="Title"
            value={editItem.title}
            onChange={handleOnChgTitle}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Content"
            value={editItem.content}
            onChange={handleOnChgContent}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="Text"
            placeholder="Author"
            value={editItem.author}
            onChange={handleOnChgAuthor}
          />
        </Form.Group>
      </Form>
      <Button variant="outline-primary" onClick={handleSave}>
        Save
      </Button>{" "}
    </div>
  );
}
