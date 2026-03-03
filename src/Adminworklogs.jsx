// import { useState, useEffect } from "react";
// import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
// import { db } from "./firebase";

// export default function AdminWorkLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const q = query(collection(db, "workLogs"), orderBy("createdAt", "desc"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setLogs(data);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <div style={{ maxWidth: "1000px", margin: "30px auto", fontFamily: "Arial, sans-serif" }}>
//       <div style={{
//         backgroundColor: "#03142cff",
//         color: "white",
//         padding: "15px 20px",
//         borderRadius: "8px",
//         marginBottom: "20px"
//       }}>
//         <h2>All Employee Work Logs</h2>
//       </div>

//       {loading ? (
//         <p>Loading logs...</p>
//       ) : logs.length === 0 ? (
//         <p>No work logs found.</p>
//       ) : (
//         <div style={{ overflowX: "auto" }}>
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr style={{ backgroundColor: "#096156ff", color: "white" }}>
//                 <th style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>Employee Name</th>
//                 <th style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>Date</th>
//                 <th style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>Work</th>
//                 <th style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>Time</th>
//                 <th style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>Status</th>
//                 <th style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>Mobile Used</th>
//                 <th style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>Mobile Time</th>
//                 <th style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>Reason</th>
//               </tr>
//             </thead>
//             <tbody>
//               {logs.map((log, idx) => (
//                 <tr key={idx} style={log.mobileUsed === "Yes" ? { backgroundColor: "#547d76fc", color:"white" } : {}}>
//                   {/* <td style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>{log.employeeName}</td> */}
//                   <td style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>
//   {log.name || log.uid || "-"}
// </td>

//                   <td style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>{log.date}</td>
//                   <td style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>{log.work}</td>
//                   <td style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>
//                     {log.fromTime} – {log.toTime} ({log.duration})
//                   </td>
//                   <td style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>{log.status}</td>
//                   <td style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>{log.mobileUsed}</td>
//                   <td style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>
//                     {log.mobileUsed === "Yes" ? `${log.mobileFrom} – ${log.mobileTo} (${log.mobileDuration})` : "-"}
//                   </td>
//                   <td style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>
//                     {log.mobileUsed === "Yes" ? log.mobileReason : "-"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
// import { db } from "./firebase";
// import { FaHome } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export default function AdminWorkLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const q = query(collection(db, "workLogs"), orderBy("createdAt", "desc"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setLogs(data);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);
//     const grouped = attendance.reduce((acc, r) => {
//     if (!acc[r.date]) acc[r.date] = [];
//     acc[r.date].push(r);
//     return acc;
//   }, {});


//   return (
//     <div style={{ maxWidth: "1000px", margin: "15px auto", fontFamily: "Arial, sans-serif", position: "relative" }}>

//       {/* LEFT SIDE HOME ICON */}
//       <FaHome
//         size={34}
//         title="Home"
//         onClick={() => navigate("/mail")}
//         style={{
//           position: "absolute",
//           top: "18px",
//           left: "-40px",
//           cursor: "pointer",
//           color: "brown",
//           zIndex: 1000
//         }}
//       />
    

//       <div style={{
//         backgroundColor: "#03142cff",
//         color: "white",
//         padding: "15px 20px",
//         borderRadius: "8px",
//         marginBottom: "20px"
//       }}>
//         <h2>All Employee Work Logs</h2>
//       </div>

