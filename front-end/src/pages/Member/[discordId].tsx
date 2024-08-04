import { useAuthContext } from "@/contexts/authContext";
import { usePageSetting } from "@/contexts/pageSettingContext";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Task } from "@/interfaces/Task.interface";
import { User } from "@/interfaces/User.interface";

const MemberDetail: React.FC = () => {
  const { setTitle } = usePageSetting();
  const { authState } = useAuthContext();
  const { discordId } = useParams<{ discordId: string }>();

  /**
   * @// add your name here
   * Function to fetch member detail
   * @returns {Promise<void>}
   * @async
   * @description fetch member detail from discordId
   */

  const fetchMemberDetail = async () => {
    try {
      // Write your code here to fetch member detail using discordId
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Error fetching member detail:", error);
    }
  };

  useEffect(() => {
    if (!authState.isLoggedin) {
      return;
    }
    setTitle(`รายละเอียดงานของ ${discordId}`);
    fetchMemberDetail();
  }, [authState.isLoggedin, discordId, setTitle]);

  return <div>Member Detail {discordId}</div>;
};

export default MemberDetail;
