import { useNavigate } from "react-router-dom";

export default function Redirect({ to }) {
    const navigate = useNavigate();
    navigate(to ?? '/');
}