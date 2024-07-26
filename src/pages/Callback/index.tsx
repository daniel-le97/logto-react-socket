import { useHandleSignInCallback } from "../../lib/auth/handleCallback";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  const status = useHandleSignInCallback(() => {
    console.log({ status });
    navigate("/");
  });

  return status.isLoading ? <p>Redirecting...</p> : null;
};

export default Callback;
