import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button variant="outline-secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