//       {loading ? (
//         <p>Loading logs...</p>
//       ) : logs.length === 0 ? (
//         <p>No work logs found.</p>
//       ) : (
//         <div style={{ overflowX: "auto" }}>
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr style={{ backgroundColor: "#096156ff", color: "white" }}>
//                 <th style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>Employee Name</th>
//                 <th style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>Date</th>
//                 <th style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>Work</th>
//                 <th style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>Time</th>
//                 <th style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>Status</th>
//                 <th style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>Mobile Used</th>
//                 <th style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>Mobile Time</th>
//                 <th style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>Reason</th>
//               </tr>
//             </thead>
//             <tbody>
//               {logs.map((log, idx) => (
//                 <tr key={idx} style={log.mobileUsed === "Yes" ? { backgroundColor: "#547d76fc", color:"white" } : {}}>
//                   <td style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>
//                     {log.name || log.uid || "-"}
//                   </td>
//                   <td style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>{log.date}</td>
//                   <td style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>{log.work}</td>
//                   <td style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>
//                     {log.fromTime} – {log.toTime} ({log.duration})
//                   </td>
//                   <td style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>{log.status}</td>
//                   <td style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>{log.mobileUsed}</td>
//                   <td style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>
//                     {log.mobileUsed === "Yes"
//                       ? `${log.mobileFrom} – ${log.mobileTo} (${log.mobileDuration})`
//                       : "-"}
//                   </td>
//                   <td style={{ border: "1px solid #0e0d0dff", padding: "8px" }}>
//                     {log.mobileUsed === "Yes" ? log.mobileReason : "-"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
// import { db } from "./firebase";
// import { FaHome } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export default function AdminWorkLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   /* ================= FIRESTORE LISTENER ================= */
//   useEffect(() => {
//     const q = query(
//       collection(db, "workLogs"),
//       orderBy("createdAt", "desc")
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setLogs(data);        // ✅ FIXED
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   /* ================= GROUP BY DATE ================= */
//   const grouped = logs.reduce((acc, r) => {
//     if (!acc[r.date]) acc[r.date] = [];
//     acc[r.date].push(r);
//     return acc;
//   }, {});

//   /* ================= COMMON STYLES ================= */
//   const th = {
//     border: "1px solid #0e0d0dff",
//     padding: "8px",
//     backgroundColor: "#096156ff",
//     color: "white"
//   };

//   const td = {
//     border: "1px solid #0e0d0dff",
//     padding: "8px"
//   };

//   /* ================= UI ================= */
//   return (
//     <div
//       style={{
//         maxWidth: "1000px",
//         margin: "15px auto",
//         fontFamily: "Arial, sans-serif",
//         position: "relative"
//       }}
//     >
//       {/* HOME ICON */}
//       <FaHome
//         size={34}
//         title="Home"
//         onClick={() => navigate("/mail")}
//         style={{
//           position: "absolute",
//           top: "18px",
//           left: "-40px",
//           cursor: "pointer",
//           color: "brown"
//         }}
//       />

//       {/* HEADER */}
//       <div
//         style={{
//           backgroundColor: "#03142cff",
//           color: "white",
//           padding: "15px 20px",
//           borderRadius: "8px",
//           marginBottom: "20px"
//         }}
//       >
//         <h2>All Employee Work Logs</h2>
//       </div>

//       {/* CONTENT */}
//       {loading ? (
//         <p>Loading logs...</p>
//       ) : Object.keys(grouped).length === 0 ? (
//         <p>No work logs found.</p>
//       ) : (
//         Object.keys(grouped).map((date) => (
//           <div key={date} style={{ marginBottom: "30px" }}>
//             {/* DATE HEADER */}
//             <div
//               style={{
//                 backgroundColor: "#1f3c88",
//                 color: "white",
//                 padding: "10px 15px",
//                 borderRadius: "6px 6px 0 0",
//                 fontWeight: "bold"
//               }}
//             >
//               📅 {date}
//             </div>

//             {/* DATE-WISE TABLE */}
//             <div style={{ overflowX: "auto" }}>
//               <table
//                 style={{
//                   width: "100%",
//                   borderCollapse: "collapse"
//                 }}
//               >
//                 <thead>
//                   <tr>
//                     <th style={th}>Employee Name</th>
//                     <th style={th}>Work</th>
//                     <th style={th}>Time</th>
//                     <th style={th}>Status</th>
//                     <th style={th}>Mobile Used</th>
//                     <th style={th}>Mobile Time</th>
//                     <th style={th}>Reason</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {grouped[date].map((log) => (
//                     <tr
//                       key={log.id}
//                       style={
//                         log.mobileUsed === "Yes"
//                           ? { backgroundColor: "#547d76fc", color: "white" }
//                           : {}
//                       }
//                     >
//                       <td style={td}>{log.name || log.uid || "-"}</td>
//                       <td style={td}>{log.work}</td>
//                       <td style={td}>
//                         {log.fromTime} – {log.toTime} ({log.duration})
//                       </td>
//                       <td style={td}>{log.status}</td>
//                       <td style={td}>{log.mobileUsed}</td>
//                       <td style={td}>
//                         {log.mobileUsed === "Yes"
//                           ? `${log.mobileFrom} – ${log.mobileTo} (${log.mobileDuration})`
//                           : "-"}
//                       </td>
//                       <td style={td}>
//                         {log.mobileUsed === "Yes"
//                           ? log.mobileReason
//                           : "-"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
// import { db } from "./firebase";
// import { FaHome } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export default function AdminWorkLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   /* ================= FIRESTORE LISTENER ================= */
//   useEffect(() => {
//     const q = query(
//       collection(db, "workLogs"),
//       orderBy("createdAt", "desc")
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setLogs(data);
//       setLoading(false); // ✅ FIXED
//     });

