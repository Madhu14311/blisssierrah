// import React, { useState, useEffect } from "react";
// import "./Attendance.css";

// export default function Attendance() {
//   const loggedEmployee = JSON.parse(localStorage.getItem("loggedEmployee"));
//   const employeeName = loggedEmployee?.name;

//   const [records, setRecords] = useState([]);
//   const [leaves, setLeaves] = useState([]);
//   const [leaveDate, setLeaveDate] = useState("");
//   const [leaveReason, setLeaveReason] = useState("");

//   /* =======================
//      LOAD DATA
//      ======================= */
//   useEffect(() => {
//     if (!employeeName) return;

//     const allAttendance =
//       JSON.parse(localStorage.getItem("all_attendance")) || {};

//     setRecords(allAttendance[employeeName] || []);

//     const savedLeaves =
//       JSON.parse(localStorage.getItem("leave_records")) || [];
//     setLeaves(savedLeaves);
//   }, [employeeName]);

//   /* =======================
//      CHECK IN
//      ======================= */
//   const handleCheckIn = () => {
//     const now = new Date();

//     const allAttendance =
//       JSON.parse(localStorage.getItem("all_attendance")) || {};

//     if (!allAttendance[employeeName]) {
//       allAttendance[employeeName] = [];
//     }

//     // Prevent double check-in
//     if (allAttendance[employeeName][0]?.checkOut === "--") return;

//     allAttendance[employeeName].unshift({
//       date: now.toLocaleDateString("en-IN"),
//       name: employeeName,
//       checkIn: now.toLocaleTimeString("en-IN", {
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//         hour12: true,
//       }),
//       checkInTime: now.getTime(), 
//       checkOut: "--",
//       hours: "--", 
//     });

//     localStorage.setItem("all_attendance", JSON.stringify(allAttendance));
//     setRecords(allAttendance[employeeName]);
//   };


//   const handleCheckOut = () => {
//     const now = new Date();

//     const allAttendance =
//       JSON.parse(localStorage.getItem("all_attendance")) || {};

//     const todayRecord = allAttendance[employeeName]?.[0];

//     if (!todayRecord || todayRecord.checkOut !== "--") return;

//     if (!todayRecord.checkInTime) {
//       alert("Check-in time missing. Please check in again.");
//       return;
//     }

//     // Calculate HH:MM
//     const diffMs = now.getTime() - todayRecord.checkInTime;
//     const totalMinutes = Math.floor(diffMs / (1000 * 60));

//     const hrs = Math.floor(totalMinutes / 60);
//     const mins = totalMinutes % 60;

//     const workedTime = `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
//       2,
//       "0"
//     )}`;

//     allAttendance[employeeName][0] = {
//       ...todayRecord,
//       checkOut: now.toLocaleTimeString("en-IN", {
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//         hour12: true,
//       }),
//       hours: workedTime, // ✅ STORED AS HH:MM
//     };

//     localStorage.setItem("all_attendance", JSON.stringify(allAttendance));
//     setRecords(allAttendance[employeeName]);
//   };

//   /* =======================
//      APPLY LEAVE
//      ======================= */
//   const handleLeaveSubmit = () => {
//     if (!leaveDate || !leaveReason) {
//       alert("Please enter leave date and reason");
//       return;
//     }

//     const newLeave = {
//       name: employeeName,
//       date: leaveDate,
//       reason: leaveReason,
//       status: "Pending",
//     };

//     const updatedLeaves = [newLeave, ...leaves];
//     setLeaves(updatedLeaves);
//     localStorage.setItem("leave_records", JSON.stringify(updatedLeaves));

//     setLeaveDate("");
//     setLeaveReason("");
//   };

//   const myLeaves = leaves.filter((l) => l.name === employeeName);

//   const isCheckedIn =
//     records.length > 0 && records[0].checkOut === "--";

//   /* =======================
//      UI
//      ======================= */
//   return (
//     <div className="attendance-container">
//       <div className="mad"><h1>Welcome, {employeeName} 👋</h1></div>
     

//       <div className="card">
//         <button
//           className="btn btn-checkin"
//           onClick={handleCheckIn}
//           disabled={isCheckedIn}
//         >
//           Check In
//         </button>

//         <button
//           className="btn btn-checkout"
//           onClick={handleCheckOut}
//           disabled={!isCheckedIn}
//           style={{ marginLeft: "10px" }}
//         >
//           Check Out
//         </button>
//       </div>

//       <div className="card">
//         <h2>Attendance Records</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Check In</th>
//               <th>Check Out</th>
//               <th>Worked Time (HH:MM)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.length === 0 ? (
//               <tr>
//                 <td colSpan="4">No records</td>
//               </tr>
//             ) : (
//               records.map((r, i) => (
//                 <tr key={i}>
//                   <td>{r.date}</td>
//                   <td>{r.checkIn}</td>
//                   <td>{r.checkOut}</td>
//                   <td>{r.hours}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="card">
//         <h2>Apply Leave</h2>
//         <input
//           type="date"
//           value={leaveDate}
//           onChange={(e) => setLeaveDate(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Leave reason"
//           value={leaveReason}
//           onChange={(e) => setLeaveReason(e.target.value)}
//         />
//         <button className="btn" onClick={handleLeaveSubmit}>
//           Apply
//         </button>
//       </div>

//       <div className="card">
//         <h2>My Leave Records</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Reason</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {myLeaves.length === 0 ? (
//               <tr>
//                 <td colSpan="3">No leaves</td>
//               </tr>
//             ) : (
//               myLeaves.map((l, i) => (
//                 <tr key={i}>
//                   <td>{l.date}</td>
//                   <td>{l.reason}</td>
//                   <td>{l.status}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import "./Attendance.css";

// const OFFICE_LOCATION = {
//   latitude: 17.448214,  
//   longitude: 78.399555,  
// };

// const OFFICE_RADIUS = 100;

// const getCurrentLocation = () =>
//   new Promise((resolve, reject) => {
//     if (!navigator.geolocation) reject();
//     navigator.geolocation.getCurrentPosition(
//       (pos) =>
//         resolve({
//           latitude: pos.coords.latitude,
//           longitude: pos.coords.longitude,
//         }),
//       () => reject()
//     );
//   });

// const isAtOffice = (lat, lng) => {
//   const R = 6371000;
//   const dLat = ((lat - OFFICE_LOCATION.latitude) * Math.PI) / 180;
//   const dLng = ((lng - OFFICE_LOCATION.longitude) * Math.PI) / 180;

//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(OFFICE_LOCATION.latitude * Math.PI / 180) *
//       Math.cos(lat * Math.PI / 180) *
//       Math.sin(dLng / 2) ** 2;

//   const distance = 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return distance <= OFFICE_RADIUS;
// };

// export default function Attendance() {
//   const loggedEmployee = JSON.parse(localStorage.getItem("loggedEmployee"));
//   const employeeName = loggedEmployee?.name;

//   const [records, setRecords] = useState([]);
//   const [leaves, setLeaves] = useState([]);
//   const [leaveDate, setLeaveDate] = useState("");
//   const [leaveReason, setLeaveReason] = useState("");


//   useEffect(() => {
//     if (!employeeName) return;

//     const allAttendance =
//       JSON.parse(localStorage.getItem("all_attendance")) || {};
//     setRecords(allAttendance[employeeName] || []);

//     const savedLeaves =
//       JSON.parse(localStorage.getItem("leave_records")) || [];
//     setLeaves(savedLeaves);
//   }, [employeeName]);


//   const handleCheckIn = async () => {
//     try {
//       const now = new Date();
//       const loc = await getCurrentLocation();

//       if (!isAtOffice(loc.latitude, loc.longitude)) {
//         alert("❌ You are not at office location");
//         return;
//       }

//       const allAttendance =
//         JSON.parse(localStorage.getItem("all_attendance")) || {};

//       if (!allAttendance[employeeName]) {
//         allAttendance[employeeName] = [];
//       }

//       if (allAttendance[employeeName][0]?.checkOut === "--") return;

//       allAttendance[employeeName].unshift({
//         date: now.toLocaleDateString("en-IN"),
//         name: employeeName,
//         checkIn: now.toLocaleTimeString("en-IN"),
//         checkInTime: now.getTime(),
//         checkOut: "--",
//         hours: "--",
//         checkInLocation: "Office",
//         checkOutLocation: "--",
//       });

//       localStorage.setItem("all_attendance", JSON.stringify(allAttendance));
//       setRecords(allAttendance[employeeName]);

//       alert("✅ Check-In Successful (Office Verified)");
//     } catch {
//       alert("Location permission required");
//     }
//   };


//   const handleCheckOut = async () => {
//     try {
//       const now = new Date();
//       const loc = await getCurrentLocation();

//       if (!isAtOffice(loc.latitude, loc.longitude)) {
//         alert("❌ Check-Out allowed only from office");
//         return;
//       }

//       const allAttendance =
//         JSON.parse(localStorage.getItem("all_attendance")) || {};

//       const today = allAttendance[employeeName]?.[0];
//       if (!today || today.checkOut !== "--") return;

//       const totalMinutes = Math.floor(
//         (now.getTime() - today.checkInTime) / 60000
//       );
//       const hrs = Math.floor(totalMinutes / 60);
//       const mins = totalMinutes % 60;

//       allAttendance[employeeName][0] = {
//         ...today,
//         checkOut: now.toLocaleTimeString("en-IN"),
//         hours: `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}`,
//         checkOutLocation: "Office",
//       };

//       localStorage.setItem("all_attendance", JSON.stringify(allAttendance));
//       setRecords(allAttendance[employeeName]);

//       alert("✅ Check-Out Successful");
//     } catch {
//       alert("Location permission required");
//     }
//   };


//   const handleLeaveSubmit = () => {
//       if (!leaveFromDate || !leaveToDate || !leaveReason){
//       alert("Please enter leave date & reason");
//       return;
//     }

//     const newLeave = {
//       name: employeeName,
//       fromdate: leaveFromDate,
//       todate:leaveToDate,

//       reason: leaveReason,
//       status: "Pending",
//     };

//     const updated = [newLeave, ...leaves];
//     setLeaves(updated);
//     localStorage.setItem("leave_records", JSON.stringify(updated));

//     setLeaveDate("");
//     setLeaveReason("");
//   };

//   const myLeaves = leaves.filter((l) => l.name === employeeName);
//   const isCheckedIn = records.length > 0 && records[0].checkOut === "--";


//   return (
//     <div className="attendance-container">
//       <h1>Welcome, {employeeName} 👋</h1>

