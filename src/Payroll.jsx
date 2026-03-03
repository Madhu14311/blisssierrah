// import React, { useEffect, useState } from "react";
// import "./Payroll.css";


// const DAILY_WAGE = 166;

// export default function AdminPayroll() {
//   const [attendanceData, setAttendanceData] = useState({});
//   const [payrollRows, setPayrollRows] = useState({});
//   const [editingRow, setEditingRow] = useState(null);

//   useEffect(() => {
//     const allAttendance =
//       JSON.parse(localStorage.getItem("all_attendance")) || {
//         "Madhu Seetalam": [
//           { date: "2025-12-18", checkIn: "09:00", checkOut: "13:00", hours: "4" },
//           { date: "2025-12-18", checkIn: "14:00", checkOut: "18:00", hours: "4" },
//           { date: "2025-12-19", checkIn: "09:30", checkOut: "18:30", hours: "9" }
//         ]
//       };

//     setAttendanceData(allAttendance);

//     const payrollInit = {};

//     Object.entries(allAttendance).forEach(([employeeName, records]) => {
//       const uniqueDays = getUniqueWorkingDays(records);

//       payrollInit[employeeName] = [
//         {
//           period: "Monthly",
//           type: "Daily Wages",
//           salary: (uniqueDays * DAILY_WAGE).toFixed(2)
//         }
//       ];
//     });

//     setPayrollRows(payrollInit);
//   }, []);

//   // ✅ Get completed records
//   const getCompletedRecords = (records = []) =>
//     records.filter(r => r.hours !== "--");

//   // ✅ COUNT UNIQUE DATES ONLY
//   const getUniqueWorkingDays = (records = []) => {
//     const uniqueDates = new Set(
//       records
//         .filter(r => r.hours !== "--")
//         .map(r => r.date)
//     );
//     return uniqueDates.size;
//   };

//   return (
//     <div className="attendance-container">
//       <h1>All Employees Payroll (Daily Wages)</h1>

//       {Object.entries(attendanceData).map(([employeeName, records], index) => {
//         const completed = getCompletedRecords(records);
//         const totalDays = getUniqueWorkingDays(records);
//         const totalSalary = totalDays * DAILY_WAGE;

//         return (
//           <div className="card" key={index}>
//             <h2>Employee: {employeeName}</h2>

//             {/* Attendance */}
//             <h3>Attendance</h3>
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Check In</th>
//                   <th>Check Out</th>
//                   <th>Hours (Reference)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {completed.length === 0 ? (
//                   <tr>
//                     <td colSpan="4">No records</td>
//                   </tr>
//                 ) : (
//                   completed.map((r, i) => (
//                     <tr key={i}>
//                       <td>{r.date}</td>
//                       <td>{r.checkIn}</td>
//                       <td>{r.checkOut}</td>
//                       <td>{r.hours}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>

//             {/* Salary Summary */}
//             <h3>Salary Summary</h3>
//             <table className="table">
//               <tbody>
//                 <tr>
//                   <td><strong>Total Working Days</strong></td>
//                   <td>{totalDays}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Daily Wage</strong></td>
//                   <td>₹{DAILY_WAGE}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Total Salary</strong></td>
//                   <td><strong>₹{totalSalary.toFixed(2)}</strong></td>
//                 </tr>
//               </tbody>
//             </table>

//             {/* Payroll Details */}
//             <h3>Payroll Details</h3>
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Employee Name</th>
//                   <th>Pay Period</th>
//                   <th>Salary Type</th>
//                   <th>Salary (₹)</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {payrollRows[employeeName]?.map((row, i) => {
//                   const rowId = `${employeeName}-${i}`;
//                   const isEditing = editingRow === rowId;

//                   return (
//                     <tr key={i}>
//                       <td>{employeeName}</td>

//                       <td>
//                         {isEditing ? (
//                           <input
//                             value={row.period}
//                             onChange={(e) => {
//                               const updated = [...payrollRows[employeeName]];
//                               updated[i].period = e.target.value;
//                               setPayrollRows({
//                                 ...payrollRows,
//                                 [employeeName]: updated
//                               });
//                             }}
//                           />
//                         ) : (
//                           row.period
//                         )}
//                       </td>

//                       <td>Daily Wages</td>

