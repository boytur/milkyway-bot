import { useAuthContext } from "@/contexts/authContext";
import { UserTaskCount } from "@/interfaces/User.interface";
import { api } from "@/utils/api";
import React, { useEffect, useState } from "react";

/**
@TeEnInDy
@description display member users and their task count
@returns {React.FC} Member page component
*/

const Member: React.FC = () => {
  const { authState } = useAuthContext();
  const [users, setUsers] = useState<UserTaskCount[]>([]);

  const fetchUser = async () => {
    try {
      const response = await api.get("/api/user/users");
      setUsers(response.data.users);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    if (!authState.isLoggedin) {
      return;
    }
    fetchUser();
  }, [authState.isLoggedin]);

  return (
    <div style={{ height: "calc(100vh - 5rem)", overflowY: "scroll" }} className="m-2 bg-white border rounded-md">
      <div className="w-full p-4 shadow-md">
      <table className="min-w-full rounded-md">
        <thead className="table-thead">
            <tr className="table-tr">
              <th scope="col" className="table-th rounded-tl-md">ลำดับ</th>
              <th scope="col" className="table-th">รูป</th>
              <th scope="col" className="table-th">ชื่อ-นามสกุล</th>
              <th scope="col" className="table-th rounded-tr-md">จำนวนงาน</th>
            </tr>
          </thead>
          <tbody className="cursor-pointer">
            {users.map((user, index: number) => (
              <tr className="border-b table-tr" key={user.discord_id} onClick={()=> {window.location.href = `member/${user.discord_id}`}}>
                <td className="table-td">{index + 1}</td>
                <td className="table-td">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 overflow-hidden border border-black rounded-full">
                      <img className="object-cover w-full h-full" src={`${user.avatar}`} alt="Avatar" />
                    </div>
                  </div>
                </td>
                <td className="table-td">{`${user.user_fname} ${user.user_lname}`}</td>
                <td className="table-td">{user.task_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Member;