//       <div className="card">
//         <button
//           className="btn btn-checkin"
//           onClick={handleCheckIn}
//           disabled={isCheckedIn}
//         >
//           Check In
//         </button>

//         <button
//           className="btn btn-checkout"
//           onClick={handleCheckOut}
//           disabled={!isCheckedIn}
//           style={{ marginLeft: "10px" }}
//         >
//           Check Out
//         </button>
//       </div>

//       <div className="card">
//         <h2>Attendance Records</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Check In</th>
//               <th>Check Out</th>
//               <th>Worked Time</th>
//               <th>Check-In Location</th>
//               <th>Check-Out Location</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.length === 0 ? (
//               <tr>
//                 <td colSpan="6">No records</td>
//               </tr>
//             ) : (
//               records.map((r, i) => (
//                 <tr key={i}>
//                   <td>{r.date}</td>
//                   <td>{r.checkIn}</td>
//                   <td>{r.checkOut}</td>
//                   <td>{r.hours}</td>
//                   <td>{r.checkInLocation}</td>
//                   <td>{r.checkOutLocation}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
      

//       <div className="card">
//         <h2>Apply Leave</h2>
//          <label>From:</label>
//         <input
//           type="date"
//           value={leaveFromDate}
//           onChange={(e) => setLeaveFromDate(e.target.value)}
//         />
//         <label>To:</label>
//         <input
//           type="date"
//           value={leaveToDate}
//           onChange={(e) => setLeaveToDate(e.target.value)}
//         />
//         <button className="btn" onClick={handleLeaveSubmit}>
//           Apply
//         </button>
//       </div>

//       <div className="card">
//         <h2>My Leave Records</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Reason</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {myLeaves.length === 0 ? (
//               <tr>
//                 <td colSpan="3">No leaves</td>
//               </tr>
//             ) : (
//               myLeaves.map((l, i) => (
//                 <tr key={i}>
//                   <td>{l.date}</td>
//                   <td>{l.reason}</td>
//                   <td>{l.status}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import "./Attendance.css";

// const OFFICE_LOCATION = {
//   latitude: 17.448214,  
//   longitude: 78.399555,  
// };

// const OFFICE_RADIUS = 100;

// const getCurrentLocation = () =>
//   new Promise((resolve, reject) => {
//     if (!navigator.geolocation) reject();
//     navigator.geolocation.getCurrentPosition(
//       (pos) =>
//         resolve({
//           latitude: pos.coords.latitude,
//           longitude: pos.coords.longitude,
//         }),
//       () => reject()
//     );
//   });

// const isAtOffice = (lat, lng) => {
//   const R = 6371000;
//   const dLat = ((lat - OFFICE_LOCATION.latitude) * Math.PI) / 180;
//   const dLng = ((lng - OFFICE_LOCATION.longitude) * Math.PI) / 180;

//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(OFFICE_LOCATION.latitude * Math.PI / 180) *
//       Math.cos(lat * Math.PI / 180) *
//       Math.sin(dLng / 2) ** 2;

//   const distance = 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return distance <= OFFICE_RADIUS;
// };

// export default function Attendance() {
//   const loggedEmployee = JSON.parse(localStorage.getItem("loggedEmployee"));
//   const employeeName = loggedEmployee?.name;

//   const [records, setRecords] = useState([]);
//   const [leaves, setLeaves] = useState([]);
//   const [leaveFromDate, setLeaveFromDate] = useState("");
//   const [leaveToDate, setLeaveToDate] = useState("");
//   const [leaveReason, setLeaveReason] = useState("");

//   useEffect(() => {
//     if (!employeeName) return;

//     const allAttendance =
//       JSON.parse(localStorage.getItem("all_attendance")) || {};
//     setRecords(allAttendance[employeeName] || []);

//     const savedLeaves =
//       JSON.parse(localStorage.getItem("leave_records")) || [];
//     setLeaves(savedLeaves);
//   }, [employeeName]);

//   const handleCheckIn = async () => {
//     try {
//       const now = new Date();
//       const loc = await getCurrentLocation();

//       if (!isAtOffice(loc.latitude, loc.longitude)) {
//         alert("❌ You are not at office location");
//         return;
//       }

//       const allAttendance =
//         JSON.parse(localStorage.getItem("all_attendance")) || {};

//       if (!allAttendance[employeeName]) {
//         allAttendance[employeeName] = [];
//       }

//       if (allAttendance[employeeName][0]?.checkOut === "--") return;

//       allAttendance[employeeName].unshift({
//        date: now.toLocaleDateString("en-IN"),
//        day: now.toLocaleDateString("en-IN", { weekday: "long" }),

//         name: employeeName,
//         checkIn: now.toLocaleTimeString("en-IN"),
//         checkInTime: now.getTime(),
//         checkOut: "--",
//         hours: "--",
//         checkInLocation: "Office",
//         checkOutLocation: "--",
//       });

//       localStorage.setItem("all_attendance", JSON.stringify(allAttendance));
//       setRecords(allAttendance[employeeName]);

//       alert("✅ Check-In Successful (Office Verified)");
//     } catch {
//       alert("Location permission required");
//     }
//   };

//   const handleCheckOut = async () => {
//     try {
//       const now = new Date();
//       const loc = await getCurrentLocation();

//       if (!isAtOffice(loc.latitude, loc.longitude)) {
//         alert("❌ Check-Out allowed only from office");
//         return;
//       }

//       const allAttendance =
//         JSON.parse(localStorage.getItem("all_attendance")) || {};

//       const today = allAttendance[employeeName]?.[0];
//       if (!today || today.checkOut !== "--") return;

//       const totalMinutes = Math.floor(
//         (now.getTime() - today.checkInTime) / 60000
//       );
//       const hrs = Math.floor(totalMinutes / 60);
//       const mins = totalMinutes % 60;

//       allAttendance[employeeName][0] = {
//         ...today,
//         checkOut: now.toLocaleTimeString("en-IN"),
//         hours: `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}`,
//         checkOutLocation: "Office",
//       };

//       localStorage.setItem("all_attendance", JSON.stringify(allAttendance));
//       setRecords(allAttendance[employeeName]);

//       alert("✅ Check-Out Successful");
//     } catch {
//       alert("Location permission required");
//     }
//   };

//   const handleLeaveSubmit = () => {
//     if (!leaveFromDate || !leaveToDate || !leaveReason) {
//       alert("Please enter From date, To date & reason");
//       return;
//     }

//     const newLeave = {
//       name: employeeName,
//       fromDate: leaveFromDate,
//       toDate: leaveToDate,
//       reason: leaveReason,
//       status: "Pending",
//     };

//     const updated = [newLeave, ...leaves];
//     setLeaves(updated);
//     localStorage.setItem("leave_records", JSON.stringify(updated));

//     setLeaveFromDate("");
//     setLeaveToDate("");
//     setLeaveReason("");
//   };

//   const myLeaves = leaves.filter((l) => l.name === employeeName);
//   const isCheckedIn = records.length > 0 && records[0].checkOut === "--";

//   return (
//     <div className="attendance-container">
//       <h1>Welcome, {employeeName} 👋</h1>

//       <div className="card">
//         <button
//           className="btn btn-checkin"
//           onClick={handleCheckIn}
//           disabled={isCheckedIn}
//         >
//           Check In
//         </button>

//         <button
//           className="btn btn-checkout"
//           onClick={handleCheckOut}
//           disabled={!isCheckedIn}
//           style={{ marginLeft: "10px" }}
//         >
//           Check Out
//         </button>
//       </div>

//       <div className="card">
//         <h2>Attendance Records</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Day</th>
//               <th>Check In</th>
//               <th>Check Out</th>
//               <th>Worked Time</th>
//               <th>Check-In Location</th>
//               <th>Check-Out Location</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.length === 0 ? (
//               <tr>
//                 <td colSpan="6">No records</td>
//               </tr>
//             ) : (
//               records.map((r, i) => (
//                 <tr key={i}>
//                   <td>{r.date}</td>
//                   <td>{r.day}</td>
//                   <td>{r.checkIn}</td>
//                   <td>{r.checkOut}</td>
//                   <td>{r.hours}</td>
//                   <td>{r.checkInLocation}</td>
//                   <td>{r.checkOutLocation}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="card">
//         <h2>Apply Leave</h2>
//         <label>From:</label>
//         <input
//           type="date"
//           value={leaveFromDate}
//           onChange={(e) => setLeaveFromDate(e.target.value)}
//         />
//         <label>To:</label>
//         <input
//           type="date"
//           value={leaveToDate}
//           onChange={(e) => setLeaveToDate(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Leave reason"
//           value={leaveReason}
//           onChange={(e) => setLeaveReason(e.target.value)}
//         />
//         <button className="btn" onClick={handleLeaveSubmit}>
//           Apply
//         </button>
//       </div>

//       <div className="card">
//         <h2>My Leave Records</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>From</th>
//               <th>To</th>
//               <th>Reason</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {myLeaves.length === 0 ? (
//               <tr>
//                 <td colSpan="4">No leaves</td>
//               </tr>
//             ) : (
//               myLeaves.map((l, i) => (
//                 <tr key={i}>
//                   <td>{l.fromDate}</td>
//                   <td>{l.toDate}</td>
//                   <td>{l.reason}</td>
//                   <td>{l.status}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { collection, addDoc, onSnapshot, updateDoc, doc } from "firebase/firestore";
// import { db } from "./firebase";
// import "./Attendance.css";

// export default function Attendance() {
//   const [records, setRecords] = useState([]);
//   const [startTime, setStartTime] = useState(null);

//   const employee = JSON.parse(localStorage.getItem("loggedEmployee"));
//   const employeeName = employee?.name;

//   // 🔥 REAL-TIME ATTENDANCE
//   useEffect(() => {
//     const unsub = onSnapshot(collection(db, "attendance"), snap => {
//       setRecords(
//         snap.docs
//           .map(d => ({ id: d.id, ...d.data() }))
//           .filter(r => r.name === employeeName)
//       );
//     });
//     return () => unsub();
//   }, []);

//   const handleCheckIn = async () => {
//     const now = new Date();
//     setStartTime(now);

//     await addDoc(collection(db, "attendance"), {
//       name: employeeName,
//       date: now.toLocaleDateString(),
//       checkIn: now.toLocaleTimeString(),
//       checkOut: "--",
//       hours: "--"
//     });
//   };

//   const handleCheckOut = async () => {
//     const end = new Date();
//     const hours = ((end - startTime) / 36e5).toFixed(2);

