// import React, { useEffect, useState } from "react"; 
// import "./AdminDashboard.css"; 

// export default function AdminDashboard() { 
//   const [attendanceRecords, setAttendanceRecords] = useState([]); 
//   const [leaveRecords, setLeaveRecords] = useState([]); 

//   useEffect(() => { 
//     loadAllData(); 
//   }, []); 

//   const loadAllData = () => { 
//     // ✅ ATTENDANCE (from shared storage) 
//     const allAttendance = JSON.parse(localStorage.getItem("all_attendance")) || {}; 
//     let attendanceList = []; 

//     Object.entries(allAttendance).forEach(
//       ([name, records]) => { 
//         records.forEach((r) => { 
//           attendanceList.push({ 
//             name, 
//             date: r.date, 
//             checkIn: r.checkIn, 
//             checkOut: r.checkOut, 
//             hours: r.hours, 
//           }); 
//         }); 
//       } 
//     ); 

//     setAttendanceRecords(attendanceList); 

//     // ✅ LEAVES (global) 
//     const allLeaves = JSON.parse(localStorage.getItem("leave_records")) || []; 
//     setLeaveRecords(allLeaves); 
//   }; 

//   const approveLeave = (index) => { 
//     const updated = [...leaveRecords]; 
//     updated[index].status = "Approved"; 
//     // updated[index].status = "Rejected"
//     setLeaveRecords(updated); 

//     localStorage.setItem(
//       "leave_records", 
//       JSON.stringify(updated) 
//     ); 
//   }; 
//   const rejectLeave = (index) => {
//     const updated = [...leaveRecords];
//     updated [index].status = "Rejected";
//     setLeaveRecords(updated);
//     localStorage.setItem(
//       "leave_records",
//       JSON.stringify(updated)
//     );
    
//   }

//   return ( 
//     <div className="admin-container"> 
//       <h1>Admin Dashboard</h1> 

//       {/* ATTENDANCE */} 
//       <div className="card"> 
//         <h2>All Attendance Records</h2> 
//         <table className="table"> 
//           <thead> 
//             <tr> 
//               <th>Name</th> 
//               <th>Date</th> 
//               <th>Check In</th> 
//               <th>Check Out</th> 
//               <th>Hours</th> 
//             </tr> 
//           </thead> 
//           <tbody> 
//             {attendanceRecords.length === 0 ? ( 
//               <tr> 
//                 <td colSpan="5">No attendance found</td> 
//               </tr> 
//             ) : ( 
//               attendanceRecords.map((r, i) => ( 
//                 <tr key={i}> 
//                   <td>{r.name}</td> 
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

//       {/* LEAVES */} 
//       <div className="card"> 
//         <h2>Leave Applications</h2> 
//         <table className="table"> 
//           <thead> 
//             <tr> 
//               <th>Name</th> 
//               <th>Date</th> 
//               <th>Reason</th> 
//               <th>Status</th> 
//               <th>Action</th> 
//             </tr> 
//           </thead> 
//           <tbody> 
//             {leaveRecords.length === 0 ? ( 
//               <tr> 
//                 <td colSpan="5">No leave requests</td> 
//               </tr> 
//             ) : ( 
//               leaveRecords.map((l, i) => ( 
//                 <tr key={i}> 
//                   <td>{l.name}</td> 
//                   <td>{l.date}</td> 
//                   <td>{l.reason}</td> 
//                   <td>{l.status}</td> 
//                   <td> 
                  
//                    {l.status === "Pending" && ( 
//                    <>
//                    <button onClick={() => approveLeave(i)}>Approve</button>
//                   <button onClick={() => rejectLeave(i)}>Reject</button>
//                   </>
//                   )} 
//                 </td>

                
                
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
// import "./AdminDashboard.css";

// export default function AdminDashboard() {
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [leaveRecords, setLeaveRecords] = useState([]);

//   useEffect(() => {
//     loadAllData();
//   }, []);

//   const loadAllData = () => {
//     /* ================= ATTENDANCE ================= */