//                       <td>
//                         {isEditing ? (
//                           <input
//                             type="number"
//                             value={row.salary}
//                             onChange={(e) => {
//                               const updated = [...payrollRows[employeeName]];
//                               updated[i].salary = e.target.value;
//                               setPayrollRows({
//                                 ...payrollRows,
//                                 [employeeName]: updated
//                               });
//                             }}
//                           />
//                         ) : (
//                           `₹${row.salary}`
//                         )}
//                       </td>

//                       <td>
//                         {isEditing ? (
//                           <button onClick={() => setEditingRow(null)}>
//                             Save
//                           </button>
//                         ) : (
//                           <button onClick={() => setEditingRow(rowId)}>
//                             Edit
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import "./Payroll.css";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "./firebase";
// import { FaHome } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const DAILY_WAGE = 633;

// export default function AdminPayroll() {
//   const [attendanceData, setAttendanceData] = useState({});
//   const [payrollRows, setPayrollRows] = useState({});
//   const [editingRow, setEditingRow] = useState(null);

//   const navigate = useNavigate();

//   /* ===== LOAD ATTENDANCE FROM FIRESTORE ===== */
//   useEffect(() => {
//     const loadAttendance = async () => {
//       const snap = await getDocs(collection(db, "attendance"));
//       const grouped = {};

//       snap.docs.forEach(doc => {
//         const data = doc.data();
//         const employeeName = data.name || "Unknown";

//         if (!grouped[employeeName]) {
//           grouped[employeeName] = [];
//         }

//         grouped[employeeName].push(data);
//       });

//       setAttendanceData(grouped);

//       const payrollInit = {};
//       Object.entries(grouped).forEach(([employeeName, records]) => {
//         const uniqueDays = getUniqueWorkingDays(records);
//         payrollInit[employeeName] = [
//           {
//             period: "Monthly",
//             type: "Daily Wages",
//             salary: (uniqueDays * DAILY_WAGE).toFixed(2)
//           }
//         ];
//       });

//       setPayrollRows(payrollInit);
//     };

//     loadAttendance();
//   }, []);

//   /* ===== HELPERS ===== */
//   const getCompletedRecords = (records = []) =>
//     records.filter(r => r.hours && r.hours !== "--");

//   const getUniqueWorkingDays = (records = []) => {
//     const uniqueDates = new Set(
//       records
//         .filter(r => r.hours && r.hours !== "--")
//         .map(r => r.date)
//     );
//     return uniqueDates.size;
//   };

//   return (
//     <div className="attendance-container" style={{ position: "relative" }}>
      
//       {/* HOME ICON */}
//       <FaHome
//         size={34}
//         title="Home"
//         onClick={() => navigate("/mail")}
//         style={{
//           position: "absolute",
//           top: "20px",
//           left: "20px",
//           cursor: "pointer",
//           color: "brown"
//         }}
//       />

//       <h1 style={{ textAlign: "center" }}>
//         All Employees Payroll (Daily Wages)
//       </h1>

//       {Object.entries(attendanceData).length === 0 && (
//         <p>No attendance data found</p>
//       )}

//       {Object.entries(attendanceData).map(
//         ([employeeName, records], index) => {
//           const completed = getCompletedRecords(records);
//           const totalDays = getUniqueWorkingDays(records);
//           const totalSalary = totalDays * DAILY_WAGE;

//           return (
//             <div className="card" key={index}>
//               <h2>Employee: {employeeName}</h2>

//               {/* Attendance */}
//               <h3>Attendance</h3>
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Date</th>
//                     <th>Check In</th>
//                     <th>Check Out</th>
//                     <th>Hours</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {completed.length === 0 ? (
//                     <tr>
//                       <td colSpan="4">No records</td>
//                     </tr>
//                   ) : (
//                     completed.map((r, i) => (
//                       <tr key={i}>
//                         <td>{r.date}</td>
//                         <td>{r.checkIn}</td>
//                         <td>{r.checkOut}</td>
//                         <td>{r.hours}</td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>