//     await updateDoc(doc(db, "attendance", records[0].id), {
//       checkOut: end.toLocaleTimeString(),
//       hours
//     });

//     setStartTime(null);
//   };

//   return (
//     <div className="attendance-container">
//       <h1>Attendance</h1>

//       <button onClick={handleCheckIn} disabled={startTime}>Check In</button>
//       <button onClick={handleCheckOut} disabled={!startTime}>Check Out</button>

//       <table className="table">
//         <tbody>
//           {records.map(r => (
//             <tr key={r.id}>
//               <td>{r.date}</td>
//               <td>{r.checkIn}</td>
//               <td>{r.checkOut}</td>
//               <td>{r.hours}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { collection, addDoc, onSnapshot, updateDoc, doc, query, where, orderBy } from "firebase/firestore";
// import { db } from "./firebase";
// import "./Attendance.css";

// export default function Attendance() {
//   const [records, setRecords] = useState([]);
//   const [startTime, setStartTime] = useState(null);

//   const [leaves, setLeaves] = useState([]);
//   const [leaveReason, setLeaveReason] = useState("");
//   const [leaveDate, setLeaveDate] = useState("");

//   const loggedEmployee = JSON.parse(localStorage.getItem("loggedEmployee"));
//   const employeeName = loggedEmployee?.name;

//   // 🔹 Real-time Attendance for this employee
//   useEffect(() => {
//     const q = query(
//       collection(db, "attendance"),
//       where("name", "==", employeeName),
//       orderBy("date", "desc")
//     );

//     const unsub = onSnapshot(q, snap => {
//       setRecords(snap.docs.map(d => ({ id: d.id, ...d.data() })));
//     });

//     const unsubLeaves = onSnapshot(
//       collection(db, "leaves"),
//       snap => {
//         setLeaves(snap.docs.map(d => ({ id: d.id, ...d.data() })));
//       }
//     );

//     return () => {
//       unsub();
//       unsubLeaves();
//     };
//   }, [employeeName]);

//   // ✅ Check In
//   const handleCheckIn = async () => {
//     if (startTime) return;

//     const now = new Date();
//     setStartTime(now);

//     await addDoc(collection(db, "attendance"), {
//       name: employeeName,
//       date: now.toLocaleDateString(),
//       checkIn: now.toLocaleTimeString(),
//       checkOut: "--",
//       hours: "--"
//     });
//   };

//   // ✅ Check Out
//   const handleCheckOut = async () => {
//     if (!startTime) return;

//     const now = new Date();
//     const hours = ((now - startTime) / (1000 * 60 * 60)).toFixed(2);

//     const activeRecord = records.find(r => r.checkOut === "--");
//     if (!activeRecord) return;

//     await updateDoc(doc(db, "attendance", activeRecord.id), {
//       checkOut: now.toLocaleTimeString(),
//       hours
//     });

//     setStartTime(null);
//   };

//   // ✅ Apply Leave
//   const handleLeaveSubmit = async () => {
//     if (!leaveDate || !leaveReason) return alert("Please enter date and reason");

//     await addDoc(collection(db, "leaves"), {
//       name: employeeName,
//       date: leaveDate,
//       reason: leaveReason,
//       status: "Pending"
//     });

//     setLeaveDate("");
//     setLeaveReason("");
//   };

//   const myLeaves = leaves.filter(l => l.name === employeeName);
//   const isCheckedIn = records.some(r => r.checkOut === "--");

//   return (
//     <div className="attendance-container">
//       <h1>Attendance & Leave</h1>

//       <div className="card">
//         <h2>Mark Attendance</h2>
//         <button onClick={handleCheckIn} disabled={isCheckedIn}>Check In</button>
//         <button onClick={handleCheckOut} disabled={!isCheckedIn}>Check Out</button>
//       </div>

//       <div className="card">
//         <h2>Attendance Records</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Check In</th>
//               <th>Check Out</th>
//               <th>Hours</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.map(r => (
//               <tr key={r.id}>
//                 <td>{r.date}</td>
//                 <td>{r.checkIn}</td>
//                 <td>{r.checkOut}</td>
//                 <td>{r.hours}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="card">
//         <h2>Apply Leave</h2>
//         <input type="date" value={leaveDate} onChange={e => setLeaveDate(e.target.value)} />
//         <input type="text" placeholder="Reason" value={leaveReason} onChange={e => setLeaveReason(e.target.value)} />
//         <button onClick={handleLeaveSubmit}>Apply Leave</button>
//       </div>

//       <div className="card">
//         <h2>Leave Records</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Reason</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {myLeaves.map(l => (
//               <tr key={l.id}>
//                 <td>{l.date}</td>
//                 <td>{l.reason}</td>
//                 <td>{l.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   addDoc,
//   query,
//   where,
//   getDocs,
//   getDoc,
//   updateDoc,
//   doc,
//   orderBy,
//   serverTimestamp
// } from "firebase/firestore";
// import { db } from "./firebase";
// import "./Attendance.css";

// export default function Attendance() {
//   const [records, setRecords] = useState([]);
//   const [currentRecord, setCurrentRecord] = useState(null);
//   const [leaves, setLeaves] = useState([]);
//   const [leaveReason, setLeaveReason] = useState("");
//   const [leaveDate, setLeaveDate] = useState("");
//   const [employeeName, setEmployeeName] = useState("");

//   const loggedEmployee = JSON.parse(localStorage.getItem("loggedEmployee"));
//   const uid = loggedEmployee?.uid;

//   /* ================= FETCH EMPLOYEE ================= */
//   useEffect(() => {
//     if (!uid) return;

//     const fetchEmployee = async () => {
//       try {
//         const ref = doc(db, "employees", uid);
//         const snap = await getDoc(ref);

//         if (snap.exists()) {
//           setEmployeeName(snap.data().name);
//         } else {
//           setEmployeeName(loggedEmployee?.name || "Unknown");
//         }
//       } catch (err) {
//         console.error("Employee fetch error:", err);
//       }
//     };

//     fetchEmployee();
//   }, [uid]);

//   /* ================= LOAD ATTENDANCE & LEAVES ================= */
//   useEffect(() => {
//     if (!uid) return;

//     const loadAttendance = async () => {
//       const q = query(
//         collection(db, "attendance"),
//         where("uid", "==", uid),
//         orderBy("createdAt", "desc")
//       );

//       const snap = await getDocs(q);
//       const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));

//       setRecords(data);

//       const active = data.find(r => r.checkOut === "--");
//       setCurrentRecord(active || null);
//     };

//     const loadLeaves = async () => {
//       const q = query(collection(db, "leaves"), where("uid", "==", uid));
//       const snap = await getDocs(q);
//       setLeaves(snap.docs.map(d => ({ id: d.id, ...d.data() })));
//     };

//     loadAttendance();
//     loadLeaves();
//   }, [uid]);

//   /* ================= CHECK IN ================= */
//   const handleCheckIn = async () => {
//     if (!employeeName) return alert("Employee info missing");
//     if (currentRecord) return alert("Already checked in");

//     const today = new Date().toDateString();

//     // Prevent multiple check-ins same day
//     const alreadyToday = records.find(
//       r => r.today === today && r.checkOut === "--"
//     );
//     if (alreadyToday) return alert("Already checked in today");

//     const now = new Date();

//     const newRecord = {
//       uid,
//       name: employeeName,
//       today,
//       checkIn: now.toLocaleTimeString(),
//       checkOut: "--",
//       hours: "--",
//       checkInTime: now.toISOString(),
//       createdAt: serverTimestamp()
//     };

//     const ref = await addDoc(collection(db, "attendance"), newRecord);

//     setRecords(prev => [{ id: ref.id, ...newRecord }, ...prev]);
//     setCurrentRecord({ id: ref.id, ...newRecord });
//   };

//   /* ================= CHECK OUT ================= */
//   const handleCheckOut = async () => {
//     if (!currentRecord) return alert("Not checked in");

//     const now = new Date();
//     const checkInTime = new Date(currentRecord.checkInTime);
//     const hoursWorked = ((now - checkInTime) / (1000 * 60 * 60)).toFixed(2);

//     const ref = doc(db, "attendance", currentRecord.id);

//     await updateDoc(ref, {
//       checkOut: now.toLocaleTimeString(),
//       hours: hoursWorked
//     });

//     setRecords(prev =>
//       prev.map(r =>
//         r.id === currentRecord.id
//           ? { ...r, checkOut: now.toLocaleTimeString(), hours: hoursWorked }
//           : r
//       )
//     );

//     setCurrentRecord(null);
//   };

//   /* ================= APPLY LEAVE ================= */
//   const handleLeaveSubmit = async () => {
//     if (!leaveDate || !leaveReason)
//       return alert("Enter leave date & reason");

//     const leave = {
//       uid,
//       name: employeeName,
//       date: leaveDate,
//       reason: leaveReason,
//       status: "Pending",
//       createdAt: serverTimestamp()
//     };

//     const ref = await addDoc(collection(db, "leaves"), leave);
//     setLeaves(prev => [{ id: ref.id, ...leave }, ...prev]);

//     setLeaveDate("");
//     setLeaveReason("");
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="attendance-container">
//       <h1>Attendance & Leave Management</h1>

//       <div className="card">
//         <h2>Mark Attendance</h2>
//         <button onClick={handleCheckIn} disabled={!!currentRecord}>
//           Check In
//         </button>
//         <button
//           onClick={handleCheckOut}
//           disabled={!currentRecord}
//           style={{ marginLeft: 10 }}
//         >
//           Check Out
//         </button>
//       </div>

//       <div className="card">
//         <h2>Attendance Records</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Check In</th>
//               <th>Check Out</th>
//               <th>Hours</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.length === 0 ? (
//               <tr>
//                 <td colSpan="4">No records</td>
//               </tr>
//             ) : (
//               records.map(r => (
//                 <tr key={r.id}>
//                   <td>{r.today}</td>
//                   <td>{r.checkIn}</td>
//                   <td>{r.checkOut}</td>
//                   <td>{r.hours}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="card">
//         <h2>Apply Leave</h2>
//         <input type="date" value={leaveDate} onChange={e => setLeaveDate(e.target.value)} />
//         <input type="text" placeholder="Reason" value={leaveReason} onChange={e => setLeaveReason(e.target.value)} />
//         <button onClick={handleLeaveSubmit}>Apply</button>
//       </div>

