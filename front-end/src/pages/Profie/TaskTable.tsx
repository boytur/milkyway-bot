import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { Task } from "../../contexts/interfaces/Task.interface";
import { formatUTCtoThai } from "../../utils";

const TaskTable: React.FC = () => {
  // State to store tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const response = await api.get("/api/my-tasks");
      setTasks(response.data.tasks);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="m0">
      <h1 className="text-xl font-semibold pb-4 m-1 pl-3 mt-3 border-b-[1px]">ตารางงานที่ทำ</h1>
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div>
          <table>
              <thead>
                <tr>
                  <th scope="col" className="px-4 py-3 text-start text-xs font-medium text-gray-500 uppercase">ชื่องาน</th>
                  <th scope="col" className="px-4 py-3 text-start text-xs font-medium text-gray-500 uppercase">ประเภท</th>
                  <th scope="col" className="px-4 py-3 text-start text-xs font-medium text-gray-500 uppercase">วันที่ทำงาน</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">วันที่ลงงาน</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.task_id} className="odd:bg-white even:bg-gray-100">
                    <td className="px-4 py-4 whitespace-normal break-words  text-sm font-medium text-gray-800">{task.task_name}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">{task.task_type}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">{formatUTCtoThai(task.work_date)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">{formatUTCtoThai(task.date)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-end text-sm font-medium">
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