//     const allAttendance = JSON.parse(
//       localStorage.getItem("all_attendance") || "{}"
//     );

//     let attendanceList = [];

//     if (typeof allAttendance === "object" && allAttendance !== null) {
//       Object.entries(allAttendance).forEach(([name, records]) => {
//         if (!Array.isArray(records)) return;

//         records.forEach((r) => {
//           if (!r || !r.date) return;

//           attendanceList.push({
//             name: name || "Unknown",
//             date: r.date,
//             checkIn: r.checkIn || "-",
//             checkOut: r.checkOut || "-",
//             hours: r.hours || "-",
//           });
//         });
//       });
//     }

//     setAttendanceRecords(attendanceList);



//     const allLeaves = JSON.parse(
//       localStorage.getItem("leave_records") || "[]"
//     );

//     setLeaveRecords(Array.isArray(allLeaves) ? allLeaves : []);
//   };



//   const groupedAttendance = attendanceRecords.reduce((acc, record) => {
//     if (!record?.date) return acc;
//     if (!acc[record.date]) acc[record.date] = [];
//     acc[record.date].push(record);
//     return acc;
//   }, {});

//   /* ================= DAY NAME ================= */

//   const getDayName = (dateStr) => {
//     const d = new Date(dateStr);
//     if (isNaN(d)) return "";
//     return d.toLocaleDateString("en-IN", { weekday: "long" });
//   };



//   const approveLeave = (index) => {
//     const updated = [...leaveRecords];
//     updated[index] = { ...updated[index], status: "Approved" };
//     setLeaveRecords(updated);
//     localStorage.setItem("leave_records", JSON.stringify(updated));
//   };

//   const rejectLeave = (index) => {
//     const updated = [...leaveRecords];
//     updated[index] = { ...updated[index], status: "Rejected" };
//     setLeaveRecords(updated);
//     localStorage.setItem("leave_records", JSON.stringify(updated));
//   };

 

//   return (
//     <div className="admin-container">
//       <h1>Admin Dashboard</h1>

//       {/* ===== ATTENDANCE ===== */}
//       <div className="card">
//         <h2>Attendance Records (Day Wise)</h2>

//         {Object.keys(groupedAttendance).length === 0 ? (
//           <p>No attendance found</p>
//         ) : (
//           Object.entries(groupedAttendance).map(([date, records]) => (
//             <div key={date} className="day-table">
//               <h3>
//                 {getDayName(date)} — {date}
//               </h3>

//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Check In</th>
//                     <th>Check Out</th>
//                     <th>Hours</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {records.map((r, i) => (
//                     <tr key={i}>
//                       <td>{r.name}</td>
//                       <td>{r.checkIn}</td>
//                       <td>{r.checkOut}</td>
//                       <td>{r.hours}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ))
//         )}
//       </div>

//       {/* ===== LEAVES ===== */}
//       <div className="card">
//         <h2>Leave Applications</h2>

//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Date</th>
//               <th>Reason</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {leaveRecords.length === 0 ? (
//               <tr>
//                 <td colSpan="5">No leave requests</td>
//               </tr>
//             ) : (
//               leaveRecords.map((l, i) => (
//                 <tr key={i}>
//                   <td>{l.name || "-"}</td>
//                   <td>{l.date || "-"}</td>
//                   <td>{l.reason || "-"}</td>
//                   <td>{l.status || "Pending"}</td>
//                   <td>
//                     {l.status === "Pending" && (
//                       <>
//                         <button onClick={() => approveLeave(i)}>
//                           Approve
//                         </button>
//                         <button onClick={() => rejectLeave(i)}>
//                           Reject
//                         </button>
//                       </>
//                     )}
//                   </td>
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
// import { collection, onSnapshot, updateDoc, doc, query, orderBy } from "firebase/firestore";
// import { db } from "./firebase";
// import "./AdminDashboard.css";

// export default function AdminDashboard() {
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [leaveRecords, setLeaveRecords] = useState([]);