//       <div className="card">
//         <h2>Leave Records</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Date</th>
//               <th>Reason</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaves.length === 0 ? (
//               <tr>
//                 <td colSpan="4">No leaves</td>
//               </tr>
//             ) : (
//               leaves.map(l => (
//                 <tr key={l.id}>
//                   <td>{l.name}</td>
//                   <td>{l.date}</td>
//                   <td>{l.reason}</td>
//                   <td>{l.status}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   addDoc,
//   query,
//   where,
//   getDocs,
//   getDoc,
//   updateDoc,
//   doc,
//   orderBy,
//   serverTimestamp
// } from "firebase/firestore";
// import { db } from "./firebase";
// import "./Attendance.css";

// export default function Attendance() {
//   const [records, setRecords] = useState([]);
//   const [currentRecord, setCurrentRecord] = useState(null);
//   const [leaves, setLeaves] = useState([]);
//   const [leaveReason, setLeaveReason] = useState("");
//   const [leaveDate, setLeaveDate] = useState("");
//   const [employeeName, setEmployeeName] = useState("");

//   const loggedEmployee = JSON.parse(localStorage.getItem("loggedEmployee"));
//   const uid = loggedEmployee?.uid;

//   // ================= FETCH EMPLOYEE =================
//   useEffect(() => {
//     if (!uid) return;

//     const fetchEmployee = async () => {
//       try {
//         const ref = doc(db, "employees", uid);
//         const snap = await getDoc(ref);

//         if (snap.exists()) {
//           setEmployeeName(snap.data().name);
//         } else if (loggedEmployee?.name) {
//           setEmployeeName(loggedEmployee.name); // fallback
//         } else {
//           setEmployeeName("Unknown");
//         }
//       } catch (err) {
//         console.error("Employee fetch error:", err);
//         setEmployeeName("Unknown");
//       }
//     };

//     fetchEmployee();
//   }, [uid, loggedEmployee]);

//   // ================= LOAD ATTENDANCE & LEAVES =================
//   useEffect(() => {
//     if (!uid) return;

//     const loadAttendance = async () => {
//       const q = query(
//         collection(db, "attendance"),
//         where("uid", "==", uid),
//         orderBy("createdAt", "desc")
//       );

//       const snap = await getDocs(q);
//       const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));

//       setRecords(data);

//       const active = data.find(r => r.checkOut === "--");
//       setCurrentRecord(active || null);
//     };

//     const loadLeaves = async () => {
//       const q = query(collection(db, "leaves"), where("uid", "==", uid));
//       const snap = await getDocs(q);
//       setLeaves(snap.docs.map(d => ({ id: d.id, ...d.data() })));
//     };

//     loadAttendance();
//     loadLeaves();
//   }, [uid]);

//   // ================= CHECK IN =================
//   const handleCheckIn = async () => {
//     if (!employeeName) return alert("Employee info missing");
//     if (currentRecord) return alert("Already checked in");

//     const today = new Date().toDateString();
//     const alreadyToday = records.find(r => r.today === today && r.checkOut === "--");
//     if (alreadyToday) return alert("Already checked in today");

//     const now = new Date();

//     const newRecord = {
//       uid,
//       name: employeeName,
//       today,
//       date: today, // added for admin ordering
//       checkIn: now.toLocaleTimeString(),
//       checkOut: "--",
//       hours: "--",
//       checkInTime: now.toISOString(),
//       createdAt: serverTimestamp()
//     };

//     const ref = await addDoc(collection(db, "attendance"), newRecord);

//     setRecords(prev => [{ id: ref.id, ...newRecord }, ...prev]);
//     setCurrentRecord({ id: ref.id, ...newRecord });
//   };

//   // ================= CHECK OUT =================
//   const handleCheckOut = async () => {
//     if (!currentRecord) return alert("Not checked in");

//     const now = new Date();
//     const checkInTime = new Date(currentRecord.checkInTime);
//     const hoursWorked = ((now - checkInTime) / (1000 * 60 * 60)).toFixed(2);

//     const ref = doc(db, "attendance", currentRecord.id);

//     await updateDoc(ref, {
//       checkOut: now.toLocaleTimeString(),
//       hours: hoursWorked
//     });

//     setRecords(prev =>
//       prev.map(r =>
//         r.id === currentRecord.id
//           ? { ...r, checkOut: now.toLocaleTimeString(), hours: hoursWorked }
//           : r
//       )
//     );

//     setCurrentRecord(null);
//   };

//   // ================= APPLY LEAVE =================
//   const handleLeaveSubmit = async () => {
//     if (!leaveDate || !leaveReason)
//       return alert("Enter leave date & reason");

//     const leave = {
//       uid,
//       name: employeeName,
//       fromDate: leaveDate,
//       toDate: leaveDate,
//       reason: leaveReason,
//       status: "Pending",
//       createdAt: serverTimestamp()
//     };

//     const ref = await addDoc(collection(db, "leaves"), leave);
//     setLeaves(prev => [{ id: ref.id, ...leave }, ...prev]);

//     setLeaveDate("");
//     setLeaveReason("");
//   };

//   // ================= UI =================
//   return (
//     <div className="attendance-container">
//       <h1>Attendance & Leave Management</h1>

//       <div className="card">
//         <h2>Mark Attendance</h2>
//         <button onClick={handleCheckIn} disabled={!!currentRecord}>
//           Check In
//         </button>
//         <button
//           onClick={handleCheckOut}
//           disabled={!currentRecord}
//           style={{ marginLeft: 10 }}
//         >
//           Check Out
//         </button>
//       </div>

//       <div className="card">
//         <h2>Attendance Records</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Check In</th>
//               <th>Check Out</th>
//               <th>Hours</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.length === 0 ? (
//               <tr>
//                 <td colSpan="4">No records</td>
//               </tr>
//             ) : (
//               records.map(r => (
//                 <tr key={r.id}>
//                   <td>{r.today}</td>
//                   <td>{r.checkIn}</td>
//                   <td>{r.checkOut}</td>
//                   <td>{r.hours}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="card">
//         <h2>Apply Leave</h2>
//         <input type="date" value={leaveDate} onChange={e => setLeaveDate(e.target.value)} />
//         <input type="text" placeholder="Reason" value={leaveReason} onChange={e => setLeaveReason(e.target.value)} />
//         <button onClick={handleLeaveSubmit}>Apply</button>
//       </div>

//       <div className="card">
//         <h2>Leave Records</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>From</th>
//               <th>To</th>
//               <th>Reason</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaves.length === 0 ? (
//               <tr>
//                 <td colSpan="5">No leaves</td>
//               </tr>
//             ) : (
//               leaves.map(l => (
//                 <tr key={l.id}>
//                   <td>{l.name}</td>
//                   <td>{l.fromDate}</td>
//                   <td>{l.toDate}</td>
//                   <td>{l.reason}</td>
//                   <td>{l.status}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   addDoc,
//   onSnapshot,
//   updateDoc,
//   doc,
//   query,
//   where,
//   orderBy,
//   serverTimestamp
// } from "firebase/firestore";
// import { db } from "./firebase";
// import "./Attendance.css";

// export default function Attendance() {
//   const [records, setRecords] = useState([]);
//   const [currentRecord, setCurrentRecord] = useState(null);
//   const [leaves, setLeaves] = useState([]);
//   const [leaveReason, setLeaveReason] = useState("");
//   const [leaveDate, setLeaveDate] = useState("");
//   const [employeeName, setEmployeeName] = useState("");

//   const loggedEmployee = JSON.parse(localStorage.getItem("loggedEmployee"));
//   const uid = loggedEmployee?.uid;

//   useEffect(() => {
//     if (!loggedEmployee) return;
//     setEmployeeName(loggedEmployee.name || "Unknown");
//   }, [loggedEmployee]);

//   // ===== REAL-TIME ATTENDANCE =====
//   useEffect(() => {
//     if (!uid) return;

//     const q = query(
//       collection(db, "attendance"),
//       where("uid", "==", uid),
//       orderBy("createdAt", "desc")
//     );

//     const unsub = onSnapshot(q, snapshot => {
//       const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
//       setRecords(data);

//       const active = data.find(r => r.checkOut === "--");
//       setCurrentRecord(active || null);
//     });

//     return () => unsub();
//   }, [uid]);

//   // ===== REAL-TIME LEAVES =====
//   useEffect(() => {
//     if (!uid) return;

//     const q = query(
//       collection(db, "leaves"),
//       where("uid", "==", uid),
//       orderBy("createdAt", "desc")
//     );

//     const unsub = onSnapshot(q, snapshot => {
//       setLeaves(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
//     });

//     return () => unsub();
//   }, [uid]);

//   // ===== CHECK-IN =====
//   const handleCheckIn = async () => {
//     if (!employeeName) return alert("Employee info missing");
//     if (currentRecord) return alert("Already checked in");

//     const today = new Date().toDateString();
//     const alreadyToday = records.find(r => r.today === today && r.checkOut === "--");
//     if (alreadyToday) return alert("Already checked in today");

//     const now = new Date();
//     const newRecord = {
//       uid,
//       name: employeeName,
//       today,
//       date: today,
//       checkIn: now.toLocaleTimeString(),
//       checkOut: "--",
//       hours: "--",
//       checkInTime: now.toISOString(),
//       createdAt: serverTimestamp()
//     };

//     await addDoc(collection(db, "attendance"), newRecord);
//   };

//   // ===== CHECK-OUT =====
//   const handleCheckOut = async () => {
//     if (!currentRecord) return alert("Not checked in");

//     const now = new Date();
//     const checkInTime = new Date(currentRecord.checkInTime);
//     const hoursWorked = ((now - checkInTime) / (1000 * 60 * 60)).toFixed(2);

//     const ref = doc(db, "attendance", currentRecord.id);
//     await updateDoc(ref, {
//       checkOut: now.toLocaleTimeString(),
//       hours: hoursWorked
//     });
//   };

//   // ===== APPLY LEAVE =====
//   const handleLeaveSubmit = async () => {
//     if (!leaveDate || !leaveReason) return alert("Enter leave date & reason");

//     const leave = {
//       uid,
//       name: employeeName,
//       fromDate: leaveDate,
//       toDate: leaveDate,
//       reason: leaveReason,
//       status: "Pending",
//       createdAt: serverTimestamp()
//     };

//     await addDoc(collection(db, "leaves"), leave);
//     setLeaveDate("");
//     setLeaveReason("");
//   };

//   return (
//     <div className="attendance-container">
//       <h1>Attendance & Leave Management</h1>

