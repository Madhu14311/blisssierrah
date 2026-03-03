// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   getDocs,
//   query,
//   where
// } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { db } from "./firebase";
// import { FaHome } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const DAILY_WAGE = 703;

// export default function EmployeePayroll() {
//   const [months, setMonths] = useState({});
//   const [employeeName, setEmployeeName] = useState("");
//   const navigate = useNavigate();

//   const getMonthKey = (date) =>
//     new Date(date).toLocaleString("en-IN", {
//       month: "long",
//       year: "numeric",
//     });

//   useEffect(() => {
//     const load = async () => {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (!user) return;

//       const snap = await getDocs(
//         query(
//           collection(db, "attendance"),
//           where("uid", "==", user.uid)
//         )
//       );

//       const grouped = {};

//       snap.docs.forEach(d => {
//         const data = d.data();
//         if (!employeeName && data.name) {
//           setEmployeeName(data.name);
//         }

//         const month = getMonthKey(data.date);
//         if (!grouped[month]) grouped[month] = [];
//         grouped[month].push(data);
//       });

//       setMonths(grouped);
//     };

//     load();
//   }, []);

//   return (
//     <div className="attendance-container">
//       <FaHome
//         size={28}
//         style={{ cursor: "pointer", color: "brown" }}
//         onClick={() => navigate("/empmain")}
//       />

//       <h1 style={{ textAlign: "center" }}>My Payroll</h1>

//       {Object.keys(months).length === 0 && <p>No payroll data</p>}

//       {Object.entries(months).map(([month, records]) => {
//         const validRecords = records.filter(r => r.hours && r.hours !== "--");

//         const totalDays = new Set(
//           validRecords.map(r => r.date)
//         ).size;

//         const totalSalary = totalDays * DAILY_WAGE;

//         return (
//           <div className="card" key={month}>
//             <h2>Employee: {employeeName}</h2>
//             <h3>Month: {month}</h3>

//             {/* ===== ATTENDANCE TABLE ===== */}
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Check In</th>
//                   <th>Check Out</th>
//                   <th>Hours Worked</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {validRecords.length === 0 ? (
//                   <tr>
//                     <td colSpan="4">No attendance records</td>
//                   </tr>
//                 ) : (
//                   validRecords.map((r, i) => (
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

//             {/* ===== SUMMARY ===== */}
//             <table className="table" style={{ marginTop: "15px" }}>
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
//           </div>
//         );
//       })}
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   getDocs,
//   query,
//   where
// } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { db } from "./firebase";
// import { FaHome } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const DAILY_WAGE = 703;

// export default function EmployeePayroll() {
//   const [months, setMonths] = useState({});
//   const [employeeName, setEmployeeName] = useState("");
//   const navigate = useNavigate();

//   const getMonthKey = (date) =>
//     new Date(date).toLocaleString("en-IN", {
//       month: "long",
//       year: "numeric",
//     });

//   useEffect(() => {
//     const load = async () => {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (!user) return;

//       const snap = await getDocs(
//         query(
//           collection(db, "attendance"),
//           where("uid", "==", user.uid)
//         )
//       );

//       const grouped = {};

//       snap.docs.forEach(d => {
//         const data = d.data();
//         if (!employeeName && data.name) setEmployeeName(data.name);

//         const month = getMonthKey(data.date);
//         if (!grouped[month]) grouped[month] = [];
//         grouped[month].push(data);
//       });

//       setMonths(grouped);
//     };

//     load();
//   }, []);

//   // Helper to calculate incentives
//   const calculateIncentives = (records) => {
//     let totalIncentives = 0;
//     records.forEach(r => {
//       if (r.hours) {
//         // parse hours and minutes
//         const parts = r.hours.split(" ");
//         let hours = parseInt(parts[0]);
//         let mins = parts[1] ? parseInt(parts[1]) : 0;

//         const totalHours = hours + mins / 60;
//         if (totalHours > 10) {
//           totalIncentives += totalHours - 10;
//         }
//       }
//     });
//     return totalIncentives.toFixed(2);
//   };

//   return (
//     <div className="attendance-container">
//       <FaHome
//         size={28}
//         style={{ cursor: "pointer", color: "brown" }}
//         onClick={() => navigate("/empmain")}
//       />

//       <h1 style={{ textAlign: "center" }}>My Payroll</h1>

//       {Object.keys(months).length === 0 && <p>No payroll data</p>}

//       {Object.entries(months).map(([month, records]) => {
//         const validRecords = records.filter(r => r.hours && r.hours !== "--");

//         const totalDays = new Set(
//           validRecords.map(r => r.date)
//         ).size;

//         const totalSalary = totalDays * DAILY_WAGE;
//         const incentives = calculateIncentives(validRecords);

