/**
 
@Plengapipat0709
@description display member users and their task count
@returns {React.FC} Member page component
*/

import { useAuthContext } from "@/contexts/authContext";
import { UserTaskCount } from "@/interfaces/User.interface";
import { api } from "@/utils/api";
import React, { useEffect, useState } from "react";

const Member: React.FC = () => {
  const { authState } = useAuthContext();
  const [users, setUsers] = useState<UserTaskCount[]>([]);

  const fetchUser = async () => {
    try {
      const response = await api.get("/api/user/users");
      console.log(response.data);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!authState.isLoggedin)
      return;
    fetchUser();
  }, [authState.isLoggedin]);

  // เรียงลำดับผู้ใช้ตามจำนวนงานจากมากไปน้อย
  const sortedUsers = [...users].sort((a, b) => b.task_count - a.task_count);

  return (
    <div>
      <div className="w-full border">
        <h1 className="text-xl font-semibold pb-4 m-1 pl-3 mt-3 border-b-[1px]">จำนวนงานที่ทำ Team 3</h1>
        <div className="-m-1.5">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div>
              <table className="w-full">
                <thead className="table-thead">
                  <tr>
                    <th scope="col" className="table-th">ลำดับที่</th>
                    <th scope="col" className="table-th">รูปภาพ</th>
                    <th scope="col" className="table-th">ชื่อ</th>
                    <th scope="col" className="table-th">นามสกุล</th>
                    <th scope="col" className="table-th">จำนวนงาน</th>
                  </tr>
                </thead>
                <tbody className="table-tbody">
                  {sortedUsers.map((user, index) => (
                    <tr key={user.discord_id} className="table-tr">
                      <td className="table-td">{index + 1}</td>
                      <td className="table-td">
                        <div className="rounded-full object-cover w-[5rem] h-[5rem] flex justify-center overflow-hidden">
                          <img
                            className="object-cover w-full h-full"
                            src={user.avatar}
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="table-td">{user.user_fname}</td>
                      <td className="table-td">{user.user_lname}</td>
                      <td className="table-td">{user.task_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