//       <div className="card">
//         <h2>Mark Attendance</h2>
//         <button onClick={handleCheckIn} disabled={!!currentRecord}>Check In</button>
//         <button onClick={handleCheckOut} disabled={!currentRecord} style={{ marginLeft: 10 }}>Check Out</button>
//       </div>

//       <div className="card">
//         <h2>Attendance Records</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Check In</th>
//               <th>Check Out</th>
//               <th>Hours</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.length === 0 ? (
//               <tr><td colSpan="4">No records</td></tr>
//             ) : (
//               records.map(r => (
//                 <tr key={r.id}>
//                   <td>{r.today}</td>
//                   <td>{r.checkIn}</td>
//                   <td>{r.checkOut}</td>
//                   <td>{r.hours}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="card">
//         <h2>Apply Leave</h2>
//         <input type="date" value={leaveDate} onChange={e => setLeaveDate(e.target.value)} />
//         <input type="text" placeholder="Reason" value={leaveReason} onChange={e => setLeaveReason(e.target.value)} />
//         <button onClick={handleLeaveSubmit}>Apply</button>
//       </div>

//       <div className="card">
//         <h2>Leave Records</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>From</th>
//               <th>To</th>
//               <th>Reason</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaves.length === 0 ? (
//               <tr><td colSpan="5">No leaves</td></tr>
//             ) : (
//               leaves.map(l => (
//                 <tr key={l.id}>
//                   <td>{l.name}</td>
//                   <td>{l.fromDate}</td>
//                   <td>{l.toDate}</td>
//                   <td>{l.reason}</td>
//                   <td>{l.status}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   query,
//   where,
//   updateDoc,
//   doc
// } from "firebase/firestore";
// import { db } from "./firebase";

// export default function Attendance() {
//   const loggedEmployee = JSON.parse(localStorage.getItem("loggedEmployee"));

//   if (!loggedEmployee) {
//     alert("Login again");
//     return null;
//   }

//   const uid = loggedEmployee.uid;
//   const name = loggedEmployee.name;

//   const [records, setRecords] = useState([]);
//   const [currentRecord, setCurrentRecord] = useState(null);

//   const today = new Date().toDateString();

//   /* ================= LOAD ATTENDANCE ================= */
//   useEffect(() => {
//     const loadAttendance = async () => {
//       const q = query(
//         collection(db, "attendance"),
//         where("uid", "==", uid)
//       );

//       const snap = await getDocs(q);
//       const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));

//       setRecords(data);

//       const open = data.find(r => r.date === today && !r.checkOut);
//       setCurrentRecord(open || null);
//     };

//     loadAttendance();
//   }, [uid]);

//   /* ================= CHECK IN ================= */
//   const handleCheckIn = async () => {
//     if (currentRecord) {
//       alert("Already checked in today");
//       return;
//     }

//     const now = new Date();

//     await addDoc(collection(db, "attendance"), {
//       uid,
//       name,
//       date: today,
//       checkIn: now.toLocaleTimeString(),
//       checkInTimeISO: now.toISOString(), // 🔥 store ISO for calculation
//       checkOut: "",
//       hours: "",
//       createdAt: Date.now()
//     });

//     alert("Check-in successful");
//     window.location.reload();
//   };
  

//   /* ================= CHECK OUT ================= */
//   const handleCheckOut = async () => {
//     if (!currentRecord) {
//       alert("No active check-in");
//       return;
//     }

//     const now = new Date();
//     const checkInTime = new Date(currentRecord.checkInTimeISO);

//     // 🔥 CALCULATE HOURS
//     const diffMs = now - checkInTime; // milliseconds
//     const hoursWorked = (diffMs / (1000 * 60 * 60)).toFixed(2); // hours with 2 decimals

//     await updateDoc(doc(db, "attendance", currentRecord.id), {
//       checkOut: now.toLocaleTimeString(),
//       hours: hoursWorked
//     });

//     alert(`Check-out successful. Hours worked: ${hoursWorked}`);
//     window.location.reload();
//   };

//   return (
//     <div>
//       <h2>Attendance</h2>

//       <button onClick={handleCheckIn}>Check In</button>
//       <button onClick={handleCheckOut}>Check Out</button>

//       <h3>Your Records</h3>

//       <table className="table">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Name</th>
//             <th>Check In</th>
//             <th>Check Out</th>
//             <th>Hours</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records.map(r => (
//             <tr key={r.id}>
//               <td>{r.date}</td>
//               <td>{r.name}</td>
//               <td>{r.checkIn}</td>
//               <td>{r.checkOut || "-"}</td>
//               <td>{r.hours || "-"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   query,
//   where,
//   updateDoc,
//   doc
// } from "firebase/firestore";
// import { db } from "./firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   query,
//   where,
//   updateDoc,
//   doc,
//   onSnapshot,
//   orderBy
// } from "firebase/firestore";
// import { db } from "./firebase";

// export default function Attendance() {
//   const loggedEmployee = JSON.parse(localStorage.getItem("loggedEmployee"));

//   if (!loggedEmployee) {
//     alert("Login again");
//     return null;
//   }

//   const uid = loggedEmployee.uid;
//   const name = loggedEmployee.name;

//   const [records, setRecords] = useState([]);
//   const [currentRecord, setCurrentRecord] = useState(null);

//   const today = new Date().toDateString();
//   /* ================= LOAD LEAVES ================= */
// useEffect(() => {
//   const q = query(
//     collection(db, "leaves"),
//     where("uid", "==", uid),
//     orderBy("createdAt", "desc")
//   );

//   const unsubscribe = onSnapshot(q, (snapshot) => {
//     const data = snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     setLeaves(data);
//   });

//   return () => unsubscribe();
// }, [uid]);


//   /* ================= LOAD ATTENDANCE ================= */
//   useEffect(() => {
//     const loadAttendance = async () => {
//       const q = query(
//         collection(db, "attendance"),
//         where("uid", "==", uid)
//       );

//       const snap = await getDocs(q);
//       const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));

//       setRecords(data);

//       const open = data.find(r => r.date === today && !r.checkOut);
//       setCurrentRecord(open || null);
//     };

//     loadAttendance();
//   }, [uid]);
//   const [leaves, setLeaves] = useState([]);
//   const [leaveReason, setLeaveReason] = useState("");
//   const [leaveDate, setLeaveDate] = useState("");

//     const handleLeaveSubmit = async () => {
//     if (!leaveDate || !leaveReason) {
//       alert("Please enter date and reason for leave.");
//       return;
//     }
//         await addDoc(collection(db, "leaves"), {
//       uid,
//       name,
//       date: leaveDate,
//       reason: leaveReason,
//       status: "Pending",
//       createdAt: Date.now()
//     });

//     setLeaveDate("");
//     setLeaveReason("");
//     alert("Leave applied successfully!");
//   };

//   // Filter leaves for this employee
//   const myLeaves = leaves.filter(l => l.name === name);



//   /* ================= CHECK IN ================= */
//   const handleCheckIn = async () => {
//     if (currentRecord) {
//       alert("Already checked in today");
//       return;
//     }

//     const now = new Date();

//     await addDoc(collection(db, "attendance"), {
//       uid,
//       name,
//       date: today,
//       checkIn: now.toLocaleTimeString(),
//       checkInTimeISO: now.toISOString(), // 🔥 store ISO for calculation
//       checkOut: "",
//       hours: "",
//       createdAt: Date.now()
//     });

//     alert("Check-in successful");
//     window.location.reload();
//   };
  

//   /* ================= CHECK OUT ================= */
// const handleCheckOut = async () => {
//   if (!currentRecord) {
//     alert("No active check-in");
//     return;
//   }

//   const now = new Date();
//   const checkInTime = new Date(currentRecord.checkInTimeISO);

//   // Calculate hours & minutes
//   const diffMs = now - checkInTime;
//   const totalMinutes = Math.floor(diffMs / (1000 * 60));
//   const hours = Math.floor(totalMinutes / 60);
//   const minutes = totalMinutes % 60;
//   const hoursWorked = `${hours} hr ${minutes} min`;

//   await updateDoc(doc(db, "attendance", currentRecord.id), {
//     checkOut: now.toLocaleTimeString(),
//     hours: hoursWorked
//   });

//   alert(`Check-out successful. Hours worked: ${hoursWorked}`);
// };


//  return (
//   <div>
//     {/* ===== Attendance Section ===== */}
//     <div>
//       <h2>Hi Welcome {name} !</h2>

//       <button onClick={handleCheckIn}>Check In</button>
//       <button onClick={handleCheckOut}>Check Out</button>

//       <h3>Your Records</h3>

//       <table className="table">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Name</th>
//             <th>Check In</th>
//             <th>Check Out</th>
//             <th>Hours</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records.map(r => (
//             <tr key={r.id}>
//               <td>{r.date}</td>
//               <td>{r.name}</td>
//               <td>{r.checkIn || "-"}</td>
//               <td>{r.checkOut || "-"}</td>
//               <td>{r.hours || "-"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>

//     {/* ===== Apply Leave ===== */}
//     <div className="card">
//       <h2>Apply for Leave</h2>

//       <input
//         type="date"
//         className="input"
//         value={leaveDate}
//         onChange={(e) => setLeaveDate(e.target.value)}
//       />

//       <input
//         type="text"
//         className="input"
//         placeholder="Reason for leave"
//         value={leaveReason}
//         onChange={(e) => setLeaveReason(e.target.value)}
//       />

//       <button className="btn btn-checkin" onClick={handleLeaveSubmit}>
//         Apply Leave
//       </button>
//     </div>

//     {/* ===== Leave Records ===== */}
//     <div className="card">
//       <h2>Leave Records</h2>

//       <table className="table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Date</th>
//             <th>Reason</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
         
//             {myLeaves.map(l  => (
//               <tr key={l.id}>
//                 <td>{l.name}</td>
//                 <td>{l.date}</td>
//                 <td>{l.reason}</td>
//                 <td>{l.status}</td>
//               </tr>
//             ))}
          
//         </tbody>
//       </table>
//     </div>
//   </div>
// );
// }
// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   addDoc,
//   updateDoc,
//   doc,
//   query,
//   where,
//   orderBy,
//   onSnapshot
// } from "firebase/firestore";
// import { db } from "./firebase";
// import "./Attendance.css";

// export default function Attendance() {
//   const loggedEmployee = JSON.parse(localStorage.getItem("loggedEmployee"));
//   if (!loggedEmployee) {
//     alert("Login again");
//     return null;
//   }