//         return (
//           <div className="card" key={month}>
//             <h2>Employee: {employeeName}</h2>
//             <h3>Month: {month}</h3>

//             {/* ===== ATTENDANCE TABLE ===== */}
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Check In</th>
//                   <th>Check Out</th>
//                   <th>Hours Worked</th>
//                   <th>Incentives</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {validRecords.length === 0 ? (
//                   <tr>
//                     <td colSpan="5">No attendance records</td>
//                   </tr>
//                 ) : (
//                   validRecords.map((r, i) => {
//                     let extra = 0;
//                     if (r.hours) {
//                       const parts = r.hours.split(" ");
//                       let h = parseInt(parts[0]);
//                       let m = parts[1] ? parseInt(parts[1]) : 0;
//                       const totalH = h + m / 60;
//                       if (totalH > 10) extra = (totalH - 10).toFixed(2);
//                     }
//                     return (
//                       <tr key={i}>
//                         <td>{r.date}</td>
//                         <td>{r.checkIn}</td>
//                         <td>{r.checkOut}</td>
//                         <td>{r.hours}</td>
//                         <td>{extra}</td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>

//             {/* ===== SUMMARY ===== */}
//             <table className="table" style={{ marginTop: "15px" }}>
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
//                   <td>₹{totalSalary.toFixed(2)}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Total Incentives (hrs)</strong></td>
//                   <td>{incentives}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         );
//       })}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   getDocs,
//   query,
//   where
// } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { db } from "./firebase";
// import { FaHome } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const DAILY_WAGE = 703;
// const BASE_HOURS = 10;

// export default function EmployeePayroll() {
//   const [months, setMonths] = useState({});
//   const [employeeName, setEmployeeName] = useState("");
//   const navigate = useNavigate();

//   /* ================= HELPERS ================= */

//   const getMonthKey = (date) =>
//     new Date(date).toLocaleString("en-IN", {
//       month: "long",
//       year: "numeric",
//     });

//   // ✅ SAFE HOURS PARSER → "11 hr 30 min" → 11.5
// const getTotalHours = (hoursStr) => {
//   if (!hoursStr || hoursStr === "--") return 0;

//   // extract numbers safely
//   const match = hoursStr.match(/(\d+)\s*hr\s*(\d+)?\s*min?/i);
//   if (!match) return 0;

//   let hrs = parseInt(match[1] || 0);
//   let mins = parseInt(match[2] || 0);

//   // ✅ NORMALIZE MINUTES
//   if (mins >= 60) {
//     hrs += Math.floor(mins / 60);
//     mins = mins % 60;
//   }

//   return hrs + mins / 60;
// };


//   /* ================= LOAD DATA ================= */

//   useEffect(() => {
//     const load = async () => {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (!user) return;

//       const snap = await getDocs(
//         query(
//           collection(db, "attendance"),
//           where("uid", "==", user.uid)
//         )
//       );

//       const grouped = {};

//       snap.docs.forEach(doc => {
//         const data = doc.data();
//         if (!employeeName && data.name) setEmployeeName(data.name);

//         const month = getMonthKey(data.date);
//         if (!grouped[month]) grouped[month] = [];
//         grouped[month].push(data);
//       });

//       setMonths(grouped);
//     };

//     load();
//   }, []);

//   /* ================= UI ================= */

//   return (
//     <div className="attendance-container">
//       <FaHome
//         size={28}
//         style={{ cursor: "pointer", color: "brown" }}
//         onClick={() => navigate("/empmain")}
//       />

//       <h1 style={{ textAlign: "center" }}>My Payroll</h1>

//       {Object.keys(months).length === 0 && <p>No payroll data</p>}

//       {Object.entries(months).map(([month, records]) => {
//         const validRecords = records.filter(
//           r => r.hours && r.hours !== "--"
//         );

//         let totalIncentiveHours = 0;

//         validRecords.forEach(r => {
//           const totalHours = getTotalHours(r.hours);
//           if (totalHours > BASE_HOURS) {
//             totalIncentiveHours += totalHours - BASE_HOURS;
//           }
//         });

//         const totalDays = new Set(
//           validRecords.map(r => r.date)
//         ).size;

//         const totalSalary = totalDays * DAILY_WAGE;

//         return (
//           <div className="card" key={month}>
//             <h2>Employee: {employeeName}</h2>
//             <h3>Month: {month}</h3>