//               {/* Salary Summary */}
//               <h3>Salary Summary</h3>
//               <table className="table">
//                 <tbody>
//                   <tr>
//                     <td><strong>Total Working Days</strong></td>
//                     <td>{totalDays}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Daily Wage</strong></td>
//                     <td>₹{DAILY_WAGE}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Total Salary</strong></td>
//                     <td><strong>₹{totalSalary.toFixed(2)}</strong></td>
//                   </tr>
//                 </tbody>
//               </table>

//               {/* Payroll Details */}
//               <h3>Payroll Details</h3>
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Employee</th>
//                     <th>Pay Period</th>
//                     <th>Salary Type</th>
//                     <th>Salary</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {payrollRows[employeeName]?.map((row, i) => {
//                     const rowId = `${employeeName}-${i}`;
//                     const isEditing = editingRow === rowId;

//                     return (
//                       <tr key={i}>
//                         <td>{employeeName}</td>
//                         <td>
//                           {isEditing ? (
//                             <input
//                               value={row.period}
//                               onChange={(e) => {
//                                 const updated = [...payrollRows[employeeName]];
//                                 updated[i].period = e.target.value;
//                                 setPayrollRows({
//                                   ...payrollRows,
//                                   [employeeName]: updated
//                                 });
//                               }}
//                             />
//                           ) : (
//                             row.period
//                           )}
//                         </td>
//                         <td>Daily Wages</td>
//                         <td>
//                           {isEditing ? (
//                             <input
//                               type="number"
//                               value={row.salary}
//                               onChange={(e) => {
//                                 const updated = [...payrollRows[employeeName]];
//                                 updated[i].salary = e.target.value;
//                                 setPayrollRows({
//                                   ...payrollRows,
//                                   [employeeName]: updated
//                                 });
//                               }}
//                             />
//                           ) : (
//                             `₹${row.salary}`
//                           )}
//                         </td>
//                         <td>
//                           {isEditing ? (
//                             <button onClick={() => setEditingRow(null)}>
//                               Save
//                             </button>
//                           ) : (
//                             <button onClick={() => setEditingRow(rowId)}>
//                               Edit
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           );
//         }
//       )}
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import "./Payroll.css";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "./firebase";
// import { FaHome } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const DAILY_WAGE = 703;

// export default function AdminPayroll() {
//   const [attendanceData, setAttendanceData] = useState({});
//   const [payrollRows, setPayrollRows] = useState({});
//   const [editingRow, setEditingRow] = useState(null);

//   const navigate = useNavigate();

//   /* ===== HELPERS ===== */

//   const getMonthKey = (dateStr) => {
//     const d = new Date(dateStr);
//     return d.toLocaleString("en-IN", {
//       month: "long",
//       year: "numeric"
//     });
//   };

//   const getCompletedRecords = (records = []) =>
//     records.filter(r => r.hours && r.hours !== "--");

//   const getUniqueWorkingDays = (records = []) => {
//     const uniqueDates = new Set(
//       records
//         .filter(r => r.hours && r.hours !== "--")
//         .map(r => r.date)
//     );
//     return uniqueDates.size;
//   };

//   /* ===== LOAD ATTENDANCE FROM FIRESTORE ===== */

//   useEffect(() => {
//     const loadAttendance = async () => {
//       const snap = await getDocs(collection(db, "attendance"));

//       const grouped = {};

//       snap.docs.forEach(doc => {
//         const data = doc.data();
//         const employeeName = data.name || "Unknown";
//         const monthKey = getMonthKey(data.date);

//         if (!grouped[employeeName]) {
//           grouped[employeeName] = {};
//         }

//         if (!grouped[employeeName][monthKey]) {
//           grouped[employeeName][monthKey] = [];
//         }

//         grouped[employeeName][monthKey].push(data);
//       });

//       setAttendanceData(grouped);

//       /* ===== INIT PAYROLL ===== */
//       const payrollInit = {};

//       Object.entries(grouped).forEach(([employeeName, months]) => {
//         payrollInit[employeeName] = {};

//         Object.entries(months).forEach(([month, records]) => {
//           const days = getUniqueWorkingDays(records);

//           payrollInit[employeeName][month] = [
//             {
//               period: month,
//               type: "Daily Wages",
//               salary: (days * DAILY_WAGE).toFixed(2)
//             }
//           ];
//         });
//       });

//       setPayrollRows(payrollInit);
//     };

//     loadAttendance();
//   }, []);