//   // ================= REAL-TIME ATTENDANCE =================
//   useEffect(() => {
//     const attendanceQuery = query(collection(db, "attendance"), orderBy("date", "desc"));
//     const unsubAttendance = onSnapshot(attendanceQuery, (snapshot) => {
//       setAttendanceRecords(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
//     });

//     return () => unsubAttendance();
//   }, []);

//   // ================= REAL-TIME LEAVES =================
//   useEffect(() => {
//     const leaveQuery = query(collection(db, "leaves"), orderBy("fromDate", "desc"));
//     const unsubLeaves = onSnapshot(leaveQuery, (snapshot) => {
//       setLeaveRecords(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
//     });

//     return () => unsubLeaves();
//   }, []);

//   // ================= APPROVE LEAVE =================
//   const handleApproveLeave = async (id) => {
//     try {
//       await updateDoc(doc(db, "leaves", id), { status: "Approved" });
//       alert("✅ Leave approved");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to approve leave");
//     }
//   };

//   return (
//     <div className="admin-container">
//       <h1>Admin Dashboard</h1>

//       {/* Attendance Table */}
//       <div className="card">
//         <h2>Attendance Records</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Day</th>
//               <th>Name</th>
//               <th>Check In</th>
//               <th>Check Out</th>
//               <th>Worked Time</th>
//               <th>Check-In Location</th>
//               <th>Check-Out Location</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendanceRecords.length === 0 ? (
//               <tr>
//                 <td colSpan="8" style={{ textAlign: "center" }}>No attendance records yet</td>
//               </tr>
//             ) : (
//               attendanceRecords.map((r) => (
//                 <tr key={r.id}>
//                   <td>{r.date}</td>
//                   <td>{r.day}</td>
//                   <td>{r.name}</td>
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