//             {/* ================= ATTENDANCE TABLE ================= */}
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Check In</th>
//                   <th>Check Out</th>
//                   <th>Hours Worked</th>
//                   <th>Incentive (hrs)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {validRecords.length === 0 ? (
//                   <tr>
//                     <td colSpan="5">No attendance records</td>
//                   </tr>
//                 ) : (
//                   validRecords.map((r, i) => {
//                     const totalHours = getTotalHours(r.hours);
//                     const extra =
//                       totalHours > BASE_HOURS
//                         ? (totalHours - BASE_HOURS).toFixed(2)
//                         : "0.00";

//                     return (
//                       <tr key={i}>
//                         <td>{r.date}</td>
//                         <td>{r.checkIn}</td>
//                         <td>{r.checkOut}</td>
//                         <td>{r.hours}</td>
//                         <td>{extra}</td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>

//             {/* ================= SUMMARY ================= */}
//             <table className="table" style={{ marginTop: 15 }}>
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
//                   <td>₹{totalSalary.toFixed(2)}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Total Incentive Hours</strong></td>
//                   <td>{totalIncentiveHours.toFixed(2)}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   getDocs,
//   query,
//   where
// } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { db } from "./firebase";
// import { FaHome } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const DAILY_WAGE = 703;
// const BASE_HOURS = 9.30;

// export default function EmployeePayroll() {
//   const [months, setMonths] = useState({});
//   const [employeeName, setEmployeeName] = useState("");
//   const navigate = useNavigate();

//   /* ================= HELPERS ================= */

//   const getMonthKey = (date) =>
//     new Date(date).toLocaleString("en-IN", {
//       month: "long",
//       year: "numeric",
//     });

//   // ✅ SAFE HOURS PARSER (minutes never > 60)
//   const getTotalHours = (hoursStr) => {
//     if (!hoursStr || hoursStr === "--") return 0;

//     const match = hoursStr.match(/(\d+)\s*hr\s*(\d+)?\s*min?/i);
//     if (!match) return 0;

//     let hrs = parseInt(match[1] || 0);
//     let mins = parseInt(match[2] || 0);

//     // normalize minutes
//     if (mins >= 60) {
//       hrs += Math.floor(mins / 60);
//       mins = mins % 60;
//     }

//     return hrs + mins / 60;
//   };

//   /* ================= LOAD DATA ================= */

//   useEffect(() => {
//     const load = async () => {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (!user) return;

//       const snap = await getDocs(
//         query(
//           collection(db, "attendance"),
//           where("uid", "==", user.uid)
//         )
//       );

//       const grouped = {};

//       snap.docs.forEach(doc => {
//         const data = doc.data();

//         if (!employeeName && data.name) {
//           setEmployeeName(data.name);
//         }

//         const month = getMonthKey(data.date);
//         if (!grouped[month]) grouped[month] = [];
//         grouped[month].push(data);
//       });

//       setMonths(grouped);
//     };

//     load();
//   }, []);

//   /* ================= UI ================= */

//   return (
//     <div className="attendance-container">
//       <FaHome
//         size={28}
//         style={{ cursor: "pointer", color: "brown" }}
//         onClick={() => navigate("/empmain")}
//       />

//       <h1 style={{ textAlign: "center" }}>My Payroll</h1>

//       {Object.keys(months).length === 0 && (
//         <p>No payroll data available</p>
//       )}

//       {Object.entries(months).map(([month, records]) => {
//         const validRecords = records.filter(
//           r => r.hours && r.hours !== "--"
//         );

//         let totalIncentiveHours = 0;

//         validRecords.forEach(r => {
//           const workedHours = getTotalHours(r.hours);
//           if (workedHours > BASE_HOURS) {
//             totalIncentiveHours += workedHours - BASE_HOURS;
//           }
//         });

//         const totalDays = new Set(
//           validRecords.map(r => r.date)
//         ).size;

//         const totalSalary = totalDays * DAILY_WAGE;

//         return (
//           <div className="card" key={month}>
//             <h2>Employee: {employeeName}</h2>
//             <h3>Month: {month}</h3>

//             {/* ================= ATTENDANCE TABLE ================= */}
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Check In</th>
//                   <th>Check Out</th>
//                   <th>Hours Worked</th>
//                   <th>Incentive (hrs)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {validRecords.length === 0 ? (
//                   <tr>
//                     <td colSpan="5">No attendance records</td>
//                   </tr>
//                 ) : (
//                   validRecords.map((r, i) => {
//                     const totalHours = getTotalHours(r.hours);
//                     const extra =
//                       totalHours > BASE_HOURS
//                         ? (totalHours - BASE_HOURS).toFixed(2)
//                         : "0.00";

//                     return (
//                       <tr key={i}>
//                         <td>{r.date}</td>
//                         <td>{r.checkIn}</td>
//                         <td>{r.checkOut}</td>
//                         <td>{r.hours}</td>
//                         <td>{extra}</td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>

