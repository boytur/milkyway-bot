/**
@Lucky
@description display member users and their task count
@returns {React.FC} Member page component
*/
import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { UserTaskCount } from "@/interfaces/User.interface";
const Member: React.FC = () => {

  const [users, setUsers] = useState<UserTaskCount[]>([]);

  //ใช้ดึงข้อมูล User จาก API
  const fetchUser = async () => {
    try {
      const response = await api.get("/api/user/users");
      setUsers(response.data.users);
    } catch (err) {
      console.error("Failed to fetch User:", err);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);

  //ส่วนของการดึงข้อมูลมาใส่ตาราง
  return (
    <div className="flex justify-center" style={{ height: "calc(100vh - 5rem)", overflowY: "scroll" }}>
      <div className="w-[98%]">
        <h1 className="text-xl font-semibold pb-4 pl-3 mt-3">
          รายชื่อสามาชิก
        </h1>
        <div className="-m-1.5">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div>
              <table className="w-full">
                <thead className="table-thead table-auto">
                  <tr>
                    <th scope="col" className="table-th">
                      รูป
                    </th>
                    <th scope="col" className="table-th">
                      ชื่อ
                    </th>
                    <th scope="col" className="table-th">
                      จำนวนงาน
                    </th>
                  </tr>
                </thead>
                <tbody className="table-tbody">
                  {users.map((users) => (
                    <tr key={users.discord_id} onClick={()=> window.location.href=`member/${users.discord_id}`} className="table-tr">
                      <td className="table-td">
                        <img
                          src={users.avatar}
                          alt="avatar"
                          className="rounded-full size-16 object-cover"
                        />
                      </td>
                      <td className="table-td">
                        {users.user_fname} {users.user_lname}
                      </td>
                      <td className="table-td">{users.task_count}</td>
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
