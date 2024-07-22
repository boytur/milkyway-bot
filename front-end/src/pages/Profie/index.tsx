import React from "react";
import { useAuthContext } from "../../contexts/authContext";
import TaskTable from "./TaskTable";

const Profile: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <div className="overflow-hidden" style={{ height: 'calc(100vh - 5rem)', overflowY: 'scroll' }}>
      {user && user.discord_id !== null && (
        <>
          <div className=" bg-white m-2 flex justify-center border rounded-md">
            <div className="h-full flex flex-col items-center">
              <img
                className="`w-[10rem] h-[10rem]  rounded-full"
                src={`https://cdn.discordapp.com/avatars/${user.discord_id}/345b0de9ca8afd258be4a72ef6149e1c?size=1024`}
                alt=""
              />
              <p className=" text-lg font-bold mt-3 mb-2">
                {user?.user_fname} {user.user_lname}
              </p>
            </div>
          </div>
          <div className="bg-white m-2 rounded-md border">
            <TaskTable />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
