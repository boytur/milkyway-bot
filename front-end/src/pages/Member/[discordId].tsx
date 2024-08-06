import { useAuthContext } from "@/contexts/authContext";
import { usePageSetting } from "@/contexts/pageSettingContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Task } from "@/interfaces/Task.interface";
import { api } from "@/utils/api";
import { formatUTCtoThai } from "@/utils";
import { User, UserTaskCount } from "@/interfaces/User.interface";

const MemberDetail: React.FC = () => {
  const { setTitle } = usePageSetting();
  const { authState } = useAuthContext();
  const { discordId } = useParams<{ discordId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User>();
  /**
   * @TNPBPS
   * Function to fetch member detail
   * @returns {Promise<void>}
   * @async
   * @description fetch member detail from discordId
   */

  const fetchMemberDetail = async () => {
    try {
      // Write your code here to fetch member detail using discordId
      const response = await api.get("/api/tasks/" + discordId);
      setTasks(response.data.tasks.tasks);
      console.log(tasks);
      setUser(response.data.tasks.user);
    } catch (error) {
      // Handle any errors that occur during the fetch

      console.error("Error fetching member detail:", error);
    }
  };

  useEffect(() => {
    if (authState.isLoggedin) {
      fetchMemberDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.isLoggedin, discordId]);

  useEffect(() => {
    if (user) {
      setTitle(`รายละเอียดงานของ ${user.user_fname} ${user.user_lname}`);
    }
  }, [user, setTitle]);

  return (
    <div
      style={{ height: "calc(100vh - 5rem)", overflowY: "scroll" }}
      className="m-2 bg-white border rounded-md"
    >
      <div className="flex justify-center m-2 bg-white border rounded-md ">
        <div className="flex flex-col items-center w-full h-full border">
          <div className="rounded-full border border-black object-cover w-[10rem] h-[10rem] flex justify-center overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={`${user?.avatar}`}
              alt="Avatar"
            />
          </div>
          <p className="mt-3 mb-2 text-lg font-bold ">
            {user?.user_fname} {user?.user_lname}
          </p>
        </div>
      </div>
      <div className="w-full border">
        <h1 className="text-xl font-semibold pb-4 m-1 pl-3 mt-3 border-b-[1px]">
          ตารางงานที่ทำ
        </h1>
        <div className="-m-1.5">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div>
              <table className="w-full">
                <thead className="table-thead">
                  <tr>
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
                      ลงแพลน
                    </th>
                    <th scope="col" className="table-th">
                      สถานะ
                    </th>
                  </tr>
                </thead>
                <tbody className="table-tbody">
                  {tasks.map((task) => (
                    <tr key={task.task_id} className="table-tr">
                      <td className="table-td">{task.task_name}</td>
                      <td className="table-td">{task.task_type}</td>
                      <td className="table-td">
                        {formatUTCtoThai(task.work_date)}
                      </td>
                      <td className="table-td">{formatUTCtoThai(task.date)}</td>
                      <td className="table-td">
                        <span
                          style={{
                            backgroundColor: task.is_check
                              ? "#00FF00"
                              : "#FF0000",
                            color: "white",
                            padding: "2px 5px",
                            borderRadius: "3px",
                          }}
                        >
                          {task.is_check ? "ลงแพลน" : "ยังไม่ลง"}
                        </span>
                      </td>

                      <td className="table-td">
                        {task.is_done ? "เสร็จ" : "ไม่เสร็จ"}
                      </td>
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

export default MemberDetail;
