import { useAuthContext } from "@/contexts/authContext";
import { UserTaskCount } from "@/interfaces/User.interface";
import { api } from "@/utils/api";
import React, { useEffect, useState } from "react";

/**
 * @Mao65160330
 * @description display member users and their task count
 * @returns {React.FC} Member page component
 */
const Member: React.FC = () => {
  const { authState } = useAuthContext();
  const [users, setUsers] = useState<UserTaskCount[]>([]);
  
  /**
   * Fetches the user data from the API.
   */
  const fetchUser = async () => {
    try {
      const response = await api.get("api/user/users");
      setUsers(response.data.users);
    } catch (err) {
      console.error("Failed to fetch User:", err);
    }
  };
  
  useEffect(() => {
    if (!authState.isLoggedin) {
      return;
    }
    fetchUser();
  }, []);

  return (
    <div>
      <ul>
        <div className="w-full border">
          <h1 className="text-xl font-semibold pb-4 m-1 pl-3 mt-3 border-b-[1px]">
            Member List
          </h1>
          <div className="-m-1.5">
            <div className="inline-block align-middle p-1.5 min-w-full ">
              <div>
                <table className="w-full">
                  <thead className="table-thead">
                    <tr>
                      <th scope="col" className="table-th">
                        รูป
                      </th>
                      <th scope="col" className="table-th">
                        ชื่อสกุล
                      </th>
                      <th scope="col" className="table-th">
                        งานทั้งหมด
                      </th>
                    </tr>
                  </thead>
                  <tbody className="table-tbody">
                    {users?.map((user: UserTaskCount) => (
                      <tr key={user.discord_id} className="table-tr">
                        <td className="table-td">
                          <img
                            src={user.avatar}
                            alt="avatar"
                            className="max-h-24 list-image-none"
                          />
                        </td>
                        <td className="table-td">
                          {user.user_fname} {user.user_lname}
                        </td>
                        <td className="table-td">{user.task_count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};
export default Member;