//   return (
//     <div className="attendance-container" style={{ position: "relative" }}>
      
//       {/* HOME ICON */}
//       <FaHome
//         size={34}
//         title="Home"
//         onClick={() => navigate("/mail")}
//         style={{
//           position: "absolute",
//           top: "20px",
//           left: "20px",
//           cursor: "pointer",
//           color: "brown"
//         }}
//       />

//       <h1 style={{ textAlign: "center" }}>
//         Monthly Payroll (Daily Wages)
//       </h1>

//       {Object.keys(attendanceData).length === 0 && (
//         <p>No attendance data found</p>
//       )}

//       {Object.entries(attendanceData).map(([employeeName, months]) =>
//         Object.entries(months).map(([month, records]) => {
//           const completed = getCompletedRecords(records);
//           const totalDays = getUniqueWorkingDays(records);
//           const totalSalary = totalDays * DAILY_WAGE;

//           return (
//             <div className="card" key={`${employeeName}-${month}`}>
              
//               <h2>Employee: {employeeName}</h2>
//               <h3>Month: {month}</h3>

//               {/* ATTENDANCE TABLE */}
//               <h3>Attendance</h3>
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Date</th>
//                     <th>Check In</th>
//                     <th>Check Out</th>
//                     <th>Hours</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {completed.length === 0 ? (
//                     <tr>
//                       <td colSpan="4">No records</td>
//                     </tr>
//                   ) : (
//                     completed.map((r, i) => (
//                       <tr key={i}>
//                         <td>{r.date}</td>
//                         <td>{r.checkIn}</td>
//                         <td>{r.checkOut}</td>
//                         <td>{r.hours}</td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>

//               {/* SALARY SUMMARY */}
//               <h3>Salary Summary</h3>
//               <table className="table">
//                 <tbody>
//                   <tr>
//                     <td><strong>Total Working Days</strong></td>
//                     <td>{totalDays}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Daily Wage</strong></td>
//                     <td>₹{DAILY_WAGE}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Total Salary</strong></td>
//                     <td><strong>₹{totalSalary.toFixed(2)}</strong></td>
//                   </tr>
//                 </tbody>
//               </table>

//               {/* PAYROLL DETAILS */}
//               <h3>Payroll Details</h3>
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Employee</th>
//                     <th>Pay Period</th>
//                     <th>Salary Type</th>
//                     <th>Salary</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {payrollRows[employeeName]?.[month]?.map((row, i) => {
//                     const rowId = `${employeeName}-${month}-${i}`;
//                     const isEditing = editingRow === rowId;

//                     return (
//                       <tr key={i}>
//                         <td>{employeeName}</td>

//                         <td>
//                           {isEditing ? (
//                             <input
//                               value={row.period}
//                               onChange={(e) => {
//                                 const updated = [...payrollRows[employeeName][month]];
//                                 updated[i].period = e.target.value;

//                                 setPayrollRows({
//                                   ...payrollRows,
//                                   [employeeName]: {
//                                     ...payrollRows[employeeName],
//                                     [month]: updated
//                                   }
//                                 });
//                               }}
//                             />
//                           ) : (
//                             row.period
//                           )}
//                         </td>

//                         <td>{row.type}</td>

//                         <td>
//                           {isEditing ? (
//                             <input
//                               type="number"
//                               value={row.salary}
//                               onChange={(e) => {
//                                 const updated = [...payrollRows[employeeName][month]];
//                                 updated[i].salary = e.target.value;

//                                 setPayrollRows({
//                                   ...payrollRows,
//                                   [employeeName]: {
//                                     ...payrollRows[employeeName],
//                                     [month]: updated
//                                   }
//                                 });
//                               }}
//                             />
//                           ) : (
//                             `₹${row.salary}`
//                           )}
//                         </td>

//                         <td>
//                           {isEditing ? (
//                             <button onClick={() => setEditingRow(null)}>
//                               Save
//                             </button>
//                           ) : (
//                             <button onClick={() => setEditingRow(rowId)}>
//                               Edit
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>

//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import "./Payroll.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/* ================= CONSTANTS ================= */
const DAILY_WAGE = 703;
const BASE_MINUTES = 9 * 60 + 30; // 570
const INCENTIVE_HOURS_PER_DAY = 10;

