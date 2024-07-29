/**
@Sunshine☀️
@description display member users and their task count
@returns {React.FC} Member page component
*/
import { useAuthContext } from "@/contexts/authContext";
import { UserTaskCount } from "@/interfaces/User.interface";
import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";

const Member: React.FC = () => {
  const { authState } = useAuthContext();
  const [users, setUsers] = useState<UserTaskCount[]>([]);

  const getUsers = async () => {
    try {
      const response = await api.get("/api/user/users");
      console.log(response.data);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!authState.isLoggedin) {
      return;
    }
    getUsers();
  }, [authState]);

  return (
    <div className="w-full border p-4">
      <h1 className="text-xl font-semibold pb-4 mb-3 pl-3 border-b-[1px] ">รายชื่อสมาชิก</h1>
        <div className="-m-1.5">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <td scope="col" className="table-td text-center">ลำดับ</td>
                    <td scope="col" className="table-td text-center">โฉมหน้า</td>
                    <td scope="col" className="table-td text-center">ชื่อ</td>
                    <td scope="col" className="table-td text-center">นามสกุล</td>
                    <td scope="col" className="table-td text-center">จำนวนงาน</td>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user.discord_id}>
                      <td className="table-td text-center">{index + 1}</td>
                      <td className="table-td text-center flex justify-center">
                        <img src={user.avatar} alt="user"  className="w-14 h-14 rounded-full object-cover border-black border-[1px]" />
                      </td>
                      <td className="table-td text-center">{user.user_fname}</td>
                      <td className="table-td text-center">{user.user_lname}</td>
                      <td className="table-td text-center">{user.task_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Member;
