/**
 
@gift
@description display member users and their task count
@returns {React.FC} Member page component
*/
import { useAuthContext } from "@/contexts/authContext";
import React, { useEffect , useState } from "react";
import { UserTaskCount } from "@/interfaces/User.interface";
import { api } from "@/utils/api";


const Member: React.FC = () => {
const {authState} = useAuthContext();
const [users , setUsers] = useState<UserTaskCount[]>([]);
const fetchUsers = async ()  => {
  try{
    const response = await api.get("/api/user/users");
    console.log(response.data);
    setUsers(response.data.users);
  }catch(e){
    console.log(e);
  }
};

useEffect(() => {
  if(!authState.isLoggedin){
    return;
  }
  fetchUsers();
}, []);

  return <div>
    <table className="w-full">
              <thead className="table-thead">
                <tr>
                  <th scope="col" className="table-th ">ลำดับ</th>
                  <th scope="col" className="table-th ">รุป</th>
                  <th scope="col" className="table-th ">ชื่อ</th>
                  <th scope="col" className="table-th ">นามสุล</th>
                  <th scope="col" className="table-th ">จำนวนงาน</th>
                </tr>
              </thead>
              <tbody className="table-tbody">
                {users.map((users,index)=> (
                  <tr key={users.discord_id} className="table-tr">
                    <td className="table-td ">{index+1}</td>
                    <td className="table-td">
                        <img src = {users.avatar} className="w-10 h-10 rounded-full object-cover"/>
                    </td>
                    <td className="table-td ">{users.user_fname}</td>
                    <td className="table-td ">{users.user_lname}</td>
                    <td className="table-td ">{users.task_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
    
  </div>;
};
export default Member;



