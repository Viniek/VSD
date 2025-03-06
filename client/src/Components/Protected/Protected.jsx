import useUserStore from "../../../Store/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Protected({ children }) {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/");
  });
  return <div>{children}</div>;
}

export default Protected;
