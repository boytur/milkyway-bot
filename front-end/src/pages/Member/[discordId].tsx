import { useAuthContext } from "@/contexts/authContext";
import { usePageSetting } from "@/contexts/pageSettingContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Task } from "@/interfaces/Task.interface";
import { User } from "@/interfaces/User.interface";
import { api } from "@/utils/api";
import { formatUTCtoThai } from "@/utils";

const MemberDetail: React.FC = () => {
  const { setTitle } = usePageSetting();
  const { authState } = useAuthContext();
  const { discordId } = useParams<{ discordId: string }>();
  const [users, setUser] = useState<User>();
  const [tasks, setTask] = useState<Task[]>([]);
  /**
   * @Amonpan2
   * Function to fetch member detail
   * @returns {Promise<void>}
   * @async
   * @description fetch member detail from discordId
   */

  const fetchMemberDetail = async () => {
    try {
      const response = await api.get(`/api/tasks/${discordId}`);
      console.log(response.data.tasks.user);
      setTask(response.data.tasks.tasks);
      setUser(response.data.tasks.user);

      // Write your code here to fetch member detail using discordId
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Error fetching member detail:", error);
    }
  };

  useEffect(() => {
    if (!authState.isLoggedin) {
      return;
    }
    fetchMemberDetail();
  }, [authState.isLoggedin, discordId, setTitle]);

  useEffect(() => {
    if (users) {
      setTitle(`รายละเอียดงานของ ${users.user_fname} ${users.user_lname}`);
    }
  }, [users, setTitle]);

  return <div className="w-full border">
    <div className="flex justify-center m-2 p-3 bg-white border rounded-md">
  {users ? (
    <div className="flex flex-col items-center w-full h-full ">
      <div className="rounded-full border border-black object-cover w-[10rem] h-[10rem] flex justify-center overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src={users.avatar}
          alt={`${users.user_fname} ${users.user_lname}`} 
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center w-full h-full border">
      <div className="rounded-full border border-black w-[10rem] h-[10rem] flex justify-center items-center bg-gray-200">
        <span className="text-gray-500">No Avatar</span> 
      </div>
      
    </div>
  )}
</div>
    <h1 className=" bg-white text-xl font-semibold pb-4 m-1 pl-3 mt-3 pt-3 border-b-[1px]">ตารางรายละเอียดงานทั้งหมด</h1>
    <div className="-m-1.5">
      <div className="p-1.5 min-w-full inline-block align-middle">
        <div>
          <table className=" w-full">
            <thead className=" table-thead">
              <tr>
                <th scope="col" className="table-th">ชื่องาน</th>
                <th scope="col" className="table-th">ประเภท</th>
                <th scope="col" className="table-th">วันที่ทำงาน</th>
                <th scope="col" className="table-th">วันที่ลงงาน</th>
                <th scope="col" className="table-th">สถานะ</th>
                <th scope="col" className="table-th">ลงแพลน</th>
              </tr>
            </thead>
            <tbody className="table-tbody">
              {tasks.map(task => (
                <tr key={task.task_id} className="table-tr">
                  <td className="table-td">{task.task_name}</td>
                  <td className="table-td">{task.task_type}</td>
                  <td className="table-td">{formatUTCtoThai(task.work_date)}</td>
                  <td className="table-td">{formatUTCtoThai(task.date)}</td>
                  <td className="table-td "><label
                    className={`inline-flex items-center px-2.5 py-0.5 border border-transparent text-xs leading-4 font-medium rounded-full shadow-sm text-white ${task.is_done ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    {task.is_done ? "เสร็จ" : "ไม่เสร็จ"}
                  </label></td>
                  <td className="table-td"><label
                    className={`inline-flex items-center px-2.5 py-0.5 border border-transparent text-xs leading-4 font-medium rounded-full shadow-sm text-white ${task.is_check ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    {task.is_check ? "ลงแพลนแล้ว" : "ยังไม่มีการลงแพลน"}
                  </label></td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

};

export default MemberDetail;
