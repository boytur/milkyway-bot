import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { Task } from "@/interfaces/Task.interface";
import { formatUTCtoThai } from "@/utils";
import Pagination from "@/components/Pagination";

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const fetchTasks = async (page: number, limit: number) => {
    try {
      const response = await api.get(
        `/api/my-tasks?page=${page}&limit=${limit}`
      );
      setTasks(response.data.tasks);
      setTotalPages(response.data.meta.totalPage);
      setTotal(response.data.meta.total);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks(currentPage, perPage);
  }, [currentPage, perPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Pagination component */}
      <Pagination
        pageState={{ page: currentPage, total: totalPages }}
        totalPages={totalPages}
        setPageState={({ page }) => handlePageChange(page)}
        label={`รายการงานทั้งหมด ${total} งาน`}
      />
      {/* Items per page selection */}
      <div className="flex items-center p-2">
        <span className="mr-2">Items per page:</span>
        <select
          value={perPage}
          onChange={handlePerPageChange}
          className="p-1 border border-gray-300 rounded-md"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
    </div>
  );
};

export default TaskTable;
