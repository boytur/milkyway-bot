import React, { useEffect, useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useAuthContext } from "@/contexts/authContext";
import PdfDocument from "./PdfDocument";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

  const [isPreview, setIsPreview] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.user_fname || "");
      setLastName(user.user_lname || "");
    }
  }, [user]);

  return (
    <>
      {user && (
        <div className="flex flex-col md:flex-row">
          <div
            style={{ height: "calc(100vh - 4.6rem)", overflowY: "scroll" }}
            className="flex-1 p-4 m-2 bg-white rounded-md pb-[5rem]"
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
                type="text"
                value={cycle}
                onChange={(e) => setCycle(e.target.value)}
                className="input-primary"
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
              fileName={`S_${cycle}_Sprint_Retrospective_Report_${user.user_fname}.pdf`}
            >
              {({ loading }) =>
                loading ? "กำลังสร้างเอกสาร..." : "ดาวน์โหลด PDF"
              }
            </PDFDownloadLink>
          </div>

          <div
            style={{ height: "calc(100vh - 3.4rem)", overflowY: "hidden" }}
            className="relative flex-1 border-l border-gray-300"
          >
            <button
              onClick={() => setIsPreview(!isPreview)}
              className={`absolute top-4 mt-2 mr-2 right-4 flex items-center px-4 py-2 text-white ${
                isPreview ? "bg-slate-500" : "bg-blue-600"
              } rounded-md transition-colors duration-300`}
            >
              <span className="mr-2">
                {isPreview ? <FaEyeSlash /> : <FaEye />}
              </span>
              {isPreview ? "ปิดพรีวิว" : "ดูพรีวิว"}
            </button>

            {isPreview && (
              <div className="h-full p-4 overflow-hidden bg-white border border-gray-300 rounded-md">
                <PDFViewer width="100%" height="100%">
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
                </PDFViewer>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Retrospective;