//   const uid = loggedEmployee.uid;
//   const name = loggedEmployee.name;

//   const [records, setRecords] = useState([]);
//   const [currentRecord, setCurrentRecord] = useState(null);
//   const [leaves, setLeaves] = useState([]);
//   const [leaveDate, setLeaveDate] = useState("");
//   const [leaveReason, setLeaveReason] = useState("");

//   const today = new Date().toDateString();

//   // Load attendance in real-time
//   useEffect(() => {
//     const q = query(
//       collection(db, "attendance"),
//       where("uid", "==", uid),
//       orderBy("createdAt", "desc")
//     );

//     const unsubscribe = onSnapshot(q, snap => {
//       const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
//       setRecords(data);
//       const open = data.find(r => r.date === today && !r.checkOut);
//       setCurrentRecord(open || null);
//     });

//     return () => unsubscribe();
//   }, [uid]);

//   // Load leaves in real-time
//   useEffect(() => {
//     const q = query(
//       collection(db, "leaves"),
//       where("uid", "==", uid),
//       orderBy("createdAt", "desc")
//     );

//     const unsubscribe = onSnapshot(q, snap => {
//       setLeaves(snap.docs.map(d => ({ id: d.id, ...d.data() })));
//     });

//     return () => unsubscribe();
//   }, [uid]);

//   // Check-in
//   const handleCheckIn = async () => {
//     if (currentRecord) return alert("Already checked in today");

//     const now = new Date();
//     await addDoc(collection(db, "attendance"), {
//       uid,
//       name,
//       date: today,
//       checkIn: now.toLocaleTimeString(),
//       checkInTimeISO: now.toISOString(),
//       checkOut: "",
//       hours: "",
//       createdAt: Date.now()
//     });
//     alert("Check-in successful!");
//   };

//   // Check-out
//   const handleCheckOut = async () => {
//     if (!currentRecord) return alert("No active check-in");

//     const now = new Date();
//     const checkInTime = new Date(currentRecord.checkInTimeISO);
//     const hoursWorked = ((now - checkInTime) / (1000 * 60 * 60)).toFixed(2);

//     await updateDoc(doc(db, "attendance", currentRecord.id), {
//       checkOut: now.toLocaleTimeString(),
//       hours: hoursWorked
//     });

//     alert(`Check-out successful. Hours worked: ${hoursWorked}`);
//   };

//   // Apply leave
//   const handleLeaveSubmit = async () => {
//     if (!leaveDate || !leaveReason) return alert("Enter date & reason");

//     await addDoc(collection(db, "leaves"), {
//       uid,
//       name,
//       date: leaveDate,
//       reason: leaveReason,
//       status: "Pending",
//       createdAt: Date.now()
//     });

//     setLeaveDate("");
//     setLeaveReason("");
//     alert("Leave applied successfully!");
//   };

//   return (
//     <div>
//       <h2>Hi, Welcome {name}!</h2>

//       <div>
//         <button onClick={handleCheckIn}>Check In</button>
//         <button onClick={handleCheckOut}>Check Out</button>
//       </div>

//       <h3>Your Attendance Records</h3>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Name</th>
//             <th>Check In</th>
//             <th>Check Out</th>
//             <th>Hours</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records.length === 0 ? (
//             <tr>
//               <td colSpan="5" style={{ textAlign: "center" }}>No attendance records yet.</td>
//             </tr>
//           ) : (
//             records.map(r => (
//               <tr key={r.id}>
//                 <td>{r.date}</td>
//                 <td>{r.name}</td>
//                 <td>{r.checkIn || "-"}</td>
//                 <td>{r.checkOut || "-"}</td>
//                 <td>{r.hours || "-"}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       <div className="card">
//         <h2>Apply Leave</h2>
//         <input type="date" value={leaveDate} onChange={e => setLeaveDate(e.target.value)} />
//         <input type="text" placeholder="Reason for leave" value={leaveReason} onChange={e => setLeaveReason(e.target.value)} />
//         <button onClick={handleLeaveSubmit}>Apply Leave</button>
//       </div>

//       <h3>Your Leave Records</h3>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Date</th>
//             <th>Reason</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaves.length === 0 ? (
//             <tr>
//               <td colSpan="4" style={{ textAlign: "center" }}>No leave applications yet.</td>
//             </tr>
//           ) : (
//             leaves.map(l => (
//               <tr key={l.id}>
//                 <td>{l.name}</td>
//                 <td>{l.date}</td>
//                 <td>{l.reason}</td>
//                 <td>{l.status}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   addDoc,
//   updateDoc,
//   doc,
//   query,
//   where,
//   orderBy,
//   onSnapshot
// } from "firebase/firestore";
// import { db } from "./firebase";
// import "./Attendance.css";

// export default function Attendance() {
//   const loggedEmployee = JSON.parse(localStorage.getItem("loggedEmployee"));
//   if (!loggedEmployee) {
//     alert("Login again");
//     return null;
//   }

//   const uid = loggedEmployee.uid;
//   const name = loggedEmployee.name;

//   const [records, setRecords] = useState([]);
//   const [currentRecord, setCurrentRecord] = useState(null);
//   const [leaves, setLeaves] = useState([]);
//   const [leaveDate, setLeaveDate] = useState("");
//   const [leaveReason, setLeaveReason] = useState("");

//   const today = new Date().toDateString();

//   // Load attendance in real-time
//   useEffect(() => {
//     const q = query(
//       collection(db, "attendance"),
//       where("uid", "==", uid),
//       orderBy("createdAt", "desc")
//     );

//     const unsubscribe = onSnapshot(q, snap => {
//       const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
//       setRecords(data);
//       const open = data.find(r => r.date === today && !r.checkOut);
//       setCurrentRecord(open || null);
//     });

//     return () => unsubscribe();
//   }, [uid]);

//   // Load leaves in real-time
//   useEffect(() => {
//     const q = query(
//       collection(db, "leaves"),
//       where("uid", "==", uid),
//       orderBy("createdAt", "desc")
//     );

//     const unsubscribe = onSnapshot(q, snap => {
//       setLeaves(snap.docs.map(d => ({ id: d.id, ...d.data() })));
//     });

//     return () => unsubscribe();
//   }, [uid]);

//   // Check-in
//   const handleCheckIn = async () => {
//     if (currentRecord) return alert("Already checked in today");

//     const now = new Date();
//     await addDoc(collection(db, "attendance"), {
//       uid,
//       name,
//       date: today,
//       checkIn: now.toLocaleTimeString(),
//       checkInTimeISO: now.toISOString(),
//       checkOut: "",
//       hours: "",
//       createdAt: Date.now()
//     });
//     alert("Check-in successful!");
//   };

//   // Check-out
//   const handleCheckOut = async () => {
//     if (!currentRecord) return alert("No active check-in");

//     const now = new Date();
//     const checkInTime = new Date(currentRecord.checkInTimeISO);
//     const hoursWorked = ((now - checkInTime) / (1000 * 60 * 60)).toFixed(2);

//     await updateDoc(doc(db, "attendance", currentRecord.id), {
//       checkOut: now.toLocaleTimeString(),
//       hours: hoursWorked
//     });

//     alert(`Check-out successful. Hours worked: ${hoursWorked}`);
//   };

//   // Apply leave
//   const handleLeaveSubmit = async () => {
//     if (!leaveDate || !leaveReason) return alert("Enter date & reason");

//     await addDoc(collection(db, "leaves"), {
//       uid,
//       name,
//       date: leaveDate,
//       reason: leaveReason,
//       status: "Pending",
//       createdAt: Date.now()
//     });

//     setLeaveDate("");
//     setLeaveReason("");
//     alert("Leave applied successfully!");
//   };

//   return (
//     <div>
//       <h2>Hi, Welcome {name}!</h2>

//       <div>
//         <button onClick={handleCheckIn}>Check In</button>
//         <button onClick={handleCheckOut}>Check Out</button>
//       </div>

//       <h3>Your Attendance Records</h3>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Name</th>
//             <th>Check In</th>
//             <th>Check Out</th>
//             <th>Hours</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records.length === 0 ? (
//             <tr>
//               <td colSpan="5" style={{ textAlign: "center" }}>
//                 No attendance records yet.
//               </td>
//             </tr>
//           ) : (
//             records.map(r => (
//               <tr key={r.id}>
//                 <td>{r.date}</td>
//                 <td>{r.name}</td>
//                 <td>{r.checkIn || "-"}</td>
//                 <td>{r.checkOut || "-"}</td>
//                 <td>{r.hours || "-"}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       <div className="card">
//         <h2>Apply Leave</h2>
//         <input
//           type="date"
//           value={leaveDate}
//           onChange={e => setLeaveDate(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Reason for leave"
//           value={leaveReason}
//           onChange={e => setLeaveReason(e.target.value)}
//         />
//         <button onClick={handleLeaveSubmit}>Apply Leave</button>
//       </div>

//       <h3>Your Leave Records</h3>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Date</th>
//             <th>Reason</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaves.length === 0 ? (
//             <tr>
//               <td colSpan="4" style={{ textAlign: "center" }}>
//                 No leave applications yet.
//               </td>
//             </tr>
//           ) : (
//             leaves.map(l => (
//               <tr key={l.id}>
//                 <td>{l.name}</td>
//                 <td>{l.date}</td>
//                 <td>{l.reason}</td>
//                 <td>{l.status}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   query,
//   where,
//   updateDoc,
//   doc,
//   onSnapshot
// } from "firebase/firestore";
// import { db } from "./firebase";

// export default function Attendance() {
//   const loggedEmployee = JSON.parse(localStorage.getItem("loggedEmployee"));

//   if (!loggedEmployee) {
//     alert("Login again");
//     return null;
//   }

//   const uid = loggedEmployee.uid;
//   const name = loggedEmployee.name;

//   /* ================= STATE ================= */
//   const [records, setRecords] = useState([]);
//   const [currentRecord, setCurrentRecord] = useState(null);

//   const [leaves, setLeaves] = useState([]);
//   const [leaveReason, setLeaveReason] = useState("");
//   const [leaveDate, setLeaveDate] = useState("");

//   const today = new Date().toDateString();

//   /* ================= LOAD LEAVES (REALTIME) ================= */
//   useEffect(() => {
//     const q = query(
//       collection(db, "leaves"),
//       where("uid", "==", uid)
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setLeaves(data);
//     });

//     return () => unsubscribe();
//   }, [uid]);

//   /* ================= LOAD ATTENDANCE ================= */
//   useEffect(() => {
//     const loadAttendance = async () => {
//       const q = query(
//         collection(db, "attendance"),
//         where("uid", "==", uid)
//       );

