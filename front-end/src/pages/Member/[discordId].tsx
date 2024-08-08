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
  const [tasks, settasks] = useState<Task[]>([]);
  const [user, setuser] = useState<User[]>([]);

  /**
   * @// add your name here
   * Function to fetch member detail
   * @returns {Promise<void>}
   * @async
   * @description fetch member detail from discordId
   */

  const fetchMemberDetail = async () => {
    try {
      const response = await api.get(`/api/tasks/${discordId}`);
      settasks(response.data.tasks.tasks);
      setuser(response.data.tasks.user);

    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Error fetching member detail:", error);
    }
  };

  useEffect(()=>{
    if(user){ 
    }setTitle(`รายละเอียดงานของ ${user.user_fname} ${user.user_lname}`);
  });

  useEffect(() => {
    if (!authState.isLoggedin) {
      return;
    }
    setTitle(`รายละเอียดงานของ ${discordId}`);
    fetchMemberDetail();
  }, [authState.isLoggedin, discordId, setTitle]);

  return (
    <div
      className="overflow-hidden"
      style={{ height: "calc(100vh - 5rem)", overflowY: "scroll" }}
    >
      {user && user.discord_id !== null && (
        <>
          <div className="flex justify-center m-2 bg-white border rounded-md ">
            <div className="flex flex-col items-center w-full h-full border">
              <div className="rounded-full border border-black object-cover w-[10rem] h-[10rem] flex justify-center overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={`${user.avatar}`}
                  alt=""
                />
              </div>
              <p className="mt-3 mb-2 text-lg font-bold ">
                {user?.user_fname} {user.user_lname}
              </p>
            </div>
          </div>
          <div className="m-2 bg-white border rounded-md">
            <table className="min-w-full rounded-md">
              <thead className="table-thead">
                <tr className="table-tr">
                  <th scope="col" className="table-th">
                    ลำดับ
                  </th>
                  <th scope="col" className="table-th">
                    ชื่องาน
                  </th>
                  <th scope="col" className="table-th">
                    ประเภท
                  </th>
                  <th scope="col" className="table-th">
                    วันที่ทำงาน
                  </th>
                  <th scope="col" className="table-th">
                    วันที่ลงงาน
                  </th>
                  <th scope="col" className="table-th">
                    สถานะของงาน
                  </th>
                  <th scope="col" className="table-th">
                    สถานะการลงงาน
                  </th>
                </tr>
              </thead>
              <tbody className="table-tbody">
                {tasks?.map((task, index: number) => (
                  <tr key={task.task_id} className="table-tr">
                    <td className="table-td">{index + 1}</td>
                    <td className="table-td">{task.task_name}</td>
                    <td className="table-td">{task.task_type}</td>
                     <td className="table-td">{formatUTCtoThai(task.work_date)}</td>
                    <td className="table-td">{formatUTCtoThai(task.date)}</td>
                    <td className="table-td">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 border border-transparent text-xs leading-4 font-medium rounded-full shadow-sm text-white ${
                          task.is_check
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {task.is_check ? "ลงแพลน" : "ยังไม่ลง"}
                      </span>
                    </td>
                    <td className="table-td">
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 border border-transparent text-xs leading-4 font-medium rounded-full shadow-sm text-white ${
                          task.is_done
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {task.is_done ? "เสร็จ" : "ไม่เสร็จ"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>

  );
};

export default MemberDetail;
