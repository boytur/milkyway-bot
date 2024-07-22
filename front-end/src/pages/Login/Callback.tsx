import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../contexts/authContext";
import { LocalStorage } from "../../utils/LocalStorage";

const Callback: React.FC = () => {
  const { setAuthState, setUser } = useAuthContext();
  const [isFetch, setIsFetch] = useState<boolean>(false);

  const getDiscordUser = async () => {
    const code = new URLSearchParams(window.location.search).get("code");
    const baseUrl = import.meta.env.VITE_BASE_URL;
    if (code) {
      try {
        setIsFetch(true);
        const response = await axios.post(
          `${baseUrl}/auth/callback?code=${code}`
        );

        const { user } = response.data;
        setUser({
          discord_id: user.discord_id,
          user_fname: user.user_fname,
          user_lname: user.user_lname,
          avatar: user.avatar,
        });

        setAuthState({
          isLoggedin: true,
          isFetching: false,
        });

        LocalStorage.setItem("acc_tk", response.data.acc_tk);
        LocalStorage.setItem("reff_tk", response.data.reff_tk);

        window.location.href = "/";
      } catch (error) {
        console.error("Error fetching user data:", error);
        window.location.href = "/login";
        localStorage.clear();
        setAuthState({
          isLoggedin: false,
          isFetching: false,
        });
      }
    }
  };

  if (!isFetch) {
    getDiscordUser();
  }
  return <div>Loading...</div>;
};

export default Callback;