//       const snap = await getDocs(q);
//       const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));

//       setRecords(data);

//       const open = data.find(r => r.date === today && !r.checkOut);
//       setCurrentRecord(open || null);
//     };

//     loadAttendance();
//   }, [uid, today]);

//   /* ================= APPLY LEAVE ================= */
//   const handleLeaveSubmit = async () => {
//     if (!leaveDate || !leaveReason) {
//       alert("Please enter date and reason for leave.");
//       return;
//     }

//     await addDoc(collection(db, "leaves"), {
//       uid,
//       name,
//       date: leaveDate,
//       reason: leaveReason,
//       status: "Pending",
//       createdAt: Date.now()
//     });

//     setLeaveDate("");
//     setLeaveReason("");
//     alert("Leave applied successfully!");
//   };

//   /* ================= CHECK IN ================= */
//   const handleCheckIn = async () => {
//     if (currentRecord) {
//       alert("Already checked in today");
//       return;
//     }

//     const now = new Date();

//     await addDoc(collection(db, "attendance"), {
//       uid,
//       name,
//       date: today,
//       checkIn: now.toLocaleTimeString(),
//       checkInTimeISO: now.toISOString(),
//       checkOut: "",
//       hours: "",
//       createdAt: Date.now()
//     });

//     alert("Check-in successful");
//   };

//   /* ================= CHECK OUT ================= */
//   const handleCheckOut = async () => {
//     if (!currentRecord) {
//       alert("No active check-in");
//       return;
//     }

//     const now = new Date();
//     const checkInTime = new Date(currentRecord.checkInTimeISO);

//     const diffMs = now - checkInTime;
//     const totalMinutes = Math.floor(diffMs / (1000 * 60));
//     const hours = Math.floor(totalMinutes / 60);
//     const minutes = totalMinutes % 60;

//     await updateDoc(doc(db, "attendance", currentRecord.id), {
//       checkOut: now.toLocaleTimeString(),
//       hours: `${hours} hr ${minutes} min`
//     });

//     alert("Check-out successful");
//   };

//   /* ================= UI ================= */
//   return (
//     <div>
// <h2 style={{ textAlign: "center" }}>
//   Hi Welcome{" "}
//   <span style={{ color: "#e32b87ff", fontWeight: "700" }}>
//     {name}
//   </span>
//   !
// </h2>


// <div
//   style={{
//     display: "flex",
//     justifyContent: "center",
//     gap: "50px",
//     margin: "20px 0"
//   }}
// >
//   <button
//     onClick={handleCheckIn}
//     style={{
//       backgroundColor: "#22c55e",
//       color: "#fff",
//       padding: "10px 20px",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontWeight: "600"
//     }}
//   >
//     Check In
//   </button>

//   <button
//     onClick={handleCheckOut}
//     style={{
//       backgroundColor: "#ef4444",
//       color: "#fff",
//       padding: "10px 20px",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontWeight: "600"
//     }}
//   >
//     Check Out
//   </button>
// </div>



//       {/* ===== Attendance Records ===== */}
//       <h3>Your Attendance Records</h3>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Name</th>
//             <th>Check In</th>
//             <th>Check Out</th>
//             <th>Hours</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records.length === 0 ? (
//             <tr>
//               <td colSpan="5">No attendance records</td>
//             </tr>
//           ) : (
//             records.map(r => (
//               <tr key={r.id}>
//                 <td>{r.date}</td>
//                 <td>{r.name}</td>
//                 <td>{r.checkIn || "-"}</td>
//                 <td>{r.checkOut || "-"}</td>
//                 <td>{r.hours || "-"}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* ===== Apply Leave ===== */}
//       <div className="card">
//         <h2>Apply for Leave</h2>

//         <input
//           type="date"
//           value={leaveDate}
//           onChange={(e) => setLeaveDate(e.target.value)}
//         />

//         <input
//           type="text"
//           placeholder="Reason"
//           value={leaveReason}
//           onChange={(e) => setLeaveReason(e.target.value)}
//         />

//         <button onClick={handleLeaveSubmit}>Apply Leave</button>
//       </div>

//       {/* ===== Leave Records ===== */}
//       <div className="card">
//         <h2>Leave Records</h2>

//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Date</th>
//               <th>Reason</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaves.length === 0 ? (
//               <tr>
//                 <td colSpan="4">No leave records</td>
//               </tr>
//             ) : (
//               leaves.map(l => (
//                 <tr key={l.id}>
//                   <td>{l.name}</td>
//                   <td>{l.date}</td>
//                   <td>{l.reason}</td>
//                   <td>{l.status}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   query,
//   where,
//   updateDoc,
//   doc,
//   onSnapshot
// } from "firebase/firestore";
// import { db } from "./firebase";


// const OFFICE_LAT = 17.448381;   
// const OFFICE_LNG = 78.399465;   
// const ALLOWED_RADIUS = 100;     

// /* ================= DISTANCE FUNCTION ================= */
// function getDistanceInMeters(lat1, lon1, lat2, lon2) {
//   const R = 6371000;
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLon = ((lon2 - lon1) * Math.PI) / 180;

//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(lat1 * Math.PI / 180) *
//       Math.cos(lat2 * Math.PI / 180) *
//       Math.sin(dLon / 2) ** 2;

//   return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
// }

// export default function Attendance() {
//   const loggedEmployee = JSON.parse(localStorage.getItem("loggedEmployee"));

//   if (!loggedEmployee) {
//     alert("Login again");
//     return null;
//   }

//   const uid = loggedEmployee.uid;
//   const name = loggedEmployee.name;

//   const [records, setRecords] = useState([]);
//   const [currentRecord, setCurrentRecord] = useState(null);

//   const [leaves, setLeaves] = useState([]);
//   const [leaveReason, setLeaveReason] = useState("");
//   const [leaveDate, setLeaveDate] = useState("");

//   const today = new Date().toDateString();

//   useEffect(() => {
//     const q = query(
//       collection(db, "leaves"),
//       where("uid", "==", uid)
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setLeaves(data);
//     });

//     return () => unsubscribe();
//   }, [uid]);

//   /* ================= LOAD ATTENDANCE ================= */
//   useEffect(() => {
//     const loadAttendance = async () => {
//       const q = query(
//         collection(db, "attendance"),
//         where("uid", "==", uid)
//       );

//       const snap = await getDocs(q);
//       const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));

//       setRecords(data);

//       const open = data.find(r => r.date === today && !r.checkOut);
//       setCurrentRecord(open || null);
//     };

//     loadAttendance();
//   }, [uid, today]);

//   /* ================= APPLY LEAVE ================= */
//   const handleLeaveSubmit = async () => {
//     if (!leaveDate || !leaveReason) {
//       alert("Please enter date and reason");
//       return;
//     }

//     await addDoc(collection(db, "leaves"), {
//       uid,
//       name,
//       date: leaveDate,
//       reason: leaveReason,
//       status: "Pending",
//       createdAt: Date.now()
//     });

//     setLeaveDate("");
//     setLeaveReason("");
//     alert("Leave applied successfully!");
//   };

//   const handleCheckIn = async () => {
//     if (currentRecord) {
//       alert("Already checked in today");
//       return;
//     }

//     if (!navigator.geolocation) {
//       alert("Geolocation not supported");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const userLat = position.coords.latitude;
//         const userLng = position.coords.longitude;

//         const distance = getDistanceInMeters(
//           userLat,
//           userLng,
//           OFFICE_LAT,
//           OFFICE_LNG
//         );

//         if (distance > ALLOWED_RADIUS) {
//           alert("❌ You are not at office location. Check-in denied.");
//           return;
//         }

//         const now = new Date();

//         await addDoc(collection(db, "attendance"), {
//           uid,
//           name,
//           date: today,
//           checkIn: now.toLocaleTimeString(),
//           checkInTimeISO: now.toISOString(),
//           checkOut: "",
//           hours: "",
//           createdAt: Date.now(),
//           location: {
//             lat: userLat,
//             lng: userLng
//           }
//         });

//         alert("✅ Check-in successful");
//       },
//       () => {
//         alert("❌ Location permission denied");
//       }
//     );
//   };

//   /* ================= CHECK OUT ================= */
//   const handleCheckOut = async () => {
//     if (!currentRecord) {
//       alert("No active check-in");
//       return;
//     }

//     const now = new Date();
//     const checkInTime = new Date(currentRecord.checkInTimeISO);

//     const diffMs = now - checkInTime;
//     const totalMinutes = Math.floor(diffMs / (1000 * 60));
//     const hours = Math.floor(totalMinutes / 60);
//     const minutes = totalMinutes % 60;

//     await updateDoc(doc(db, "attendance", currentRecord.id), {
//       checkOut: now.toLocaleTimeString(),
//       hours: `${hours} hr ${minutes} min`
//     });

//     alert("Check-out successful");
//   };


// return (
//   <div className="attendance-container">
//     <div className="vamsi" style={{backgroundColor:"grey"}}>

//     <h2 style={{ textAlign: "center" }}>
//       Hi Welcome{" "}
//       <span style={{ color: "#e32b87ff", fontWeight: "700"}}>
//         {name}
//       </span>
//       !
//     </h2>
//     </div>

//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         gap: "40px",
//         margin: "20px 0",
//         flexWrap: "wrap"


        
      
//       }}
//     >
//       <button
//   style={{ backgroundColor: "green", padding: "15px", borderRadius:"5px" }}

//         onClick={handleCheckIn}
//         className="madhu"
//       >
//         Check In
//       </button>

//       <button
//        style={{ backgroundColor: "red", padding: "15px", borderRadius:"5px" }}
//         onClick={handleCheckOut}
//         className="satya"
//       >
//         Check Out
//       </button>
//     </div>

//     {/* ===== Attendance ===== */}
//     <div className="wrapper">
//       <h3>Your Attendance Records</h3>

//       <div className="sat">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Name</th>
//               <th>Check In</th>
//               <th>Check Out</th>
//               <th>Hours</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.length === 0 ? (
//               <tr>
//                 <td colSpan="5" style={{ textAlign: "center" }}>
//                   No records
//                 </td>
//               </tr> 
//             ) : (
//               records.map(r => (
//                 <tr key={r.id}>
//                   <td>{r.date}</td>
//                   <td>{r.name}</td>
//                   <td>{r.checkIn || "-"}</td>
//                   <td>{r.checkOut || "-"}</td>
//                   <td>{r.hours || "-"}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>