//     return () => unsubscribe();
//   }, []);

//   /* ================= GROUP BY DATE ================= */
//   const grouped = logs.reduce((acc, r) => {
//     if (!acc[r.date]) acc[r.date] = [];
//     acc[r.date].push(r);
//     return acc;
//   }, {});

//   /* ================= COMMON STYLES ================= */
//   const th = {
//     border: "1px solid #0e0d0dff",
//     padding: "8px",
//     backgroundColor: "#096156ff",
//     color: "white",
//   };

//   const td = {
//     border: "1px solid #0e0d0dff",
//     padding: "8px",
//   };

//   /* ================= UI ================= */
//   return (
//     <div
//       style={{
//         maxWidth: "1000px",
//         margin: "15px auto",
//         fontFamily: "Arial, sans-serif",
//         position: "relative",
//       }}
//     >
//       {/* HOME ICON */}
//       <FaHome
//         size={34}
//         title="Home"
//         onClick={() => navigate("/mail")}
//         style={{
//           position: "absolute",
//           top: "18px",
//           left: "-40px",
//           cursor: "pointer",
//           color: "brown",
//         }}
//       />

//       {/* HEADER */}
//       <div
//         style={{
//           backgroundColor: "#03142cff",
//           color: "white",
//           padding: "15px 20px",
//           borderRadius: "8px",
//           marginBottom: "20px",
//         }}
//       >
//         <h2>All Employee Work Logs</h2>
//       </div>

//       {/* CONTENT */}
//       {loading ? (
//         <p>Loading logs...</p>
//       ) : Object.keys(grouped).length === 0 ? (
//         <p>No work logs found.</p>
//       ) : (
//         Object.keys(grouped).map((date) => (
//           <div key={date} style={{ marginBottom: "30px" }}>
//             {/* DATE HEADER */}
//             <div
//               style={{
//                 backgroundColor: "#1f3c88",
//                 color: "white",
//                 padding: "10px 15px",
//                 borderRadius: "6px 6px 0 0",
//                 fontWeight: "bold",
//               }}
//             >
//               📅  {date?.seconds
//   ? new Date(date.seconds * 1000).toLocaleDateString()
//   : date}

//             </div>

//             {/* DATE-WISE TABLE */}
//             <div style={{ overflowX: "auto" }}>
//               <table
//                 style={{
//                   width: "100%",
//                   borderCollapse: "collapse",
//                 }}
//               >
//                 <thead>
//                   <tr>
//                     <th style={th}>Employee Name</th>
//                     <th style={th}>Work</th>
//                     <th style={th}>Time</th>
//                     <th style={th}>Status</th>
//                     <th style={th}>Mobile Used</th>
//                     <th style={th}>Mobile Time</th>
//                     <th style={th}>Reason</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {grouped[date].map((log) => (
//                     <tr
//                       key={log.id}
//                       style={
//                         log.mobileUsed === "Yes"
//                           ? { backgroundColor: "#547d76fc", color: "white" }
//                           : {}
//                       }
//                     >
//                       <td style={td}>{log.name || log.uid || "-"}</td>
//                       <td style={td}>{log.work}</td>
//                       <td style={td}>
//                         {log.fromTime} – {log.toTime} ({log.duration})
//                       </td>
//                       <td style={td}>{log.status}</td>
//                       <td style={td}>{log.mobileUsed}</td>

//                       {/* ✅ FIXED HERE */}
//                       <td style={td}>
//                         {log.mobileUsed === "Yes"
//                           ? `${log.mobileFrom} – ${log.mobileTo} (${log.mobileDuration})`
//                           : "-"}
//                       </td>

