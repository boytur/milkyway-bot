import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import THSarabunNew from "../../../public/fonts/THSarabunNew.ttf";
import THSarabunNewBold from "../../../public/fonts/THSarabunNew Bold.ttf";
import { formatUTCtoThai } from "@/utils";

Font.register({
  family: "THSarabunNew",
  fonts: [
    { src: THSarabunNew, fontWeight: "normal" },
    { src: THSarabunNewBold, fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 16,
    fontFamily: "THSarabunNew",
  },
  columnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  section: {
    height: "250",
    border: "1px solid #000",
    marginBottom: 0,
  },

  sectionFlex: {
    height: "250",
    display: "flex",
    flexDirection: "row",
    border: "1px solid #000",
    marginBottom: 0,
    boxSizing: "border-box",
    borderTop: "none",
  },

  section2LeftFlexColumn: {
    flex: 1,
    borderRight: "1px solid #000",
    boxSizing: "border-box",
  },
  section2RightFlexColumn: {
    flex: 1,
    boxSizing: "border-box",
  },

  sectionFlexLastColumn: {
    flex: 1,
    boxSizing: "border-box",
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 1,
    margin: 2,
  },
  header: {
    marginLeft: 3,
    marginRight: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  rightHeader: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "left",
  },
  subHeader: {
    fontSize: 12,
    marginLeft: 2,
  },
  section2LeftFlexColumn60: {
    width: "55%",
    borderRight: "1px solid #000",
  },
  section2LeftFlexColumn70: {
    width: "70%",
    borderRight: "1px solid #000",
    boxSizing: "border-box",
  },
  sectionHeader: {
    paddingLeft: 2,
    fontSize: 12,
    fontWeight: "normal",
    marginBottom: 5,
  },
});

// Define props type for MyDocument component
interface DocumentProps {
  firstName: string;
  lastName: string;
  date: string;
  cycle: string;
  wentWell: string;
  couldBeBetter: string;
  surprisedUs: string;
  lessonsLearned: string;
  other: string;
}

const PdfDocument: React.FC<DocumentProps> = ({
  firstName,
  lastName,
  date,
  cycle,
  wentWell,
  couldBeBetter,
  surprisedUs,
  lessonsLearned,
  other,
}) => {
  const wentWellItems = wentWell.trim().split("\n");
  const firstPart = wentWellItems.slice(0, 10);
  const secondPart = wentWellItems.slice(10);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text>Sprint Retrospective Report</Text>
          <Text style={styles.rightHeader}>
            ทีม 3 ชื่อ {firstName} {lastName} วันที่ {formatUTCtoThai(date)}{" "}
            วงรอบที่ {cycle}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            (สิ่งที่ฉันทำได้ดี) Things That Went Well
          </Text>
          <View style={styles.columnContainer}>
            <View style={styles.column}>
              {firstPart.length === 0 ? (
                <Text style={styles.text}>ไม่มี</Text>
              ) : (
                firstPart.map((line, index) => (
                  <Text style={styles.text} key={index}>{`${
                    index + 1
                  }. ${line}`}</Text>
                ))
              )}
            </View>
            <View style={styles.column}>
              {secondPart.map((line, index) => (
                <Text style={styles.text} key={index}>{`${11 + index}. ${line}`}</Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.sectionFlex}>
          <View style={styles.section2LeftFlexColumn60}>
            <Text style={styles.subHeader}>
              (สิ่งที่ฉันคิดว่าน่าจะทำได้ดีกว่านี้) Things That Could Have Gone
            </Text>
            {couldBeBetter.trim() === "" ? (
              <Text style={styles.text}>ไม่มี</Text>
            ) : (
              couldBeBetter
                .split("\n")
                .map((line, index) => (
                  <Text style={styles.text} key={index}>{`${
                    index + 1
                  }. ${line}`}</Text>
                ))
            )}
          </View>
          <View style={styles.sectionFlexLastColumn}>
            <Text style={styles.subHeader}>
              (สิ่งที่ทำให้ฉันประหลาดใจ) Things That Surprised Us
            </Text>
            {surprisedUs.trim() === "" ? (
              <Text style={styles.text}>ไม่มี</Text>
            ) : (
              surprisedUs
                .split("\n")
                .map((line, index) => (
                  <Text style={styles.text} key={index}>{`${
                    index + 1
                  }. ${line}`}</Text>
                ))
            )}
          </View>
        </View>

        <View style={styles.sectionFlex}>
          <View style={styles.section2LeftFlexColumn70}>
            <Text style={styles.subHeader}>
              (บทเรียนที่ฉันได้รับ) Lessons Learned
            </Text>
            {lessonsLearned.trim() === "" ? (
              <Text style={styles.text}>ไม่มี</Text>
            ) : (
              lessonsLearned
                .split("\n")
                .map((line, index) => (
                  <Text style={styles.text} key={index}>{`${
                    index + 1
                  }. ${line}`}</Text>
                ))
            )}
          </View>
          <View style={styles.sectionFlexLastColumn}>
            <Text style={styles.subHeader}>(เรื่องอื่นๆ) Other</Text>
            {other.trim() === "" ? (
              <Text style={styles.text}>ไม่มี</Text>
            ) : (
              other
                .split("\n")
                .map((line, index) => (
                  <Text style={styles.text} key={index}>{`${
                    index + 1
                  }. ${line}`}</Text>
                ))
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
