import { useAuthContext } from "../../contexts/authContext";
import React, { useEffect } from "react";

interface Props {}

const Login: React.FC<Props> = () => {
  const { authState, login } = useAuthContext();

  useEffect(() => {
    if (!authState.isLoggedin) {
      login();
    }
  }, []);
  return <></>;
};

export default Login;