//                       <td style={td}>
//                         {log.mobileUsed === "Yes"
//                           ? log.mobileReason
//                           : "-"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
// import { db } from "./firebase";
// import { FaHome } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export default function AdminWorkLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   /* ================= FIRESTORE LISTENER ================= */
//   useEffect(() => {
//     const q = query(collection(db, "workLogs"), orderBy("createdAt", "desc"));

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setLogs(data);
//         setLoading(false);
//       },
//       (err) => {
//         console.error("Firestore error:", err);
//         setError("Failed to load work logs.");
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   /* ================= GROUP BY DATE ================= */
//   const grouped = logs.reduce((acc, r) => {
//     // Convert Firestore timestamp to readable date string
//     const key = r.date?.seconds
//       ? new Date(r.date.seconds * 1000).toLocaleDateString()
//       : r.date || "Unknown Date";

//     if (!acc[key]) acc[key] = [];
//     acc[key].push(r);
//     return acc;
//   }, {});

//   /* ================= COMMON STYLES ================= */
//   const th = {
//     border: "1px solid #0e0d0dff",
//     padding: "8px",
//     backgroundColor: "#096156ff",
//     color: "white",
//     textAlign: "left",
//   };

//   const td = {
//     border: "1px solid #0e0d0dff",
//     padding: "8px",
//   };

//   /* ================= UI ================= */
//   return (
//     <div
//       style={{
//         maxWidth: "1000px",
//         margin: "20px auto",
//         fontFamily: "Arial, sans-serif",
//         position: "relative",
//         padding: "0 10px",
//       }}
//     >
//       {/* HOME ICON */}
//       <FaHome
//         size={34}
//         title="Home"
//         onClick={() => navigate("/mail")}
//         style={{
//           position: "absolute",
//           top: "18px",
//           left: "-40px",
//           cursor: "pointer",
//           color: "brown",
//         }}
//       />

//       {/* HEADER */}
//       <div
//         style={{
//           backgroundColor: "#03142cff",
//           color: "white",
//           padding: "15px 20px",
//           borderRadius: "8px",
//           marginBottom: "20px",
//         }}
//       >
//         <h2>All Employee Work Logs</h2>
//       </div>

//       {/* CONTENT */}
//       {loading ? (
//         <p>Loading logs...</p>
//       ) : error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : Object.keys(grouped).length === 0 ? (
//         <p>No work logs found.</p>
//       ) : (
//         Object.keys(grouped).map((date) => (
//           <div key={date} style={{ marginBottom: "30px" }}>
//             {/* DATE HEADER */}
//             <div
//               style={{
//                 backgroundColor: "#1f3c88",
//                 color: "white",
//                 padding: "10px 15px",
//                 borderRadius: "6px 6px 0 0",
//                 fontWeight: "bold",
//               }}
//             >
//               📅 {date}
//             </div>

//             {/* DATE-WISE TABLE */}
//             <div style={{ overflowX: "auto" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                   <tr>
//                     <th style={th}>Employee Name</th>
//                     <th style={th}>Work</th>
//                     <th style={th}>Time</th>
//                     <th style={th}>Status</th>
//                     <th style={th}>Mobile Used</th>
//                     <th style={th}>Mobile Time</th>
//                     <th style={th}>Reason</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {grouped[date].map((log) => (
//                     <tr
//                       key={log.id}
//                       style={
//                         log.mobileUsed === "Yes"
//                           ? { backgroundColor: "#547d76fc", color: "white" }
//                           : {}
//                       }
//                     >
//                       <td style={td}>{log.name || log.uid || "-"}</td>
//                       <td style={td}>{log.work || "-"}</td>
//                       <td style={td}>
//                         {log.fromTime && log.toTime
//                           ? `${log.fromTime} – ${log.toTime} (${log.duration || "-"})`
//                           : "-"}
//                       </td>
//                       <td style={td}>{log.status || "-"}</td>
//                       <td style={td}>{log.mobileUsed || "-"}</td>
//                       <td style={td}>
//                         {log.mobileUsed === "Yes"
//                           ? `${log.mobileFrom || "-"} – ${log.mobileTo || "-"} (${log.mobileDuration || "-"})`
//                           : "-"}
//                       </td>
//                       <td style={td}>
//                         {log.mobileUsed === "Yes" ? log.mobileReason || "-" : "-"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import { collection, onSnapshot, query, orderBy, doc, getDoc } from "firebase/firestore";
// import { db } from "./firebase";
// import { FaHome } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export default function AdminWorkLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   /* ================= FIRESTORE LISTENER ================= */
//   useEffect(() => {
//     const q = query(collection(db, "workLogs"), orderBy("createdAt", "desc"));