//       {/* Leave Table */}
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
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaveRecords.length === 0 ? (
//               <tr>
//                 <td colSpan="6" style={{ textAlign: "center" }}>No leave applications yet</td>
//               </tr>
//             ) : (
//               leaveRecords.map((l) => (
//                 <tr key={l.id}>
//                   <td>{l.name}</td>
//                   <td>{l.fromDate}</td>
//                   <td>{l.toDate}</td>
//                   <td>{l.reason}</td>
//                   <td>{l.status}</td>
//                   <td>
//                     {l.status === "Pending" && (
//                       <button onClick={() => handleApproveLeave(l.id)}>Approve</button>
//                     )}
//                   </td>
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
// import { collection, onSnapshot, updateDoc, doc, query, orderBy } from "firebase/firestore";
// import { db } from "./firebase";
// import "./AdminDashboard.css";

// export default function AdminDashboard() {
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [leaveRecords, setLeaveRecords] = useState([]);

//   // ================= REAL-TIME ATTENDANCE =================
//   useEffect(() => {
//     const attendanceQuery = query(collection(db, "attendance"), orderBy("createdAt", "desc"));
//     const unsubAttendance = onSnapshot(attendanceQuery, (snapshot) => {
//       setAttendanceRecords(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
//     });

//     return () => unsubAttendance();
//   }, []);

//   // ================= REAL-TIME LEAVES =================
//   useEffect(() => {
//     const leaveQuery = query(collection(db, "leaves"), orderBy("createdAt", "desc"));
//     const unsubLeaves = onSnapshot(leaveQuery, (snapshot) => {
//       setLeaveRecords(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
//     });

//     return () => unsubLeaves();
//   }, []);

//   // ================= APPROVE LEAVE =================
//   const handleApproveLeave = async (id) => {
//     try {
//       await updateDoc(doc(db, "leaves", id), { status: "Approved" });
//       alert("✅ Leave approved");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to approve leave");
//     }
//   };

//   return (
//     <div className="admin-container">
//       <h1>Admin Dashboard</h1>

//       {/* Attendance Table */}
//       <div className="card">
//         <h2>Attendance Records</h2>
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
//             {attendanceRecords.length === 0 ? (
//               <tr>
//                 <td colSpan="5" style={{ textAlign: "center" }}>No attendance records yet</td>
//               </tr>
//             ) : (
//               attendanceRecords.map((r) => (
//                 <tr key={r.id}>
//                   <td>{r.date}</td>
//                   <td>{r.name}</td>
//                   <td>{r.checkIn}</td>
//                   <td>{r.checkOut}</td>
//                   <td>{r.hours}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Leave Table */}
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
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaveRecords.length === 0 ? (
//               <tr>
//                 <td colSpan="6" style={{ textAlign: "center" }}>No leave applications yet</td>
//               </tr>
//             ) : (
//               leaveRecords.map((l) => (
//                 <tr key={l.id}>
//                   <td>{l.name}</td>
//                   <td>{l.fromDate}</td>
//                   <td>{l.toDate}</td>
//                   <td>{l.reason}</td>
//                   <td>{l.status}</td>
//                   <td>
//                     {l.status === "Pending" && (
//                       <button onClick={() => handleApproveLeave(l.id)}>Approve</button>
//                     )}
//                   </td>
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
// import { collection, onSnapshot, updateDoc, doc, query, orderBy } from "firebase/firestore";
// import { db } from "./firebase";
// 

// export default function AdminDashboard() {
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [leaveRecords, setLeaveRecords] = useState([]);

//   // ===== REAL-TIME ATTENDANCE =====
//   useEffect(() => {
//     const q = query(collection(db, "attendance"), orderBy("createdAt", "desc"));
//     const unsub = onSnapshot(q, snapshot => {
//       setAttendanceRecords(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
//     });
//     return () => unsub();
//   }, []);

//   // ===== REAL-TIME LEAVES =====
//   useEffect(() => {
//     const q = query(collection(db, "leaves"), orderBy("createdAt", "desc"));
//     const unsub = onSnapshot(q, snapshot => {
//       setLeaveRecords(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
//     });
//     return () => unsub();
//   }, []);
import "./AdminDashboard.css";
//   // ===== APPROVE LEAVE =====
//   const handleApproveLeave = async (id) => {
//     try {
//       await updateDoc(doc(db, "leaves", id), { status: "Approved" });
//       alert("✅ Leave approved");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to approve leave");
//     }
//   };

//   return (
//     <div className="admin-container">
//       <h1>Admin Dashboard</h1>

//       <div className="card">
//         <h2>Attendance Records</h2>
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
//             {attendanceRecords.length === 0 ? (
//               <tr><td colSpan="5" style={{ textAlign: "center" }}>No attendance records yet</td></tr>
//             ) : (
//               attendanceRecords.map(r => (
//                 <tr key={r.id}>
//                   <td>{r.date}</td>
//                   <td>{r.name}</td>
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
//         <h2>Leave Records</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>From</th>
//               <th>To</th>
//               <th>Reason</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaveRecords.length === 0 ? (
//               <tr><td colSpan="6" style={{ textAlign: "center" }}>No leave applications yet</td></tr>
//             ) : (
//               leaveRecords.map(l => (
//                 <tr key={l.id}>
//                   <td>{l.name}</td>
//                   <td>{l.fromDate}</td>
//                   <td>{l.toDate}</td>
//                   <td>{l.reason}</td>
//                   <td>{l.status}</td>
//                   <td>
//                     {l.status === "Pending" && (
//                       <button onClick={() => handleApproveLeave(l.id)}>Approve</button>
//                     )}
//                   </td>
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
// import "./AdminDashboard.css";
// import {
//   collection,
//   getDocs,
//   query,
//   orderBy
// } from "firebase/firestore";
// import { db } from "./firebase";

// export default function AdminDashboard() {
//   const [attendance, setAttendance] = useState([]);
// const [leaveRecords, setLeaveRecords] = useState([]);
//   useEffect(() => {
//     const fetchAttendance = async () => {
//       const q = query(
//         collection(db, "attendance"),
//         orderBy("createdAt", "desc")
//       );

//       const snap = await getDocs(q);
//       const list = snap.docs.map(d => ({
//         id: d.id,
//         ...d.data()
//       }));

//       setAttendance(list);
//     };

//     fetchAttendance();
//   }, []);

//   // 🔹 GROUP BY DATE
//   const grouped = attendance.reduce((acc, r) => {
//     if (!acc[r.date]) acc[r.date] = [];
//     acc[r.date].push(r);
//     return acc;
//   }, {});

//  const handleApproveLeave = (index) => {
//     const updatedLeaves = [...leaveRecords];
//     updatedLeaves[index].status = "Approved";
//     setLeaveRecords(updatedLeaves);
//   return (
//     <div>
//       <h2>Admin Attendance Panel</h2>

//       {Object.keys(grouped).length === 0 ? (
//         <p>No records</p>
//       ) : (
//         Object.entries(grouped).map(([date, list]) => (
//           <div key={date} className="date-section">
//             <h3>{date}</h3>

//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Check In</th>
//                   <th>Check Out</th>
//                   <th>Hours</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {list.map(r => (
//                   <tr key={r.id}>
//                     <td>{r.name }</td>
//                     <td>{r.checkIn}</td>
//                     <td>{r.checkOut || "-"}</td>
//                     <td>{r.hours || "-"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import "./AdminDashboard.css";
// import {
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   updateDoc,
//   doc
// } from "firebase/firestore";
// import { db } from "./firebase";

// export default function AdminDashboard() {
//   const [attendance, setAttendance] = useState([]);
//   const [remark, setRemark] = useState("");

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       const q = query(
//         collection(db, "attendance"),
//         orderBy("createdAt", "desc")
//       );

//       const snap = await getDocs(q);
//       const list = snap.docs.map(d => ({
//         id: d.id,
//         ...d.data()
//       }));

//       setAttendance(list);
//     };

//     fetchAttendance();
//   }, []);

//   const updateLeaveStatus = async (id, status) => {
//     await updateDoc(doc(db, "attendance", id), {
//       status,
//       adminRemark: remark
//     });

//     setAttendance(prev =>
//       prev.map(r =>
//         r.id === id ? { ...r, status, adminRemark: remark } : r
//       )
//     );

//     setRemark("");
//   };

//   const grouped = attendance.reduce((acc, r) => {
//     if (!acc[r.date]) acc[r.date] = [];
//     acc[r.date].push(r);
//     return acc;
//   }, {});

//   return (
//     <div>
//       <h2>Admin Attendance Panel</h2>

//       {Object.entries(grouped).map(([date, list]) => (
//         <div key={date} className="date-section">
//           <h3>{date}</h3>

//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Status</th>
//                 <th>Reason</th>
//                 <th>Remark</th>
//                 <th>Check In</th>
//                 <th>Check Out</th>
//                 <th>Hours</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {list.map(r => (
//                 <tr key={r.id}>
//                   <td>{r.name}</td>
//                   <td>{r.status || "Present"}</td>
//                   <td>{r.leaveReason || "-"}</td>
//                   <td>{r.adminRemark || "-"}</td>
//                   <td>{r.checkIn || "-"}</td>
//                   <td>{r.checkOut || "-"}</td>
//                   <td>{r.hours || "-"}</td>
//                   <td>
//                     {r.status === "Leave-Pending" ? (
//                       <>
//                         <input
//                           type="text"
//                           placeholder="Admin remark"
//                           value={remark}
//                           onChange={(e) => setRemark(e.target.value)}
//                         />
//                         <br />
//                         <button onClick={() => updateLeaveStatus(r.id, "Leave-Approved")}>
//                           Approve
//                         </button>
//                         <button onClick={() => updateLeaveStatus(r.id, "Leave-Rejected")}>
//                           Reject
//                         </button>
//                       </>
//                     ) : (
//                       "-"
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import "./AdminDashboard.css";
// import {
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   onSnapshot,
//   doc,
//   updateDoc
// } from "firebase/firestore";
// import { db } from "./firebase";

// export default function AdminDashboard() {
//   const [attendance, setAttendance] = useState([]);
//   const [leaveRecords, setLeaveRecords] = useState([]);

//   // 🔹 Load attendance
//   useEffect(() => {
//     const q = query(collection(db, "attendance"), orderBy("createdAt", "desc"));
//     const unsubscribe = onSnapshot(q, snap => {
//       const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
//       setAttendance(list);
//     });
//     return () => unsubscribe();
//   }, []);

//   // 🔹 Load leave records
//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "leaves"), snap => {
//       const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
//       setLeaveRecords(list);
//     });
//     return () => unsubscribe();
//   }, []);

//   // 🔹 Group attendance by date
//   const grouped = attendance.reduce((acc, r) => {
//     if (!acc[r.date]) acc[r.date] = [];
//     acc[r.date].push(r);
//     return acc;
//   }, {});

//   // 🔹 Approve leave
//   const handleApproveLeave = async (leaveId, index) => {
//     const leaveRef = doc(db, "leaves", leaveId);
//     await updateDoc(leaveRef, { status: "Approved" });

//     const updatedLeaves = [...leaveRecords];
//     updatedLeaves[index].status = "Approved";
//     setLeaveRecords(updatedLeaves);
//   };

//   return (
//     <div>
//       <h2>Admin Attendance Panel</h2>

//       {/* ===== Attendance Table ===== */}
//       {Object.keys(grouped).length === 0 ? (
//         <p>No attendance records</p>
//       ) : (
//         Object.entries(grouped).map(([date, list]) => (
//           <div key={date} className="date-section">
//             <h3>{date}</h3>
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Check In</th>
//                   <th>Check Out</th>
//                   <th>Hours</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {list.map(r => (
//                   <tr key={r.id}>
//                     <td>{r.name}</td>
//                     <td>{r.checkIn}</td>
//                     <td>{r.checkOut || "-"}</td>
//                     <td>{r.hours || "-"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ))
//       )}

//       {/* ===== Leave Approvals ===== */}
//       <div className="card">
//         <h2>Leave Approvals</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Date</th>
//               <th>Reason</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaveRecords.map((l, index) => (
//               <tr key={l.id}>
//                 <td>{l.name}</td>
//                 <td>{l.date}</td>
//                 <td>{l.reason}</td>
//                 <td>{l.status}</td>
//                 <td>
//                   {l.status === "Pending" && (
//                     <button onClick={() => handleApproveLeave(l.id, index)}>
//                       Approve
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import "./AdminDashboard.css";
// import {
//   collection,
//   doc,
//   updateDoc,
//   query,
//   orderBy,
//   onSnapshot
// } from "firebase/firestore";
// import { db } from "./firebase";

// export default function AdminDashboard() {
//   const [attendance, setAttendance] = useState([]);
//   const [leaveRecords, setLeaveRecords] = useState([]);

//   /* ================= LOAD ATTENDANCE ================= */
//   useEffect(() => {
//     const q = query(collection(db, "attendance"), orderBy("createdAt", "desc"));

//     const unsubscribe = onSnapshot(q, snap => {
//       const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
//       setAttendance(list);
//     });

//     return () => unsubscribe();
//   }, []);

//   /* ================= LOAD LEAVES ================= */
//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "leaves"), snap => {
//       const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
//       setLeaveRecords(list);
//     });

//     return () => unsubscribe();
//   }, []);

//   /* ================= GROUP ATTENDANCE BY DATE ================= */
//   const grouped = attendance.reduce((acc, r) => {
//     if (!acc[r.date]) acc[r.date] = [];
//     acc[r.date].push(r);
//     return acc;
//   }, {});

//   /* ================= APPROVE LEAVE ================= */
//   const handleApproveLeave = async (leaveId) => {
//     try {
//       const leaveRef = doc(db, "leaves", leaveId);
//       await updateDoc(leaveRef, { status: "Approved" });
//       alert("Leave approved successfully!");
//     } catch (error) {
//       console.error("Failed to approve leave:", error);
//       alert("Error approving leave. See console.");
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Dashboard</h2>

//       {/* ===== Attendance Section ===== */}
//       {Object.keys(grouped).length === 0 ? (
//         <p>No attendance records yet.</p>
//       ) : (
//         Object.entries(grouped).map(([date, list]) => (
//           <div key={date} className="date-section">
//             <h3>{date}</h3>
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Check In</th>
//                   <th>Check Out</th>
//                   <th>Hours</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {list.map(r => (
//                   <tr key={r.id}>
//                     <td>{r.name}</td>
//                     <td>{r.checkIn}</td>
//                     <td>{r.checkOut || "-"}</td>
//                     <td>{r.hours || "-"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ))
//       )}

//       {/* ===== Leave Approvals Section ===== */}
//       <div className="card">
//         <h2>Leave Approvals</h2>
//         {leaveRecords.length === 0 ? (
//           <p>No leave applications yet.</p>
//         ) : (
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Date</th>
//                 <th>Reason</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leaveRecords.map(l => (
//                 <tr key={l.id}>
//                   <td>{l.name}</td>
//                   <td>{l.date}</td>
//                   <td>{l.reason}</td>
//                   <td>{l.status}</td>
//                   <td>
//                     {l.status === "Pending" && (
//                       <button onClick={() => handleApproveLeave(l.id)}>
//                         Approve
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }
// 
// import React, { useEffect, useState } from "react";
// import "./AdminDashboard.css";
// import {
//   collection,
//   doc,
//   updateDoc,
//   query,
//   orderBy,
//   onSnapshot
// } from "firebase/firestore";
// import { db } from "./firebase";

// export default function AdminDashboard() {
//   const [attendance, setAttendance] = useState([]);
//   const [leaveRecords, setLeaveRecords] = useState([]);
//   const [emailStatus, setEmailStatus] = useState({}); // Track email sent per leave

//   // Load attendance
//   useEffect(() => {
//     const q = query(collection(db, "attendance"), orderBy("createdAt", "desc"));
//     const unsubscribe = onSnapshot(q, snap => {
//       const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
//       setAttendance(list);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Load leaves
//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "leaves"), snap => {
//       const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
//       setLeaveRecords(list);
//     });
//     return () => unsubscribe();
//   }, []);

//   const grouped = attendance.reduce((acc, r) => {
//     if (!acc[r.date]) acc[r.date] = [];
//     acc[r.date].push(r);
//     return acc;
//   }, {});

//   // Update leave status in Firestore
//   const handleLeave = async (leaveId, newStatus) => {
//     const leaveRef = doc(db, "leaves", leaveId);
//     await updateDoc(leaveRef, { status: newStatus });

//     // Optional: mark email as sent in local state
//     setEmailStatus(prev => ({ ...prev, [leaveId]: "Email Sent ✅" }));
//     alert(`Leave ${newStatus}! Email will be sent.`);
//   };

//   return (
//     <div>
//       <h2 style={{ color: "green" }}>Admin Dashboard</h2>

//       {/* Attendance */}
//       {Object.keys(grouped).length === 0 ? (
//         <p>No attendance records yet.</p>
//       ) : (
//         Object.entries(grouped).map(([date, list]) => (
//           <div key={date} className="date-section">
//             <h3>{date}</h3>
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Check In</th>
//                   <th>Check Out</th>
//                   <th>Hours</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {list.map(r => (
//                   <tr key={r.id}>
//                     <td>{r.name}</td>
//                     <td>{r.checkIn}</td>
//                     <td>{r.checkOut || "-"}</td>
//                     <td>{r.hours || "-"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ))
//       )}

//       {/* Leave Approvals */}
//       <div className="card">
//         <h2>Leave Approvals</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Date</th>
//               <th>Reason</th>
//               <th>Status</th>
//               <th>Action</th>
//               <th>Email Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaveRecords.map(l => (
//               <tr key={l.id}>
//                 <td>{l.name}</td>
//                 <td>{l.date}</td>
//                 <td>{l.reason}</td>
//                 <td>{l.status}</td>
//                 <td>
//                   {l.status === "Pending" && (
//                     <>
//                       <button
//                         className="approve-btn"
//                         onClick={() => handleLeave(l.id, "Approved")}
//                       >
//                         Approve
//                       </button>
//                       <button
//                         className="reject-btn"
//                         onClick={() => handleLeave(l.id, "Rejected")}
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                 </td>
//                 <td>{emailStatus[l.id] || "-"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { collection, doc, updateDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import emailjs from "@emailjs/browser";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [attendance, setAttendance] = useState([]);
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [emailStatus, setEmailStatus] = useState({});
  const navigate = useNavigate();

  // Load attendance
  useEffect(() => {
    const q = query(collection(db, "attendance"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, snap => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setAttendance(list);
    });
    return () => unsubscribe();
  }, []);

  // Load leave records
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "leaves"), snap => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setLeaveRecords(list);
    });
    return () => unsubscribe();
  }, []);

  // Group attendance by date
  const grouped = attendance.reduce((acc, r) => {
    if (!acc[r.date]) acc[r.date] = [];
    acc[r.date].push(r);
    return acc;
  }, {});

  // Handle leave approval/rejection and send email
  const handleLeave = async (leaveId, newStatus, leaveData) => {
    try {
      // Update leave status in Firestore
      const leaveRef = doc(db, "leaves", leaveId);
      await updateDoc(leaveRef, { status: newStatus });

      // Check recipient email
      if (!leaveData.email) {
        console.error("Recipient email missing", leaveData);
        setEmailStatus(prev => ({ ...prev, [leaveId]: "Email Failed ❌" }));
        alert(`Leave ${newStatus}, email failed. Recipient missing.`);
        return;
      }

      // Send email via EmailJS
      await emailjs.send(
        "service_99ddpu6",
        "template_h2hlfon",
        {
          name: leaveData.name,
          user_email: leaveData.email,
          date: leaveData.date,
          status: newStatus,
          reason: leaveData.reason
        },
        "JhLBtHLgRYc760Ikn"
      );

      setEmailStatus(prev => ({ ...prev, [leaveId]: "Email Sent ✅" }));
      alert(`Leave ${newStatus}! Email sent successfully.`);

    } catch (err) {
      console.error("Email or Firestore error:", err);
      setEmailStatus(prev => ({ ...prev, [leaveId]: "Email Failed ❌" }));
      alert(`Leave ${newStatus}, but email failed.`);
    }
  };

  return (
    <div style={{ position: "relative", padding: "0 20px" }}>
      {/* HOME ICON */}
      <FaHome
        size={34}
        title="Home"
        onClick={() => navigate("/mail")}
        style={{
          position: "absolute",
          top: "20px",
          left: "0",
          cursor: "pointer",
          color: "brown"
        }}
      />

      <h2 style={{ color: "green", textAlign: "center" }}>Admin Dashboard</h2>

      {/* Attendance Section */}
      {Object.keys(grouped).length === 0 ? (
        <p>No attendance records yet.</p>
      ) : (
        Object.entries(grouped).map(([date, list]) => (
          <div key={date} className="date-section">
            <h3>{date}</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Hours</th>
                </tr>
              </thead>
              <tbody>
                {list.map(r => (
                  <tr key={r.id}>
                    <td>{r.name}</td>
                    <td>{r.checkIn}</td>
                    <td>{r.checkOut || "-"}</td>
                    <td>{r.hours || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}

      {/* Leave Approvals Section */}
      <div className="card">
        <h2>Leave Approvals</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
              <th>Email Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRecords.map(l => (
              <tr key={l.id}>
                <td>{l.name}</td>
           <td>{l.fromDate}</td>
           <td>{l.toDate}</td>

                <td>{l.reason}</td>
                <td>{l.status}</td>
                <td>
                  {l.status === "Pending" && (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() => handleLeave(l.id, "Approved", l)}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleLeave(l.id, "Rejected", l)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
                <td>{emailStatus[l.id] || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
