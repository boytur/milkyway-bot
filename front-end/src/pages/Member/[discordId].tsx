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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const fetchMemberDetail = async () => {
    try {
      const response = await api.get(`/api/tasks/${discordId}`);
      setTasks(response.data.tasks.tasks);
      setUser(response.data.tasks.user);
    } catch (error) {
      console.error("Error fetching member detail:", error);
    }
  };

  useEffect(() => {
    if (authState.isLoggedin) {
      fetchMemberDetail();
    }
  }, [authState.isLoggedin, discordId]);

  useEffect(() => {
    if (user) {
      setTitle(`รายละเอียดงานของ ${user.user_fname} ${user.user_lname}`);
    }
  }, [user, setTitle]);

  return (
    <div
      className="overflow-hidden"
      style={{ height: "calc(100vh - 5rem)", overflowY: "scroll" }}
    >
      {user && (
        <>
          <div className="flex justify-center m-2 bg-white border rounded-md shadow-md">
            <div className="flex flex-col items-center w-full h-full border p-4">
              <div className="rounded-full border border-gray-300 object-cover w-[10rem] h-[10rem] flex justify-center overflow-hidden mb-3">
                <img
                  className="object-cover w-full h-full"
                  src={user.avatar || "/default-avatar.png"}
                  alt={`${user.user_fname} ${user.user_lname}`}
                />
              </div>
              <p className="text-lg font-bold">
                {user.user_fname} {user.user_lname}
              </p>
            </div>
          </div>
          <div className="m-2 bg-white border rounded-md shadow-md">
            <h1 className="text-xl font-semibold pb-4 m-1 pl-3 mt-3 border-b-2 border-gray-200">
              ตารางงานที่ทำ
            </h1>
            <div className="p-4">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th scope="col" className="p-3 text-left border-r">
                      ชื่องาน
                    </th>
                    <th scope="col" className="p-3 text-left border-r">
                      ประเภท
                    </th>
                    <th scope="col" className="p-3 text-left border-r">
                      สถานะ
                    </th>
                    <th scope="col" className="p-3 text-left border-r">
                      ลงแพลน
                    </th>
                    <th scope="col" className="p-3 text-left border-r">
                      วันที่ทำงาน
                    </th>
                    <th scope="col" className="p-3 text-left">
                      วันที่ลงงาน
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.task_id} className="border-b">
                      <td className="p-3">{task.task_name}</td>
                      <td className="p-3">{task.task_type}</td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-lg text-white font-semibold shadow-md transition duration-300 ease-in-out ${
                            task.is_done
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600"
                          }`}
                        >
                          {task.is_done ? "เสร็จ" : "ไม่เสร็จ"}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-lg text-white font-semibold shadow-md transition duration-300 ease-in-out ${
                            task.is_check
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600"
                          }`}
                        >
                          {task.is_check ? "ลงแพลนแล้ว" : "ยังไม่ได้ลงแพลน"}
                        </span>
                      </td>
                      <td className="p-3">{formatUTCtoThai(task.work_date)}</td>
                      <td className="p-3">{formatUTCtoThai(task.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MemberDetail;