//     const unsubscribe = onSnapshot(
//       q,
//       async (snapshot) => {
//         const data = await Promise.all(
//           snapshot.docs.map(async (docSnap) => {
//             const logData = docSnap.data();
//             let name = logData.name;

//             // If name missing, fetch from users collection
//             if (!name && logData.uid) {
//               try {
//                 const userDoc = await getDoc(doc(db, "users", logData.uid));
//                 if (userDoc.exists()) {
//                   name = userDoc.data().name || "Unknown";
//                 } else {
//                   name = "Unknown";
//                 }
//               } catch (err) {
//                 console.error("Error fetching user name:", err);
//                 name = "Unknown";
//               }
//             }

//             return {
//               id: docSnap.id,
//               ...logData,
//               name: name || "Unknown",
//             };
//           })
//         );

//         setLogs(data);
//         setLoading(false);
//       },
//       (err) => {
//         console.error("Firestore error:", err);
//         setError("Failed to load work logs.");
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   /* ================= GROUP BY DATE ================= */
//   // const grouped = logs.reduce((acc, r) => {
//   //   const key = r.date?.seconds
//   //     ? new Date(r.date.seconds * 1000).toLocaleDateString()
//   //     : r.date || "Unknown Date";

//   //   if (!acc[key]) acc[key] = [];
//   //   acc[key].push(r);
//   //   return acc;
//   // }, {});
//   const formatDate = (date) => {
//   if (!date) return "Unknown Date";

//   // Firestore Timestamp
//   if (date.seconds) {
//     return new Date(date.seconds * 1000)
//       .toISOString()
//       .split("T")[0]; // YYYY-MM-DD
//   }

//   // Already a string → normalize
//   const parsed = new Date(date);
//   if (!isNaN(parsed)) {
//     return parsed.toISOString().split("T")[0];
//   }

//   return "Unknown Date";
// };

// const grouped = logs.reduce((acc, r) => {
//   const key = formatDate(r.date);
//   if (!acc[key]) acc[key] = [];
//   acc[key].push(r);
//   return acc;
// }, {});


//   /* ================= COMMON STYLES ================= */
//   const th = {
//     border: "1px solid #0e0d0dff",
//     padding: "8px",
//     backgroundColor: "#096156ff",
//     color: "white",
//     textAlign: "left",
//   };

//   const td = {
//     border: "1px solid #0e0d0dff",
//     padding: "8px",
//   };

//   /* ================= UI ================= */
//   return (
//     <div
//       style={{
//         maxWidth: "1000px",
//         margin: "20px auto",
//         fontFamily: "Arial, sans-serif",
//         position: "relative",
//         padding: "0 10px",
//       }}
//     >
//       {/* HOME ICON */}
//       <FaHome
//         size={34}
//         title="Home"
//         onClick={() => navigate("/mail")}
//         style={{
//           position: "absolute",
//           top: "18px",
//           left: "-40px",
//           cursor: "pointer",
//           color: "brown",
//         }}
//       />

//       {/* HEADER */}
//       <div
//         style={{
//           backgroundColor: "#03142cff",
//           color: "white",
//           padding: "15px 20px",
//           borderRadius: "8px",
//           marginBottom: "20px",
//         }}
//       >
//         <h2>All Employee Work Logs</h2>
//       </div>

//       {/* CONTENT */}
//       {loading ? (
//         <p>Loading logs...</p>
//       ) : error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : Object.keys(grouped).length === 0 ? (
//         <p>No work logs found.</p>
//       ) : (
//         // Object.keys(grouped).map((date) => (
//           Object.keys(grouped)
//   .sort((a, b) => new Date(b) - new Date(a)) // 🔥 latest first
//   .map((date) => (

