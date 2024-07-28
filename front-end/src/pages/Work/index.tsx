import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { useAuthContext } from "../../contexts/authContext";
import { Task } from "../../interfaces/Task.interface";
import { useSearchParams } from "react-router-dom";

const Work: React.FC = () => {
  const { authState } = useAuthContext();
  const [tasks, setTasks] = useState<Task[]>([]);

  const currentDate: Date = new Date();
  currentDate.setHours(currentDate.getUTCHours() + 7);

  const [date, setDate] = useState<string>(currentDate.toISOString().split("T")[0]);

  const [status, setStatus] = useState<string>("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const showUnchecked = searchParams.get("showUnchecked") === "true";

  const fetchWork = async () => {
    try {
      const response = await api.get("/api/tasks", {
        params: {
          date: date || undefined,
          status: status || undefined,
          showUnchecked: showUnchecked ? "true" : undefined,
        },
      });
      setTasks(response.data.tasks);
    } catch (err) {
      console.error("Failed to fetch work:", err);
    }
  };

  const toggleCheck = async (task: Task) => {
    try {
      await api.put(`/api/tasks/${task.task_id}`, { ...task, is_check: !task.is_check });
      setTasks(tasks.map(t => t.task_id === task.task_id ? { ...task, is_check: !task.is_check } : t));
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      await api.put(`/api/tasks/${task.task_id}`, task);
      setTasks(tasks.map(t => t.task_id === task.task_id ? task : t));
      setEditingTask(null);
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  useEffect(() => {
    if (authState.isLoggedin) {
      fetchWork();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, date, status, showUnchecked]);

  const handleShowUncheckedChange = (checked: boolean) => {
    setSearchParams({ showUnchecked: checked ? "true" : "false" });
  };

  return (
    <div className="p-1 pt-2">
      <div className="flex w-full gap-2 p-3 mb-4 bg-white border rounded-md">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          วันที่ลงงาน
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="cursor-pointer mt-1 block w-[15rem] px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          สถานะ
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="cursor-pointer mt-1 block w-full px-3 py-[9px] bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="all">ทั้งหมด</option>
            <option value="checked">ลงแพลนแล้ว</option>
            <option value="unchecked">ยังไม่ลงแพลน</option>
          </select>
        </label>
        <label className="mt-8 toggle-switch">
          <input
            type="checkbox"
            checked={showUnchecked}
            onChange={(e) => handleShowUncheckedChange(e.target.checked)}
            className="sr-only"
          />
          <span className="slider"></span>
        </label>
        <span className="ml-3 mt-[2.1rem] text-sm">
          ดูงานที่ยังไม่ลงแพลนทั้งหมด
        </span>
      </div>
      <div>
        {tasks.length > 0 ? (
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="table-thead">
                <tr>
                  {["ลำดับ", "วันที่ทำงาน", "ชื่อ - นามสกุล", "ชื่องาน", "เสร็จ", "ประเภท", "ลงแพลน", "แก้ไข"].map((heading) => (
                    <th key={heading} className="table-th">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="table-tbody">
                {tasks.map((task, index) => (
                  <tr key={task.task_id} className="table-tr">
                    <td className="table-td">{index + 1}</td>
                    <td className="table-td">
                      {editingTask?.task_id === task.task_id ? (
                        <input
                          type="date"
                          value={editingTask.work_date}
                          onChange={(e) => setEditingTask({ ...editingTask, work_date: e.target.value })}
                          className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      ) : (
                        new Date(task.work_date).toLocaleDateString("th-TH", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      )}
                    </td>
                    <td className="table-td">
                      {task.user_fname} {task.user_lname}
                    </td>
                    <td className="table-td">
                      {editingTask?.task_id === task.task_id ? (
                        <input
                          type="text"
                          value={editingTask.task_name}
                          onChange={(e) => setEditingTask({ ...editingTask, task_name: e.target.value })}
                          className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      ) : (
                        <div className="break-words whitespace-normal">{task.task_name}</div>
                      )}
                    </td>
                    <td className="table-td">
                      {editingTask?.task_id === task.task_id ? (
                        <select
                          value={editingTask.is_done ? "completed" : "not_completed"}
                          onChange={(e) => setEditingTask({ ...editingTask, is_done: e.target.value === "completed" })}
                          className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="completed">เสร็จ</option>
                          <option value="not_completed">ไม่เสร็จ</option>
                        </select>
                      ) : task.is_done ? (
                        "เสร็จ"
                      ) : (
                        "ไม่เสร็จ"
                      )}
                    </td>
                    <td className="table-td">
                      {editingTask?.task_id === task.task_id ? (
                        <select
                          value={editingTask.task_type}
                          onChange={(e) => setEditingTask({ ...editingTask, task_type: e.target.value })}
                          className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="Software design">Software design</option>
                          <option value="เอกสาร">เอกสาร</option>
                          <option value="Database">Database</option>
                          <option value="จัดทำการพัฒนาระบบ">จัดทำการพัฒนาระบบ</option>
                          <option value="ตรวจงาน">ตรวจงาน</option>
                          <option value="จัดทำแผนการทำงาน">จัดทำแผนการทำงาน</option>
                          <option value="จัดทำการออกแบบ">จัดทำการออกแบบ</option>
                        </select>
                      ) : (
                        task.task_type
                      )}
                    </td>
                    <td className="table-td">
                      <button
                        onClick={() => toggleCheck(task)}
                        className={`inline-flex items-center px-2.5 py-0.5 border border-transparent text-xs leading-4 font-medium rounded-full shadow-sm text-white ${
                          task.is_check ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                      >
                        {task.is_check ? "ลงแพลน" : "ยังไม่ลง"}
                      </button>
                    </td>
                    <td className="table-td">
                      {editingTask?.task_id === task.task_id ? (
                        <button
                          onClick={() => updateTask(editingTask)}
                          className="inline-flex items-center px-2.5 py-0.5 border border-transparent text-xs leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          บันทึก
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditingTask(task)}
                          className="inline-flex items-center px-2.5 py-0.5 border border-transparent text-xs leading-4 font-medium rounded-full shadow-sm text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          แก้ไข
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full text-center">
            <p>ไม่พบงานในวันที่ระบุ</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Work;
