import React from "react";
import { useAuthContext } from "../../contexts/authContext";
import TaskTable from "./TaskTable";

const Profile: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <div
      className="overflow-hidden"
      style={{ height: "calc(100vh - 5rem)", overflowY: "scroll" }}
    >
      {user && user.discord_id !== null && (
        <>
          <div className=" bg-white m-2 flex justify-center border rounded-md">
            <div className="h-full w-full border  flex flex-col items-center">
              <div className="rounded-full border border-black object-cover w-[10rem] h-[10rem] flex justify-center overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={`${user.avatar}`}
                  alt=""
                />
              </div>
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