//           <div key={date} style={{ marginBottom: "30px" }}>
//             {/* DATE HEADER */}
//             <div
//               style={{
//                 backgroundColor: "#1f3c88",
//                 color: "white",
//                 padding: "10px 15px",
//                 borderRadius: "6px 6px 0 0",
//                 fontWeight: "bold",
//               }}
//             >
//               📅 {date}
//             </div>

//             {/* DATE-WISE TABLE */}
//             <div style={{ overflowX: "auto" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                   <tr>
//                     <th style={th}>Employee Name</th>
//                     <th style={th}>Work</th>
//                     <th style={th}>Time</th>
//                     <th style={th}>Status</th>
//                     <th style={th}>Mobile Used</th>
//                     <th style={th}>Mobile Time</th>
//                     <th style={th}>Reason</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {grouped[date].map((log) => (
//                     <tr
//                       key={log.id}
//                       style={
//                         log.mobileUsed === "Yes"
//                           ? { backgroundColor: "#547d76fc", color: "white" }
//                           : {}
//                       }
//                     >
//                       <td style={td}>{log.name}</td>
//                       <td style={td}>{log.work || "-"}</td>
//                       <td style={td}>
//                         {log.fromTime && log.toTime
//                           ? `${log.fromTime} – ${log.toTime} (${log.duration || "-"})`
//                           : "-"}
//                       </td>
//                       <td style={td}>{log.status || "-"}</td>
//                       <td style={td}>{log.mobileUsed || "-"}</td>
//                       <td style={td}>
//                         {log.mobileUsed === "Yes"
//                           ? `${log.mobileFrom || "-"} – ${log.mobileTo || "-"} (${log.mobileDuration || "-"})`
//                           : "-"}
//                       </td>
//                       <td style={td}>
//                         {log.mobileUsed === "Yes" ? log.mobileReason || "-" : "-"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { collection, onSnapshot, query, orderBy, doc, getDoc } from "firebase/firestore";
// import { db } from "./firebase";
// import { FaHome } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export default function AdminWorkLogs() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   /* ================= FIRESTORE LISTENER ================= */
//   useEffect(() => {
//     const q = query(collection(db, "workLogs"), orderBy("createdAt", "desc"));

//     const unsubscribe = onSnapshot(
//       q,
//       async (snapshot) => {
//         const data = await Promise.all(
//           snapshot.docs.map(async (docSnap) => {
//             const logData = docSnap.data();
//             let name = logData.name;

//             // If name missing, fetch from users collection
//             if (!name && logData.uid) {
//               try {
//                 const userDoc = await getDoc(doc(db, "users", logData.uid));
//                 if (userDoc.exists()) {
//                   name = userDoc.data().name || "Unknown";
//                 } else {
//                   name = "Unknown";
//                 }
//               } catch (err) {
//                 console.error("Error fetching user name:", err);
//                 name = "Unknown";
//               }
//             }

//             return {
//               id: docSnap.id,
//               ...logData,
//               name: name || "Unknown",
//             };
//           })
//         );

//         setLogs(data);
//         setLoading(false);
//       },
//       (err) => {
//         console.error("Firestore error:", err);
//         setError("Failed to load work logs.");
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   /* ================= DATE NORMALIZATION ================= */
//   const normalizeDate = (date) => {
//     if (!date) return "Unknown Date";

//     let d;

//     // Firestore Timestamp
//     if (date?.seconds) {
//       d = new Date(date.seconds * 1000);
//     }
//     // String date
//     else if (typeof date === "string") {
//       if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
//         // DD/MM/YYYY format
//         const [dd, mm, yyyy] = date.split("/");
//         d = new Date(`${yyyy}-${mm}-${dd}T00:00:00`);
//       } else {
//         d = new Date(date);
//       }
//     }
//     // JS Date object
//     else if (date instanceof Date) {
//       d = date;
//     }

//     if (!d || isNaN(d)) return "Unknown Date";

