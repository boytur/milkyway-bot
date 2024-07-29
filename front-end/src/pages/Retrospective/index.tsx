import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useAuthContext } from "@/contexts/authContext";
import PdfDocument from "./PdfDocument";

const Retrospective: React.FC = () => {
  const { user } = useAuthContext();

  const [firstName, setFirstName] = useState<string>(
    user.user_fname ? user.user_fname : ""
  );
  const [lastName, setLastName] = useState<string>(
    user.user_lname ? user.user_lname : ""
  );
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [cycle, setCycle] = useState<string>("");
  const [wentWell, setWentWell] = useState<string>("");
  const [couldBeBetter, setCouldBeBetter] = useState<string>("");
  const [surprisedUs, setSurprisedUs] = useState<string>("");
  const [lessonsLearned, setLessonsLearned] = useState<string>("");
  const [other, setOther] = useState<string>("");

  useEffect(() => {
    if (user) {
      setFirstName(user.user_fname || "");
      setLastName(user.user_lname || "");
    }
  }, [user]);

  return (
    <>
      {user && (
        <div
          style={{ height: "calc(100vh - 4rem)", overflowY: "scroll" }}
          className="w-[98%] p-4 m-2 bg-white rounded-md pb-[5rem]"
        >
          <div className="mb-4">
            <label className="block mb-1 font-medium">ชื่อ</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-primary"
              placeholder="ชื่อจริง"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">สกุล</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-primary"
              placeholder="นามสกุล"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">วันที่</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="cursor-pointer input-primary"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">วงรอบที่</label>
            <input
              type="number"
              value={cycle}
              onChange={(e) => setCycle(e.target.value)}
              className="input-primary"
              min={1}
              placeholder="วงรอบ"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">
              (สิ่งที่ฉันทำได้ดี) Things That Went Well
            </label>
            <textarea
              value={wentWell}
              onChange={(e) => setWentWell(e.target.value)}
              className="input-primary"
              placeholder="รายละเอียด....."
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">
              สิ่งที่ฉันคิดว่าน่าจะทำได้ดีกว่านี้ (Things That Could Have Gone
              Better)
            </label>
            <textarea
              value={couldBeBetter}
              onChange={(e) => setCouldBeBetter(e.target.value)}
              className="input-primary"
              placeholder="รายละเอียด....."
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">
              สิ่งที่ทำให้ฉันประหลาดใจ (Things That Surprised Us)
            </label>
            <textarea
              value={surprisedUs}
              onChange={(e) => setSurprisedUs(e.target.value)}
              className="input-primary"
              placeholder="รายละเอียด....."
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">
              บทเรียนที่ฉันได้รับ (Lessons Learned)
            </label>
            <textarea
              value={lessonsLearned}
              onChange={(e) => setLessonsLearned(e.target.value)}
              className="input-primary"
              placeholder="รายละเอียด....."
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">
              เรื่องอื่นๆ (Other):
            </label>
            <textarea
              value={other}
              onChange={(e) => setOther(e.target.value)}
              className="input-primary"
              placeholder="รายละเอียด....."
            />
          </div>

          <PDFDownloadLink
            className="btn-secondary"
            document={
              <PdfDocument
                firstName={firstName}
                lastName={lastName}
                date={date}
                cycle={cycle}
                wentWell={wentWell}
                couldBeBetter={couldBeBetter}
                surprisedUs={surprisedUs}
                lessonsLearned={lessonsLearned}
                other={other}
              />
            }
            fileName={`Sprint_Retrospective_Report_${new Date().toISOString()}.pdf`}
          >
            {({ loading }) =>
              loading ? "กำลังสร้างเอกสาร..." : "ดาวน์โหลด PDF"
            }
          </PDFDownloadLink>
        </div>
      )}
    </>
  );
};

export default Retrospective;
