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
      console.log(response.data);
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
  }, []);

  return (
    <div style={{ height: "calc(100vh - 5rem)", overflowY: "scroll" }} className="m-2 bg-white border rounded-md">
      <div className="w-full p-4 bg-white rounded-md shadow-md">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="table-th">ลำดับ</th>
              <th scope="col" className="table-th">รูป</th>
              <th scope="col" className="table-th">ชื่อ-นามสกุล</th>
              <th scope="col" className="table-th">จำนวนงาน</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user, index: number) => (
              <tr key={user.discord_id} className="border-b">
                <td className="table-td">{index + 1}</td>
                <td className="table-td">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full border border-black overflow-hidden">
                      <img className="h-full w-full object-cover" src={`${user.avatar}`} alt="Avatar" />
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
