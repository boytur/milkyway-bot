import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import { api } from "@/utils/api";

const Dashboard: React.FC = () => {
  const [reports, setReports] = useState<{ taskName: string; count: number }[]>(
    []
  );
  
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get("api/dashboard/reports");
        if (response.data.success) {
          setReports(response.data.reports);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap">
        {reports.map((report, index) => (
          <Card key={index} title={report.taskName} count={report.count} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