//     {/* ===== APPLY LEAVE ===== */}
//     <div className="card">
//       <h2>Apply for Leave</h2>

//       <input
//         type="date"
//         value={leaveDate}
//         onChange={(e) => setLeaveDate(e.target.value)}
//       />

//       <input
//         type="text"
//         placeholder="Reason"
//         value={leaveReason}
//         onChange={(e) => setLeaveReason(e.target.value)}
//       />

//       <button className="btn btn-checkin" onClick={handleLeaveSubmit}>
//         Apply Leave
//       </button>
//     </div>

//     {/* ===== LEAVE RECORDS ===== */}
//     <div className="card">
//       <h2>Leave Records</h2>

//       <div className="sat">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Date</th>
//               <th>Reason</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaves.length === 0 ? (
//               <tr>
//                 <td colSpan="4" style={{ textAlign: "center" }}>
//                   No leave records
//                 </td>
//               </tr>
//             ) : (
//               leaves.map(l => (
//                 <tr key={l.id}>
//                   <td>{l.name}</td>
//                   <td>{l.date}</td>
//                   <td>{l.reason}</td>
//                   <td>{l.status}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>

//   </div>
// );
// }
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  onSnapshot
} from "firebase/firestore";
import { db } from "./firebase";

const OFFICE_LAT = 17.448381;   
const OFFICE_LNG = 78.399465;   
const ALLOWED_RADIUS = 100;     

function getDistanceInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default function Attendance() {
  const loggedEmployee = JSON.parse(localStorage.getItem("loggedEmployee"));

  if (!loggedEmployee) {
    alert("Login again");
    return null;
  }

  const uid = loggedEmployee.uid;
  const name = loggedEmployee.name;
  const email = loggedEmployee.email; // ✅ ADD THIS


  const [records, setRecords] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [leaveReason, setLeaveReason] = useState("");
  // const [leaveDate, setLeaveDate] = useState("");
  const [leaveFrom, setLeaveFrom] = useState("");
const [leaveTo, setLeaveTo] = useState("");


  // NEW STATES to disable buttons while processing
  const [isCheckInDisabled, setIsCheckInDisabled] = useState(false);
  const [isCheckOutDisabled, setIsCheckOutDisabled] = useState(false);

  const today = new Date().toDateString();

  useEffect(() => {
    const q = query(collection(db, "leaves"), where("uid", "==", uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLeaves(data);
    });
    return () => unsubscribe();
  }, [uid]);

  useEffect(() => {
    const loadAttendance = async () => {
      const q = query(collection(db, "attendance"), where("uid", "==", uid));
      const snap = await getDocs(q);
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setRecords(data);
      const open = data.find(r => r.date === today && !r.checkOut);
      setCurrentRecord(open || null);
    };
    loadAttendance();
  }, [uid, today]);

  // const handleLeaveSubmit = async () => {
  //   if (!leaveDate || !leaveReason) {
  //     alert("Please enter date and reason");
  //     return;
  //   }
  //   await addDoc(collection(db, "leaves"), {
  //     uid,
  //     name,
  //     email,
  //     date: leaveDate,
  //     reason: leaveReason,
  //     status: "Pending",
  //     createdAt: Date.now()
  //   });
  //   setLeaveDate("");
  //   setLeaveReason("");
  //   alert("Leave applied successfully!");
  // };
const handleLeaveSubmit = async () => {
  if (!leaveFrom || !leaveTo || !leaveReason) {
    alert("Please enter from date, to date and reason");
    return;
  }

  if (new Date(leaveFrom) > new Date(leaveTo)) {
    alert("From date cannot be after To date");
    return;
  }

  await addDoc(collection(db, "leaves"), {
    uid,
    name,
    email,
    fromDate: leaveFrom,
    toDate: leaveTo,
    reason: leaveReason,
    status: "Pending",
    createdAt: Date.now()
  });

  setLeaveFrom("");
  setLeaveTo("");
  setLeaveReason("");

  alert("Leave applied successfully!");
};

  const handleCheckIn = async () => {
    if (currentRecord) {
      alert("Already checked in today");
      return;
    }
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setIsCheckInDisabled(true); // disable button immediately

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const distance = getDistanceInMeters(userLat, userLng, OFFICE_LAT, OFFICE_LNG);

        if (distance > ALLOWED_RADIUS) {
          alert("❌ You are not at office location. Check-in denied.");
          setIsCheckInDisabled(false); // re-enable if denied
          return;
        }

        const now = new Date();

        await addDoc(collection(db, "attendance"), {
          uid,
          name,
     
          date: today,
          checkIn: now.toLocaleTimeString(),
          checkInTimeISO: now.toISOString(),
          checkOut: "",
          hours: "",
          createdAt: Date.now(),
          location: { lat: userLat, lng: userLng }
        });

        alert("✅ Check-in successful");
        setIsCheckInDisabled(false); // re-enable after success
      },
      () => {
        alert("❌ Location permission denied");
        setIsCheckInDisabled(false); // re-enable if location denied
      }
    );
  };

  // const handleCheckOut = async () => {
  //   if (!currentRecord) {
  //     alert("No active check-in");
  //     return;
  //   }

  //   setIsCheckOutDisabled(true); // disable button immediately

  //   const now = new Date();
  //   const checkInTime = new Date(currentRecord.checkInTimeISO);

  //   const diffMs = now - checkInTime;
  //   const totalMinutes = Math.floor(diffMs / (1000 * 60));
  //   const hours = Math.floor(totalMinutes / 60);
  //   const minutes = totalMinutes % 60;

  //   await updateDoc(doc(db, "attendance", currentRecord.id), {
  //     checkOut: now.toLocaleTimeString(),
  //     hours: `${hours} hr ${minutes} min`
  //   });

  //   alert("Check-out successful");
  //   setIsCheckOutDisabled(false); // re-enable button
  // };


const handleCheckOut = async () => {
  if (!currentRecord) {
    alert("No active check-in found");
    return;
  }

  setIsCheckOutDisabled(true);

  try {
    const now = new Date();
    const checkInTime = new Date(currentRecord.checkInTimeISO);

    if (isNaN(checkInTime.getTime())) {
      throw new Error("Invalid check-in time");
    }

    const diffMs = now - checkInTime;
    const totalMinutes = Math.floor(diffMs / (1000 * 60));

    
    if (totalMinutes < 570) {
      throw new Error(
        `Minimum 9hrs 30min working hours required. You worked only ${Math.floor(
          totalMinutes / 60
        )}h ${totalMinutes % 60}m`
      );
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    await updateDoc(doc(db, "attendance", currentRecord.id), {
      checkOut: now.toLocaleTimeString(),
      checkOutTimeISO: now.toISOString(),
      totalMinutes: totalMinutes,
      hours: `${hours} hr ${minutes} min`,
      status: "COMPLETED"
    });

    alert("Check-out successful");
  } catch (error) {
    alert(error.message);
  } finally {
    setIsCheckOutDisabled(false); // ✅ ALWAYS re-enable
  }
};



  return (
    <div className="attendance-container">
      <div className="vamsi" style={{ backgroundColor: "grey" }}>
        <h2 style={{ textAlign: "center" }}>
          Hi Welcome <span style={{ color: "#e32b87ff", fontWeight: "700" }}>{name}</span>!
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          margin: "20px 0",
          flexWrap: "wrap"
        }}
      >
        <button
          style={{ backgroundColor: "green", padding: "15px", borderRadius: "5px" }}
          onClick={handleCheckIn}
          disabled={isCheckInDisabled}
        >
          {isCheckInDisabled ? "Processing..." : "Check In"}
        </button>

        <button
          style={{ backgroundColor: "red", padding: "15px", borderRadius: "5px" }}
          onClick={handleCheckOut}
          disabled={isCheckOutDisabled}
        >
          {isCheckOutDisabled ? "Processing..." : "Check Out"}
        </button>
      </div>

      {/* ===== Attendance Records ===== */}
      <div className="wrapper">
        <h3>Your Attendance Records</h3>
        <div className="sat">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Hours</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>No records</td>
                </tr>
              ) : (
                records.map(r => (
                  <tr key={r.id}>
                    <td>{r.date}</td>
                    <td>{r.name}</td>
                    <td>{r.checkIn || "-"}</td>
                    <td>{r.checkOut || "-"}</td>
                    <td>{r.hours || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Apply Leave ===== */}
      {/* <div className="card">
        <h2>Apply for Leave</h2>
        <input type="date" value={leaveDate} onChange={(e) => setLeaveDate(e.target.value)} />
        <input type="text" placeholder="Reason" value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} />
        <button className="btn btn-checkin" onClick={handleLeaveSubmit}>Apply Leave</button>
      </div> */}
      <div className="card">
  <h2>Apply for Leave</h2>

  <label>From Date</label>
  <input
    type="date"
    value={leaveFrom}
    onChange={(e) => setLeaveFrom(e.target.value)}
  />

  <label>To Date</label>
  <input
    type="date"
    value={leaveTo}
    onChange={(e) => setLeaveTo(e.target.value)}
  />

  <input
    type="text"
    placeholder="Reason"
    value={leaveReason}
    onChange={(e) => setLeaveReason(e.target.value)}
  />

  <button className="btn btn-checkin" onClick={handleLeaveSubmit}>
    Apply Leave
  </button>
</div>


      {/* ===== Leave Records ===== */}
      <div className="card">
        <h2>Leave Records</h2>
        <div className="sat">
          <table className="table">
            {/* <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead> */}
            <thead>
  <tr>
    <th>Name</th>
    <th>From</th>
    <th>To</th>
    <th>Reason</th>
    <th>Status</th>
  </tr>
</thead>

            {/* <tbody>
              {leaves.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>No leave records</td>
                </tr>
              ) : (
                leaves.map(l => (
                  <tr key={l.id}>
                    <td>{l.name}</td>
                    <td>{l.date}</td>
                    <td>{l.reason}</td>
                    <td>{l.status}</td>
                  </tr>
                ))
              )}
            </tbody> */}
            <tbody>
  {leaves.length === 0 ? (
    <tr>
      <td colSpan="5" style={{ textAlign: "center" }}>
        No leave records
      </td>
    </tr>
  ) : (
    leaves.map(l => (
      <tr key={l.id}>
        <td>{l.name}</td>
        <td>{l.fromDate}</td>
        <td>{l.toDate}</td>
        <td>{l.reason}</td>
        <td>{l.status}</td>
      </tr>
    ))
  )}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
