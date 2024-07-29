import React from "react";
import { useAuthContext } from "@/contexts/authContext";
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
          <div className="flex justify-center m-2 bg-white border rounded-md ">
            <div className="flex flex-col items-center w-full h-full border">
              <div className="rounded-full border border-black object-cover w-[10rem] h-[10rem] flex justify-center overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={`${user.avatar}`}
                  alt=""
                />
              </div>
              <p className="mt-3 mb-2 text-lg font-bold ">
                {user?.user_fname} {user.user_lname}
              </p>
            </div>
          </div>
          <div className="m-2 bg-white border rounded-md">
            <TaskTable />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
