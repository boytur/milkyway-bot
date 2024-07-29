import { useAuthContext } from "@/contexts/authContext";
import { UserTaskCount } from "@/interfaces/User.interface";
import { api } from "@/utils/api";
import React, { useEffect, useState } from "react";

const Member: React.FC = () => {
  const { authState } = useAuthContext();
  const [users, setUsers] = useState<UserTaskCount[]>([]);
  const fetchUser = async () => {
    try {
      const respon = await api.get("/api/user/users");
      console.log(respon.data);
      setUsers(respon.data.users);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    // if(!authState.isLoggedin){
    //   return;
    // }
    fetchUser();
  }, [])


  return (
    <div className="w-full ">
      Member Page
      <table className="w-full border-radius">
        <thead className="table-thead  ">
          <tr >
            <th scope="col" className="table-th">ลำดับ</th>
            <th scope="col" className="table-th">รูป</th>
            <th scope="col" className="table-th">ชื่อ</th>
            <th scope="col" className="table-th">นามสกุล</th>
            <th scope="col" className="table-th">จำนวนงาน</th>

          </tr>
        </thead>
        <tbody className="table-tbody">
          {users && users.map((user: UserTaskCount, index: number) => (
            <tr key={user.discord_id} className="table-tr">
              <td className="table-td">{index + 1}</td>
              <td className="" >
                <img className=" object-cover w-[3rem] h-[3rem] rounded-full" src={user.avatar} alt="" /></td>
              <td className="table-td">{user.user_fname}</td>
              <td className="table-td">{user.user_lname}</td>
              <td className="table-td">{user.task_count}</td>
              
            </tr>
          ))}
        </tbody>

      </table>
    </div>

  )
};
export default Member;
