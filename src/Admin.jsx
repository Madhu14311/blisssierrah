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
import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "./firebase";

export default function AdminDashboard() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const q = query(
        collection(db, "attendance"),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);
      const list = snap.docs.map(d => ({
        id: d.id,
        ...d.data()
      }));

      setAttendance(list);
    };

    fetchAttendance();
  }, []);

  // 🔹 GROUP BY DATE
  const grouped = attendance.reduce((acc, r) => {
    if (!acc[r.date]) acc[r.date] = [];
    acc[r.date].push(r);
    return acc;
  }, {});

  return (
    <div>
      <h2>Admin Attendance Panel</h2>

      {Object.keys(grouped).length === 0 ? (
        <p>No records</p>
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
                    <td>{r.username }</td>
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
    </div>
  );
}