/* ================= HELPERS ================= */

// "10 hr 30 min" → minutes
const getTotalMinutes = (str) => {
  if (!str || str === "--") return 0;
  const match = str.match(/(\d+)\s*hr\s*(\d+)?\s*min?/i);
  if (!match) return 0;
  return parseInt(match[1]) * 60 + parseInt(match[2] || 0);
};

// minutes → "X hr Y min"
const formatHrMin = (minutes) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs} hr ${mins} min`;
};

// date → "January 2025"
const getMonthKey = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleString("en-IN", {
    month: "long",
    year: "numeric",
  });
};

export default function AdminPayroll() {
  const [attendanceData, setAttendanceData] = useState({});
  const navigate = useNavigate();

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "attendance"));
      const grouped = {};

      snap.docs.forEach((doc) => {
        const d = doc.data();
        const name = d.name || "Unknown";
        const month = getMonthKey(d.date);

        if (!grouped[name]) grouped[name] = {};
        if (!grouped[name][month]) grouped[name][month] = [];

        grouped[name][month].push(d);
      });

      setAttendanceData(grouped);
    };

    load();
  }, []);

  return (
    <div className="attendance-container" style={{ position: "relative" }}>
      <FaHome
        size={32}
        onClick={() => navigate("/mail")}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          cursor: "pointer",
          color: "brown",
        }}
      />

      <h1 style={{ textAlign: "center" }}>
        Monthly Payroll (With Incentives)
      </h1>

      {Object.entries(attendanceData).map(([employee, months]) =>
        Object.entries(months).map(([month, records]) => {
          const valid = records.filter(
            (r) => r.hours && r.hours !== "--"
          );

          let totalExtraMinutes = 0;
          const workingDays = new Set(valid.map((r) => r.date)).size;
          const baseSalary = workingDays * DAILY_WAGE;

          return (
            <div className="card" key={`${employee}-${month}`}>
              <h2>Employee: {employee}</h2>
              <h3>Month: {month}</h3>

              {/* ATTENDANCE TABLE */}
              <h3>Attendance (Daily Incentives)</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Worked</th>
                    <th>Extra Time</th>
                    <th>Incentive (hrs)</th>
                  </tr>
                </thead>
                <tbody>
                  {valid.length === 0 ? (
                    <tr>
                      <td colSpan="6">No records</td>
                    </tr>
                  ) : (
                    valid.map((r, i) => {
                      const workedMinutes = getTotalMinutes(r.hours);
                      const extraMinutes =
                        workedMinutes > BASE_MINUTES
                          ? workedMinutes - BASE_MINUTES
                          : 0;

                      totalExtraMinutes += extraMinutes;

                      return (
                        <tr key={i}>
                          <td>{r.date}</td>
                          <td>{r.checkIn}</td>
                          <td>{r.checkOut}</td>
                          <td>{r.hours}</td>
                          <td>
                            {extraMinutes > 0
                              ? formatHrMin(extraMinutes)
                              : "0 hr 0 min"}
                          </td>
                          <td>
                            {(extraMinutes / 60).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>

              {/* SUMMARY */}
              {(() => {
                const extraHours = totalExtraMinutes / 60;
                const incentiveDays = extraHours / INCENTIVE_HOURS_PER_DAY;
                const incentiveWages = incentiveDays * DAILY_WAGE;

                return (
                  <>
                    <h3>Salary Summary</h3>
                    <table className="table">
                      <tbody>
                        <tr>
                          <td><strong>Working Days</strong></td>
                          <td>{workingDays}</td>
                        </tr>
                        <tr>
                          <td><strong>Base Salary</strong></td>
                          <td>₹{baseSalary.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td><strong>Total Extra Time</strong></td>
                          <td>{formatHrMin(totalExtraMinutes)}</td>
                        </tr>
                        <tr>
                          <td><strong>Incentive Days</strong></td>
                          <td>{incentiveDays.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td><strong>Incentive Wages</strong></td>
                          <td>₹{incentiveWages.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td><strong>Total Pay</strong></td>
                          <td>
                            <strong>
                              ₹{(baseSalary + incentiveWages).toFixed(2)}
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                );
              })()}
            </div>
          );
        })
      )}
    </div>
  );
}