//             {/* ================= SUMMARY ================= */}
//             <table className="table" style={{ marginTop: 15 }}>
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
//                   <td>₹{totalSalary.toFixed(2)}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Total Incentive Hours</strong></td>
//                   <td>{totalIncentiveHours.toFixed(2)}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DAILY_WAGE = 703;
const BASE_MINUTES = 9 * 60 + 30; // 9 hr 30 min = 570 mins

export default function EmployeePayroll() {
  const [months, setMonths] = useState({});
  const [employeeName, setEmployeeName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ================= HELPERS ================= */

  const getMonthKey = (date) =>
    new Date(date).toLocaleString("en-IN", {
      month: "long",
      year: "numeric",
    });

  // Convert worked hours → total minutes (SAFE)
  const getTotalMinutes = (hoursStr) => {
    if (!hoursStr || hoursStr === "--") return 0;

    // "9 hr 75 min"
    const hrMin = hoursStr.match(/(\d+)\s*hr\s*(\d+)?\s*min?/i);
    if (hrMin) {
      return parseInt(hrMin[1]) * 60 + parseInt(hrMin[2] || 0);
    }

    // "9:45"
    if (hoursStr.includes(":")) {
      const [h, m] = hoursStr.split(":").map(Number);
      return h * 60 + m;
    }

    // "9.5"
    const decimal = parseFloat(hoursStr);
    if (!isNaN(decimal)) {
      return Math.round(decimal * 60);
    }

    return 0;
  };

  // Convert minutes → "X hr Y min"
  const formatHrMin = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs} hr ${mins} min`;
  };

  /* ================= LOAD DATA (FIXED FOR RELOAD) ================= */

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const snap = await getDocs(
        query(
          collection(db, "attendance"),
          where("uid", "==", user.uid)
        )
      );

      const grouped = {};

      snap.docs.forEach((doc) => {
        const data = doc.data();

        if (!employeeName && data.name) {
          setEmployeeName(data.name);
        }

        const month = getMonthKey(data.date);
        if (!grouped[month]) grouped[month] = [];
        grouped[month].push(data);
      });

      setMonths(grouped);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /* ================= UI ================= */

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading payroll...</p>;
  }

  return (
    <div className="attendance-container">
      <FaHome
        size={28}
        style={{ cursor: "pointer", color: "brown" }}
        onClick={() => navigate("/empmain")}
      />

      <h1 style={{ textAlign: "center" }}>My Payroll</h1>

      {Object.keys(months).length === 0 && (
        <p>No payroll data available</p>
      )}

      {Object.entries(months).map(([month, records]) => {
        const validRecords = records.filter(
          (r) => r.hours && r.hours !== "--"
        );

        let totalIncentiveMinutes = 0;

        validRecords.forEach((r) => {
          const workedMinutes = getTotalMinutes(r.hours);
          if (workedMinutes > BASE_MINUTES) {
            totalIncentiveMinutes += workedMinutes - BASE_MINUTES;
          }
        });

        const totalDays = new Set(
          validRecords.map((r) => r.date)
        ).size;

        const totalSalary = totalDays * DAILY_WAGE;

        return (
          <div className="card" key={month}>
            <h2>Employee: {employeeName}</h2>
            <h3>Month: {month}</h3>

            {/* ================= ATTENDANCE TABLE ================= */}
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Hours Worked</th>
                  <th>Incentive</th>
                </tr>
              </thead>
              <tbody>
                {validRecords.length === 0 ? (
                  <tr>
                    <td colSpan="5">No attendance records</td>
                  </tr>
                ) : (
                  validRecords.map((r, i) => {
                    const workedMinutes = getTotalMinutes(r.hours);
                    const incentiveMinutes = Math.max(
                      workedMinutes - BASE_MINUTES,
                      0
                    );

                    return (
                      <tr key={i}>
                        <td>{r.date}</td>
                        <td>{r.checkIn}</td>
                        <td>{r.checkOut}</td>
                        <td>{r.hours}</td>
                        <td>{formatHrMin(incentiveMinutes)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            {/* ================= SUMMARY ================= */}
            <table className="table" style={{ marginTop: 15 }}>
              <tbody>
                <tr>
                  <td><strong>Total Working Days</strong></td>
                  <td>{totalDays}</td>
                </tr>
                <tr>
                  <td><strong>Daily Wage</strong></td>
                  <td>₹{DAILY_WAGE}</td>
                </tr>
                <tr>
                  <td><strong>Total Salary</strong></td>
                  <td>₹{totalSalary.toFixed(2)}</td>
                </tr>
                <tr>
                  <td><strong>Total Incentive</strong></td>
                  <td>{formatHrMin(totalIncentiveMinutes)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