//     const year = d.getFullYear();
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const day = String(d.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   // Display date in Indian format
//   const displayDate = (iso) => {
//     if (!iso || iso === "Unknown Date") return iso;
//     const d = new Date(iso);
//     return d.toLocaleDateString("en-IN"); // DD/MM/YYYY
//   };

//   /* ================= GROUP BY DATE ================= */
//   const grouped = logs.reduce((acc, log) => {
//     const key = normalizeDate(log.date);
//     if (!acc[key]) acc[key] = [];
//     acc[key].push(log);
//     return acc;
//   }, {});

//   /* ================= COMMON STYLES ================= */
//   const th = {
//     border: "1px solid #0e0d0dff",
//     padding: "8px",
//     backgroundColor: "#096156ff",
//     color: "white",
//     textAlign: "left",
//   };

//   const td = {
//     border: "1px solid #0e0d0dff",
//     padding: "8px",
//   };

//   /* ================= UI ================= */
//   return (
//     <div
//       style={{
//         maxWidth: "1000px",
//         margin: "20px auto",
//         fontFamily: "Arial, sans-serif",
//         position: "relative",
//         padding: "0 10px",
//       }}
//     >
//       {/* HOME ICON */}
//       <FaHome
//         size={34}
//         title="Home"
//         onClick={() => navigate("/mail")}
//         style={{
//           position: "absolute",
//           top: "18px",
//           left: "-40px",
//           cursor: "pointer",
//           color: "brown",
//         }}
//       />

//       {/* HEADER */}
//       <div
//         style={{
//           backgroundColor: "#03142cff",
//           color: "white",
//           padding: "15px 20px",
//           borderRadius: "8px",
//           marginBottom: "20px",
//         }}
//       >
//         <h2>All Employee Work Logs</h2>
//       </div>

//       {/* CONTENT */}
//       {loading ? (
//         <p>Loading logs...</p>
//       ) : error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : Object.keys(grouped).length === 0 ? (
//         <p>No work logs found.</p>
//       ) : (
//         Object.keys(grouped)
//           .filter((d) => d !== "Unknown Date")
//           .sort((a, b) => new Date(b) - new Date(a)) // latest first
//           .map((date) => (
//             <div key={date} style={{ marginBottom: "30px" }}>
//               {/* DATE HEADER */}
//               <div
//                 style={{
//                   backgroundColor: "#1f3c88",
//                   color: "white",
//                   padding: "10px 15px",
//                   borderRadius: "6px 6px 0 0",
//                   fontWeight: "bold",
//                 }}
//               >
//                 📅 {displayDate(date)}
//               </div>

//               {/* DATE-WISE TABLE */}
//               <div style={{ overflowX: "auto" }}>
//                 <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                   <thead>
//                     <tr>
//                       <th style={th}>Employee Name</th>
//                       <th style={th}>Work</th>
//                       <th style={th}>Time</th>
//                       <th style={th}>Status</th>
//                       <th style={th}>Mobile Used</th>
//                       <th style={th}>Mobile Time</th>
//                       <th style={th}>Reason</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {grouped[date].map((log) => (
//                       <tr
//                         key={log.id}
//                         style={
//                           log.mobileUsed === "Yes"
//                             ? { backgroundColor: "#547d76fc", color: "white" }
//                             : {}
//                         }
//                       >
//                         <td style={td}>{log.name}</td>
//                         <td style={td}>{log.work || "-"}</td>
//                         <td style={td}>
//                           {log.fromTime && log.toTime
//                             ? `${log.fromTime} – ${log.toTime} (${log.duration || "-"})`
//                             : "-"}
//                         </td>
//                         <td style={td}>{log.status || "-"}</td>
//                         <td style={td}>{log.mobileUsed || "-"}</td>
//                         <td style={td}>
//                           {log.mobileUsed === "Yes"
//                             ? `${log.mobileFrom || "-"} – ${log.mobileTo || "-"} (${log.mobileDuration || "-"})`
//                             : "-"}
//                         </td>
//                         <td style={td}>
//                           {log.mobileUsed === "Yes" ? log.mobileReason || "-" : "-"}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           ))
//       )}
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminWorkLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /* ================= FIRESTORE LISTENER ================= */
  useEffect(() => {
    const q = query(
      collection(db, "workLogs"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const loadData = async () => {
          try {
            const data = await Promise.all(
              snapshot.docs.map(async (docSnap) => {
                const logData = docSnap.data();
                let name = logData.name;

                if (!name && logData.uid) {
                  try {
                    const userDoc = await getDoc(
                      doc(db, "users", logData.uid)
                    );
                    name = userDoc.exists()
                      ? userDoc.data().name || "Unknown"
                      : "Unknown";
                  } catch {
                    name = "Unknown";
                  }
                }

                return {
                  id: docSnap.id,
                  ...logData,
                  name: name || "Unknown",
                };
              })
            );

            setLogs(data);
            setLoading(false);
          } catch (err) {
            console.error(err);
            setError("Failed to load work logs.");
            setLoading(false);
          }
        };

        loadData();
      },
      (err) => {
        console.error("Firestore error:", err);
        setError("Failed to load work logs.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  /* ================= DATE NORMALIZATION ================= */
  const normalizeDate = (date) => {
    if (!date) return "Unknown Date";

    let d;

    // Firestore Timestamp
    if (date?.toDate) {
      d = date.toDate();
    }
    // String date
    else if (typeof date === "string") {
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
        const [dd, mm, yyyy] = date.split("/");
        d = new Date(`${yyyy}-${mm}-${dd}`);
      } else {
        d = new Date(date);
      }
    }
    // JS Date
    else if (date instanceof Date) {
      d = date;
    }

    if (!d || isNaN(d.getTime())) return "Unknown Date";

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const displayDate = (iso) => {
    if (!iso || iso === "Unknown Date") return iso;
    return new Date(iso).toLocaleDateString("en-IN");
  };

  /* ================= GROUP BY DATE ================= */
  const grouped = logs.reduce((acc, log) => {
    const key = normalizeDate(log.date);
    if (!acc[key]) acc[key] = [];
    acc[key].push(log);
    return acc;
  }, {});

  /* ================= STYLES ================= */
  const th = {
    border: "1px solid #0e0d0dff",
    padding: "8px",
    backgroundColor: "#096156ff",
    color: "white",
    textAlign: "left",
  };

  const td = {
    border: "1px solid #0e0d0dff",
    padding: "8px",
  };

  /* ================= UI ================= */
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        padding: "0 10px",
      }}
    >
      <FaHome
        size={34}
        title="Home"
        onClick={() => navigate("/mail")}
        style={{
          position: "absolute",
          top: "18px",
          left: "-40px",
          cursor: "pointer",
          color: "brown",
        }}
      />

      <div
        style={{
          backgroundColor: "#03142cff",
          color: "white",
          padding: "15px 20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2>All Employee Work Logs</h2>
      </div>

      {loading ? (
        <p>Loading logs...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : Object.keys(grouped).length === 0 ? (
        <p>No work logs found.</p>
      ) : (
        Object.keys(grouped)
          .filter((d) => d !== "Unknown Date")
          .sort((a, b) => new Date(b) - new Date(a))
          .map((date) => (
            <div key={date} style={{ marginBottom: "30px" }}>
              <div
                style={{
                  backgroundColor: "#1f3c88",
                  color: "white",
                  padding: "10px 15px",
                  borderRadius: "6px 6px 0 0",
                  fontWeight: "bold",
                }}
              >
                📅 {displayDate(date)}
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={th}>Employee Name</th>
                      <th style={th}>Work</th>
                      <th style={th}>Time</th>
                      <th style={th}>Status</th>
                      <th style={th}>Mobile Used</th>
                      <th style={th}>Mobile Time</th>
                      <th style={th}>Reason</th>
                    </tr>
                  </thead>

                  <tbody>
                    {grouped[date].map((log) => (
                      <tr
                        key={log.id}
                        style={
                          log.mobileUsed === "Yes"
                            ? { backgroundColor: "#547d76fc", color: "white" }
                            : {}
                        }
                      >
                        <td style={td}>{log.name}</td>
                        <td style={td}>{log.work || "-"}</td>
                        <td style={td}>
                          {log.fromTime && log.toTime
                            ? `${log.fromTime} – ${log.toTime} (${log.duration || "-"})`
                            : "-"}
                        </td>
                        <td style={td}>{log.status || "-"}</td>
                        <td style={td}>{log.mobileUsed || "-"}</td>
                        <td style={td}>
                          {log.mobileUsed === "Yes"
                            ? `${log.mobileFrom || "-"} – ${log.mobileTo || "-"} (${log.mobileDuration || "-"})`
                            : "-"}
                        </td>
                        <td style={td}>
                          {log.mobileUsed === "Yes"
                            ? log.mobileReason || "-"
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
      )}
    </div>
  );
}
