/**
@Amonpan2
@description display member users and their task count
@returns {React.FC} Member page component
*/
import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { UserTaskCount } from "@/interfaces/User.interface";
import { useAuthContext } from "@/contexts/authContext";

const Member: React.FC = () => {
  const { authState } = useAuthContext();
  const [users, setUser] = useState<UserTaskCount[]>([]);

  const getUser = async () => {
    try {
      const exportUser = await api.get("/api/user/users");
      console.log(exportUser.data);
      setUser(exportUser.data.users);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!authState.isLoggedin) {
      return;
    }
    getUser();
  }, [authState.isLoggedin]);

  return (
    <div className="container mx-auto p-3 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h1 className="text-2xl font-bold p-6 bg-white text-black border-b border-gray-200">สมาชิกทีม</h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="border-b border-gray-200 table-thead">
              <tr>
                <th className="px-16 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">รูปประจำตัว</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">ชื่อ</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">นามสกุล</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">จำนวนงานที่ทำ</th>
              </tr>
              
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap w-72">
                    <div className="flex mx-9">
                      <img className="h-28 w-20 rounded-sm  object-cover " src={user.avatar} alt={`${user.user_fname} ${user.user_lname}`} />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.user_fname}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 ">{user.user_lname}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.task_count} งาน
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Member;