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
      console.error(error);
    }
  }

  useEffect(() => {
    if (!authState.isLoggedin) {
      return;
    }
    fetchUser();
  }, []);
  return (
    <div>
      <table className="w-full">
        <thead className="table-thead">
          <tr>
            <th scope="col" className="table-th">ลำดับ</th>
            <th scope="col" className="table-th">รูป</th>
            <th scope="col" className="table-th">ชื่อ-นามสกุล</th>
            <th scope="col" className="table-th">จำนวนงาน</th>
          </tr>
        </thead>
        <tbody className="table-tbody">
        {users?.map((user: UserTaskCount,index:number) => (
          <tr key={user.discord_id}>
            <td className="table-td w-11 text-center">{(index+1)}</td>
            <td className="table-td w-40"><div className="w-32"><img className="object-contain" src={user.avatar}/></div></td>
            <td className="table-td">{user.user_fname} {user.user_lname}</td>
            <td className="table-td">{user.task_count}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
};
export default Member;
