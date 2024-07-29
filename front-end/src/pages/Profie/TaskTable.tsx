import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { Task } from "@/interfaces/Task.interface";
import { formatUTCtoThai } from "@/utils";

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
    <div className="w-full border">
      <h1 className="text-xl font-semibold pb-4 m-1 pl-3 mt-3 border-b-[1px]">ตารางงานที่ทำ</h1>
      <div className="-m-1.5">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div>
          <table className="w-full">
              <thead className="table-thead">
                <tr>
                  <th scope="col" className="table-th">ชื่องาน</th>
                  <th scope="col" className="table-th">ประเภท</th>
                  <th scope="col" className="table-th">วันที่ทำงาน</th>
                  <th scope="col" className="table-th">วันที่ลงงาน</th>
                </tr>
              </thead>
              <tbody className="table-tbody">
                {tasks.map(task => (
                  <tr key={task.task_id} className="table-tr">
                    <td className="table-td">{task.task_name}</td>
                    <td className="table-td">{task.task_type}</td>
                    <td className="table-td">{formatUTCtoThai(task.work_date)}</td>
                    <td className="table-td">{formatUTCtoThai(task.date)}</td>
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
