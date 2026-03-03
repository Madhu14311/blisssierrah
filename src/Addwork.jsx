// import { useState, useEffect } from "react";

// export default function WorkPage() {
//   const [activeTab, setActiveTab] = useState("add");
//   const [work, setWork] = useState("");
//   const [fromTime, setFromTime] = useState("");
//   const [toTime, setToTime] = useState("");
//   const [duration, setDuration] = useState("");
//   const [status, setStatus] = useState("Ongoing");

//   const [mobileUsed, setMobileUsed] = useState("No");
//   const [mobileFrom, setMobileFrom] = useState("");
//   const [mobileTo, setMobileTo] = useState("");
//   const [mobileDuration, setMobileDuration] = useState("");
//   const [mobileReason, setMobileReason] = useState("");

//   const [logs, setLogs] = useState([]);

//   // Load saved logs from localStorage
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("workLogs")) || [];
//     setLogs(saved);
//   }, []);

//   // Calculate work duration
//   useEffect(() => {
//     if (fromTime && toTime) {
//       const start = new Date(`1970-01-01T${fromTime}`);
//       const end = new Date(`1970-01-01T${toTime}`);
//       const diff = (end - start) / 60000;
//       setDuration(diff > 0 ? diff + " mins" : "");
//     }
//   }, [fromTime, toTime]);

//   // Calculate mobile duration
//   useEffect(() => {
//     if (mobileFrom && mobileTo) {
//       const start = new Date(`1970-01-01T${mobileFrom}`);
//       const end = new Date(`1970-01-01T${mobileTo}`);
//       const diff = (end - start) / 60000;
//       setMobileDuration(diff > 0 ? diff + " mins" : "");
//     }
//   }, [mobileFrom, mobileTo]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const workData = {
//       work,
//       fromTime,
//       toTime,
//       duration,
//       status,
//       mobileUsed,
//       mobileFrom: mobileUsed === "Yes" ? mobileFrom : "",
//       mobileTo: mobileUsed === "Yes" ? mobileTo : "",
//       mobileDuration: mobileUsed === "Yes" ? mobileDuration : "",
//       mobileReason: mobileUsed === "Yes" ? mobileReason : "",
//       date: new Date().toLocaleDateString(),
//     };

//     const updatedLogs = [...logs, workData];
//     localStorage.setItem("workLogs", JSON.stringify(updatedLogs));
//     setLogs(updatedLogs);

//     alert("Work details added successfully ✅");

//     // Reset form
//     setWork("");
//     setFromTime("");
//     setToTime("");
//     setDuration("");
//     setStatus("Ongoing");
//     setMobileUsed("No");
//     setMobileFrom("");
//     setMobileTo("");
//     setMobileDuration("");
//     setMobileReason("");
//   };

//   return (
//     <div style={{ maxWidth: "900px", margin: "30px auto", fontFamily: "Arial, sans-serif" }}>
//       <h1 style={{ textAlign: "center", color: "#0d6efd" }}>Work Management</h1>

//       {/* Tabs */}
//       <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
//         <button
//           onClick={() => setActiveTab("add")}
//           style={{
//             padding: "10px 20px",
//             borderRadius: "6px",
//             border: activeTab === "add" ? "2px solid #0b5e23" : "1px solid #ccc",
//             backgroundColor: activeTab === "add" ? "#198754" : "#28a745",
//             color: "white",
//             cursor: "pointer",
//           }}
//         >
//           Add Work
//         </button>

//         <button
//           onClick={() => setActiveTab("saved")}
//           style={{
//             padding: "10px 20px",
//             borderRadius: "6px",
//             border: activeTab === "saved" ? "2px solid #b71c1c" : "1px solid #ccc",
//             backgroundColor: activeTab === "saved" ? "#dc3545" : "#f87171",
//             color: "white",
//             cursor: "pointer",
//           }}
//         >
//           Saved Work
//         </button>
//       </div>

//       {/* Add Work Form */}
//       {activeTab === "add" && (
//         <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//           <label>Work Description</label>
//           <textarea value={work} onChange={(e) => setWork(e.target.value)} required />

//           <label>Work Time From</label>
//           <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} required />

//           <label>Work Time To</label>
//           <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} required />

//           {duration && <p style={{ color: "#198754", fontWeight: "600" }}>Total Work Time: {duration}</p>}

//           <div style={{ padding: "10px 0" }}>
//             <label>Progress Status</label>
//             <select value={status} onChange={(e) => setStatus(e.target.value)}>
//               <option>Ongoing</option>
//               <option>Completed</option>
//             </select>
//           </div>

//           <div style={{ padding: "10px 0" }}>
//             <label>Mobile Usage</label>
//             <select value={mobileUsed} onChange={(e) => setMobileUsed(e.target.value)}>
//               <option>No</option>
//               <option>Yes</option>
//             </select>

//             {mobileUsed === "Yes" && (
//               <>
//                 <label>Mobile Usage From</label>
//                 <input type="time" value={mobileFrom} onChange={(e) => setMobileFrom(e.target.value)} />

//                 <label>Mobile Usage To</label>
//                 <input type="time" value={mobileTo} onChange={(e) => setMobileTo(e.target.value)} />

//                 {mobileDuration && <p style={{ color: "#dc3545", fontWeight: "600" }}>Mobile Usage Time: {mobileDuration}</p>}

//                 <label>Reason for Mobile Usage</label>
//                 <input
//                   type="text"
//                   value={mobileReason}
//                   onChange={(e) => setMobileReason(e.target.value)}
//                   placeholder="Enter reason"
//                   required
//                 />
//               </>
//             )}
//           </div>

//           <button
//             type="submit"
//             style={{ padding: "10px", background: "#198754", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
//           >
//             Submit Work
//           </button>
//         </form>
//       )}

//       {/* Saved Work Table */}
//       {activeTab === "saved" && (
//         <div style={{ overflowX: "auto" }}>
//           {logs.length === 0 ? (
//             <p>No work logs found.</p>
//           ) : (
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr style={{ backgroundColor: "#0d6efd", color: "white" }}>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Work</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Time</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Mobile Used</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Mobile Time</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Reason</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {logs.map((log, idx) => (
//                   <tr
//                     key={idx}
//                     style={log.mobileUsed === "Yes" ? { backgroundColor: "#fde2e2" } : {}}
//                   >
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.date}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.work}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {log.fromTime} – {log.toTime} ({log.duration})
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.status}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.mobileUsed}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {log.mobileUsed === "Yes"
//                         ? `${log.mobileFrom} – ${log.mobileTo} (${log.mobileDuration})`
//                         : "-"}
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {log.mobileUsed === "Yes" ? log.mobileReason : "-"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
// import { db } from "./firebase"; // Make sure you have firebase initialized here

// export default function WorkPage() {
  

//   const [activeTab, setActiveTab] = useState("add");
//   const [work, setWork] = useState("");
//   const [fromTime, setFromTime] = useState("");
//   const [toTime, setToTime] = useState("");
//   const [duration, setDuration] = useState("");
//   const [status, setStatus] = useState("Ongoing");

//   const [mobileUsed, setMobileUsed] = useState("No");
//   const [mobileFrom, setMobileFrom] = useState("");
//   const [mobileTo, setMobileTo] = useState("");
//   const [mobileDuration, setMobileDuration] = useState("");
//   const [mobileReason, setMobileReason] = useState("");

//   const [logs, setLogs] = useState([]);

//   // Calculate work duration
//   useEffect(() => {
//     if (fromTime && toTime) {
//       const start = new Date(`1970-01-01T${fromTime}`);
//       const end = new Date(`1970-01-01T${toTime}`);
//       const diff = (end - start) / 60000;
//       setDuration(diff > 0 ? diff + " mins" : "");
//     }
//   }, [fromTime, toTime]);

//   // Calculate mobile duration
//   useEffect(() => {
//     if (mobileFrom && mobileTo) {
//       const start = new Date(`1970-01-01T${mobileFrom}`);
//       const end = new Date(`1970-01-01T${mobileTo}`);
//       const diff = (end - start) / 60000;
//       setMobileDuration(diff > 0 ? diff + " mins" : "");
//     }
//   }, [mobileFrom, mobileTo]);

//   // Load work logs from Firebase for current user
//   const loadLogs = async () => {
//     if (!user) return;
//     const q = query(collection(db, "workLogs"), where("uid", "==", user.uid));
//     const snap = await getDocs(q);
//     const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setLogs(data);
//   };

//   useEffect(() => {
//     loadLogs();
//   }, [user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       alert("User not logged in");
//       return;
//     }

//     const workData = {
//       uid: user.uid,
//       name: user.name,
//       work,
//       fromTime,
//       toTime,
//       duration,
//       status,
//       mobileUsed,
//       mobileFrom: mobileUsed === "Yes" ? mobileFrom : "",
//       mobileTo: mobileUsed === "Yes" ? mobileTo : "",
//       mobileDuration: mobileUsed === "Yes" ? mobileDuration : "",
//       mobileReason: mobileUsed === "Yes" ? mobileReason : "",
//       date: new Date().toLocaleDateString(),
//       createdAt: Date.now()
//     };

//     try {
//       await addDoc(collection(db, "workLogs"), workData);
//       alert("Work details added successfully ✅");
//       // Reload logs
//       loadLogs();

//       // Reset form
//       setWork("");
//       setFromTime("");
//       setToTime("");
//       setDuration("");
//       setStatus("Ongoing");
//       setMobileUsed("No");
//       setMobileFrom("");
//       setMobileTo("");
//       setMobileDuration("");
//       setMobileReason("");
//     } catch (error) {
//       console.error("Error saving work log:", error);
//       alert("Failed to save work log.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "900px", margin: "30px auto", fontFamily: "Arial, sans-serif" }}>
//       <h1 style={{ textAlign: "center", color: "#0d6efd" }}>Work Management</h1>

//       {/* Tabs */}
//       <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
//         <button
//           onClick={() => setActiveTab("add")}
//           style={{
//             padding: "10px 20px",
//             borderRadius: "6px",
//             border: activeTab === "add" ? "2px solid #0b5e23" : "1px solid #ccc",
//             backgroundColor: activeTab === "add" ? "#198754" : "#28a745",
//             color: "white",
//             cursor: "pointer",
//           }}
//         >
//           Add Work
//         </button>

//         <button
//           onClick={() => setActiveTab("saved")}
//           style={{
//             padding: "10px 20px",
//             borderRadius: "6px",
//             border: activeTab === "saved" ? "2px solid #b71c1c" : "1px solid #ccc",
//             backgroundColor: activeTab === "saved" ? "#dc3545" : "#f87171",
//             color: "white",
//             cursor: "pointer",
//           }}
//         >
//           Saved Work
//         </button>
//       </div>

//       {/* Add Work Form */}
//       {activeTab === "add" && (
//         <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//           <label>Work Description</label>
//           <textarea value={work} onChange={(e) => setWork(e.target.value)} required />

//           <label>Work Time From</label>
//           <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} required />

//           <label>Work Time To</label>
//           <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} required />

//           {duration && <p style={{ color: "#198754", fontWeight: "600" }}>Total Work Time: {duration}</p>}

//           <div style={{ padding: "10px 0" }}>
//             <label>Progress Status</label>
//             <select value={status} onChange={(e) => setStatus(e.target.value)}>
//               <option>Ongoing</option>
//               <option>Completed</option>
//             </select>
//           </div>

//           <div style={{ padding: "10px 0" }}>
//             <label>Mobile Usage</label>
//             <select value={mobileUsed} onChange={(e) => setMobileUsed(e.target.value)}>
//               <option>No</option>
//               <option>Yes</option>
//             </select>

//             {mobileUsed === "Yes" && (
//               <>
//                 <label>Mobile Usage From</label>
//                 <input type="time" value={mobileFrom} onChange={(e) => setMobileFrom(e.target.value)} />

//                 <label>Mobile Usage To</label>
//                 <input type="time" value={mobileTo} onChange={(e) => setMobileTo(e.target.value)} />

//                 {mobileDuration && <p style={{ color: "#dc3545", fontWeight: "600" }}>Mobile Usage Time: {mobileDuration}</p>}

//                 <label>Reason for Mobile Usage</label>
//                 <input
//                   type="text"
//                   value={mobileReason}
//                   onChange={(e) => setMobileReason(e.target.value)}
//                   placeholder="Enter reason"
//                   required
//                 />
//               </>
//             )}
//           </div>

//           <button
//             type="submit"
//             style={{ padding: "10px", background: "#198754", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
//           >
//             Submit Work
//           </button>
//         </form>
//       )}

//       {/* Saved Work Table */}
//       {activeTab === "saved" && (
//         <div style={{ overflowX: "auto" }}>
//           {logs.length === 0 ? (
//             <p>No work logs found.</p>
//           ) : (
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr style={{ backgroundColor: "#0d6efd", color: "white" }}>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Work</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Time</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Mobile Used</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Mobile Time</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Reason</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {logs.map((log, idx) => (
//                   <tr key={idx} style={log.mobileUsed === "Yes" ? { backgroundColor: "#fde2e2" } : {}}>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.date}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.work}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {log.fromTime} – {log.toTime} ({log.duration})
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.status}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.mobileUsed}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {log.mobileUsed === "Yes"
//                         ? `${log.mobileFrom} – ${log.mobileTo} (${log.mobileDuration})`
//                         : "-"}
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {log.mobileUsed === "Yes" ? log.mobileReason : "-"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
// import { db } from "./firebase"; // Make sure Firebase is initialized

// export default function WorkPage() {
//   // ✅ Get logged-in user from localStorage
//   const user = JSON.parse(localStorage.getItem("loggedEmployee"));
//   if (!user) {
//     alert("Login required");
//     return null; // stop rendering if not logged in
//   }

//   const [activeTab, setActiveTab] = useState("add");
//   const [work, setWork] = useState("");
//   const [fromTime, setFromTime] = useState("");
//   const [toTime, setToTime] = useState("");
//   const [duration, setDuration] = useState("");
//   const [status, setStatus] = useState("Ongoing");

//   const [mobileUsed, setMobileUsed] = useState("No");
//   const [mobileFrom, setMobileFrom] = useState("");
//   const [mobileTo, setMobileTo] = useState("");
//   const [mobileDuration, setMobileDuration] = useState("");
//   const [mobileReason, setMobileReason] = useState("");

//   const [logs, setLogs] = useState([]);

//   // ✅ Calculate work duration
//   useEffect(() => {
//     if (fromTime && toTime) {
//       const start = new Date(`1970-01-01T${fromTime}`);
//       const end = new Date(`1970-01-01T${toTime}`);
//       const diff = (end - start) / 60000; // in minutes
//       setDuration(diff > 0 ? diff + " mins" : "");
//     }
//   }, [fromTime, toTime]);

//   // ✅ Calculate mobile usage duration
//   useEffect(() => {
//     if (mobileFrom && mobileTo) {
//       const start = new Date(`1970-01-01T${mobileFrom}`);
//       const end = new Date(`1970-01-01T${mobileTo}`);
//       const diff = (end - start) / 60000;
//       setMobileDuration(diff > 0 ? diff + " mins" : "");
//     }
//   }, [mobileFrom, mobileTo]);

//   // ✅ Load work logs from Firebase for current user
//   const loadLogs = async () => {
//     try {
//       const q = query(collection(db, "workLogs"), where("uid", "==", user.uid));
//       const snap = await getDocs(q);
//       const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setLogs(data);
//     } catch (err) {
//       console.error("Error loading logs:", err);
//     }
//   };

//   useEffect(() => {
//     loadLogs();
//   }, []); // run once on component mount

//   // ✅ Submit work to Firebase
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const workData = {
//       uid: user.uid,
//       name: user.name,
//       work,
//       fromTime,
//       toTime,
//       duration,
//       status,
//       mobileUsed,
//       mobileFrom: mobileUsed === "Yes" ? mobileFrom : "",
//       mobileTo: mobileUsed === "Yes" ? mobileTo : "",
//       mobileDuration: mobileUsed === "Yes" ? mobileDuration : "",
//       mobileReason: mobileUsed === "Yes" ? mobileReason : "",
//       date: new Date().toLocaleDateString(),
//       createdAt: Date.now()
//     };

//     try {
//       await addDoc(collection(db, "workLogs"), workData);
//       alert("Work details added successfully ✅");
//       loadLogs(); // reload logs

//       // reset form
//       setWork("");
//       setFromTime("");
//       setToTime("");
//       setDuration("");
//       setStatus("Ongoing");
//       setMobileUsed("No");
//       setMobileFrom("");
//       setMobileTo("");
//       setMobileDuration("");
//       setMobileReason("");
//     } catch (err) {
//       console.error("Error saving work log:", err);
//       alert("Failed to save work log.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "900px", margin: "30px auto", fontFamily: "Arial, sans-serif" }}>
//       <h1 style={{ textAlign: "center", color: "#0d6efd" }}>Work Management</h1>

//       {/* Tabs */}
//       <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
//         <button
//           onClick={() => setActiveTab("add")}
//           style={{
//             padding: "10px 20px",
//             borderRadius: "6px",
//             border: activeTab === "add" ? "2px solid #0b5e23" : "1px solid #ccc",
//             backgroundColor: activeTab === "add" ? "#198754" : "#28a745",
//             color: "white",
//             cursor: "pointer",
//           }}
//         >
//           Add Work
//         </button>

//         <button
//           onClick={() => setActiveTab("saved")}
//           style={{
//             padding: "10px 20px",
//             borderRadius: "6px",
//             border: activeTab === "saved" ? "2px solid #b71c1c" : "1px solid #ccc",
//             backgroundColor: activeTab === "saved" ? "#dc3545" : "#f87171",
//             color: "white",
//             cursor: "pointer",
//           }}
//         >
//           Saved Work
//         </button>
//       </div>

//       {/* Add Work Form */}
//       {activeTab === "add" && (
//         <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//           <label>Work Description</label>
//           <textarea value={work} onChange={(e) => setWork(e.target.value)} required />

//           <label>Work Time From</label>
//           <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} required />

//           <label>Work Time To</label>
//           <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} required />

//           {duration && <p style={{ color: "#198754", fontWeight: "600" }}>Total Work Time: {duration}</p>}

//         <div style={{ padding: "10px 0" }}>
//   <label>Progress Status</label>
//   <select
//     value={status}
//     onChange={(e) => setStatus(e.target.value)}
//     style={{
//       width: "220px",        // adjust width as needed
//       borderRadius: "6px",   // rounded corners
//       padding: "6px 10px",   // inner spacing
//       border: "1px solid #ccc", 
//       marginTop: "5px",      // space between label and select
//       fontSize: "14px",      // optional: font size
//       cursor: "pointer"      // pointer on hover
//     }}
//   >
//     <option>Ongoing</option>
//     <option>Completed</option>
//   </select>
// </div>


// <div style={{ padding: "10px 20px" }}>
//   <label>Mobile Usage</label>
//   <select
//     value={mobileUsed}
//     onChange={(e) => setMobileUsed(e.target.value)}
//     style={{
//       width: "220px",        // adjust width as needed
//       borderRadius: "6px",   // rounded corners
//       padding: "6px 10px",   // inner spacing
//       border: "1px solid #ccc",
//       marginTop: "5px",      // space between label and select
//       fontSize: "14px",      // optional: font size
//       cursor: "pointer"      // pointer on hover
//     }}
//   >
//     <option>No</option>
//     <option>Yes</option>
//   </select>



//             {mobileUsed === "Yes" && (
//               <>
//                 <label>Mobile Usage From</label>
//                 <input type="time" value={mobileFrom} onChange={(e) => setMobileFrom(e.target.value)} />

//                 <label>Mobile Usage To</label>
//                 <input type="time" value={mobileTo} onChange={(e) => setMobileTo(e.target.value)} />

//                 {mobileDuration && <p style={{ color: "#dc3545", fontWeight: "600" }}>Mobile Usage Time: {mobileDuration}</p>}

//                 <label>Reason for Mobile Usage</label>
//                 <input
//                   type="text"
//                   value={mobileReason}
//                   onChange={(e) => setMobileReason(e.target.value)}
//                   placeholder="Enter reason"
//                   required
//                 />
//               </>
//             )}
//           </div>

//           <button
//             type="submit"
//             style={{ padding: "10px", background: "#198754", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
//           >
//             Submit Work
//           </button>
//         </form>
//       )}

//       {/* Saved Work Table */}
//       {activeTab === "saved" && (
//         <div style={{ overflowX: "auto" }}>
//           {logs.length === 0 ? (
//             <p>No work logs found.</p>
//           ) : (
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr style={{ backgroundColor: "#0d6efd", color: "white" }}>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Work</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Time</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Mobile Used</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Mobile Time</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Reason</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {logs.map((log) => (
//                   <tr key={log.id} style={log.mobileUsed === "Yes" ? { backgroundColor: "#fde2e2" } : {}}>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.date}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.work}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {log.fromTime} – {log.toTime} ({log.duration})
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.status}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.mobileUsed}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {log.mobileUsed === "Yes" ? `${log.mobileFrom} – ${log.mobileTo} (${log.mobileDuration})` : "-"}
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {log.mobileUsed === "Yes" ? log.mobileReason : "-"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import { collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";
// import { db } from "./firebase"; // Make sure Firebase is initialized

// export default function WorkPage() {
//   // Get logged-in user from localStorage
//   const user = JSON.parse(localStorage.getItem("loggedEmployee"));
//   if (!user) {
//     alert("Login required");
//     return null; 
//   }

//   const [activeTab, setActiveTab] = useState("add");
//   const [work, setWork] = useState("");
//   const [fromTime, setFromTime] = useState("");
//   const [toTime, setToTime] = useState("");
//   const [duration, setDuration] = useState("");
//   const [status, setStatus] = useState("Ongoing");

//   const [mobileUsed, setMobileUsed] = useState("No");
//   const [mobileFrom, setMobileFrom] = useState("");
//   const [mobileTo, setMobileTo] = useState("");
//   const [mobileDuration, setMobileDuration] = useState("");
//   const [mobileReason, setMobileReason] = useState("");

//   const [logs, setLogs] = useState([]);

//   // Calculate work duration
//   useEffect(() => {
//     if (fromTime && toTime) {
//       const start = new Date(`1970-01-01T${fromTime}`);
//       const end = new Date(`1970-01-01T${toTime}`);
//       const diff = (end - start) / 60000; // minutes
//       setDuration(diff > 0 ? diff + " mins" : "");
//     }
//   }, [fromTime, toTime]);

//   // Calculate mobile usage duration
//   useEffect(() => {
//     if (mobileFrom && mobileTo) {
//       const start = new Date(`1970-01-01T${mobileFrom}`);
//       const end = new Date(`1970-01-01T${mobileTo}`);
//       const diff = (end - start) / 60000;
//       setMobileDuration(diff > 0 ? diff + " mins" : "");
//     }
//   }, [mobileFrom, mobileTo]);

//   // Load work logs from Firebase for current user
//   const loadLogs = async () => {
//     try {
//       const q = query(
//         collection(db, "workLogs"),
//         where("uid", "==", user.uid),
//         orderBy("createdAt", "desc")
//       );
//       const snap = await getDocs(q);
//       const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setLogs(data);
//     } catch (err) {
//       console.error("Error loading logs:", err);
//     }
//   };

//   useEffect(() => {
//     loadLogs();
//   }, []);

//   // Submit work to Firebase
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const workData = {
//       uid: user.uid,
//       name: user.name,
//       work,
//       fromTime,
//       toTime,
//       duration,
//       status,
//       mobileUsed,
//       mobileFrom: mobileUsed === "Yes" ? mobileFrom : "",
//       mobileTo: mobileUsed === "Yes" ? mobileTo : "",
//       mobileDuration: mobileUsed === "Yes" ? mobileDuration : "",
//       mobileReason: mobileUsed === "Yes" ? mobileReason : "",
//       // date: new Date().toLocaleDateString(),
//       // createdAt: Date.now()
//         date: serverTimestamp(),                 // Firestore Timestamp
//   dateKey: new Date().toISOString().split("T")[0], // 2026-01-01
//   createdAt: serverTimestamp()     
//     };

//     try {
//       await addDoc(collection(db, "workLogs"), workData);
//       alert("Work details added successfully ✅");
//       loadLogs();

//       // reset form
//       setWork("");
//       setFromTime("");
//       setToTime("");
//       setDuration("");
//       setStatus("Ongoing");
//       setMobileUsed("No");
//       setMobileFrom("");
//       setMobileTo("");
//       setMobileDuration("");
//       setMobileReason("");
//     } catch (err) {
//       console.error("Error saving work log:", err);
//       alert("Failed to save work log.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "900px", margin: "30px auto", fontFamily: "Arial, sans-serif" }}>
//       <h1 style={{ textAlign: "center", color: "#0d6efd" }}>Work Management</h1>

//       {/* Tabs */}
//       <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
//         <button
//           onClick={() => setActiveTab("add")}
//           style={{
//             padding: "10px 20px",
//             borderRadius: "6px",
//             border: activeTab === "add" ? "2px solid #0b5e23" : "1px solid #ccc",
//             backgroundColor: activeTab === "add" ? "#198754" : "#28a745",
//             color: "white",
//             cursor: "pointer",
//           }}
//         >
//           Add Work
//         </button>
//         <button
//           onClick={() => setActiveTab("saved")}
//           style={{
//             padding: "10px 20px",
//             borderRadius: "6px",
//             border: activeTab === "saved" ? "2px solid #b71c1c" : "1px solid #ccc",
//             backgroundColor: activeTab === "saved" ? "#dc3545" : "#f87171",
//             color: "white",
//             cursor: "pointer",
//           }}
//         >
//           Saved Work
//         </button>
//       </div>

//       {/* Add Work Form */}
//       {activeTab === "add" && (
//         <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//           <label>Work Description</label>
//           <textarea value={work} onChange={(e) => setWork(e.target.value)} required />

//           <label>Work Time From</label>
//           <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} required />

//           <label>Work Time To</label>
//           <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} required />

//           {duration && <p style={{ color: "#198754", fontWeight: "600" }}>Total Work Time: {duration}</p>}

//           <div style={{ padding: "10px 0" }}>
//             <label>Progress Status</label>
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               style={{ width: "220px", borderRadius: "6px", padding: "6px 10px", border: "1px solid #ccc", marginTop: "5px", fontSize: "14px", cursor: "pointer" }}
//             >
//               <option>Ongoing</option>
//               <option>Completed</option>
//             </select>
//           </div>

//           <div style={{ padding: "10px 0" }}>
//             <label>Mobile Usage</label>
//             <select
//               value={mobileUsed}
//               onChange={(e) => setMobileUsed(e.target.value)}
//               style={{ width: "220px", borderRadius: "6px", padding: "6px 10px", border: "1px solid #ccc", marginTop: "5px", fontSize: "14px", cursor: "pointer" }}
//             >
//               <option>No</option>
//               <option>Yes</option>
//             </select>

//             {mobileUsed === "Yes" && (
//               <>
//                 <label>Mobile Usage From</label>
//                 <input type="time" value={mobileFrom} onChange={(e) => setMobileFrom(e.target.value)} />

//                 <label>Mobile Usage To</label>
//                 <input type="time" value={mobileTo} onChange={(e) => setMobileTo(e.target.value)} />

//                 {mobileDuration && <p style={{ color: "#dc3545", fontWeight: "600" }}>Mobile Usage Time: {mobileDuration}</p>}

//                 <label>Reason for Mobile Usage</label>
//                 <input
//                   type="text"
//                   value={mobileReason}
//                   onChange={(e) => setMobileReason(e.target.value)}
//                   placeholder="Enter reason"
//                   required
//                 />
//               </>
//             )}
//           </div>

//           <button
//             type="submit"
//             style={{ padding: "10px", background: "#198754", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
//           >
//             Submit Work
//           </button>
//         </form>
//       )}

//       {/* Saved Work Table */}
//       {activeTab === "saved" && (
//         <div style={{ overflowX: "auto" }}>
//           {logs.length === 0 ? (
//             <p>No work logs found.</p>
//           ) : (
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr style={{ backgroundColor: "#0d6efd", color: "white" }}>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Employee</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Work</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Time</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Mobile Used</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Mobile Time</th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>Reason</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {logs.map((log) => (
//                   <tr key={log.id} style={log.mobileUsed === "Yes" ? { backgroundColor: "#fde2e2" } : {}}>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.name || log.uid || "-"}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.date}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.work}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.fromTime} – {log.toTime} ({log.duration})</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.status}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.mobileUsed}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {log.mobileUsed === "Yes" ? `${log.mobileFrom} – ${log.mobileTo} (${log.mobileDuration})` : "-"}
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {log.mobileUsed === "Yes" ? log.mobileReason : "-"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase"; // Make sure Firebase is initialized

export default function WorkPage() {
  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("loggedEmployee"));
  if (!user) {
    alert("Login required");
    return null; 
  }

  const [activeTab, setActiveTab] = useState("add");
  const [work, setWork] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("Ongoing");

  const [mobileUsed, setMobileUsed] = useState("No");
  const [mobileFrom, setMobileFrom] = useState("");
  const [mobileTo, setMobileTo] = useState("");
  const [mobileDuration, setMobileDuration] = useState("");
  const [mobileReason, setMobileReason] = useState("");

  const [logs, setLogs] = useState([]);

  // Calculate work duration
  useEffect(() => {
    if (fromTime && toTime) {
      const start = new Date(`1970-01-01T${fromTime}`);
      const end = new Date(`1970-01-01T${toTime}`);
      const diff = (end - start) / 60000; // minutes
      setDuration(diff > 0 ? diff + " mins" : "");
    }
  }, [fromTime, toTime]);

  // Calculate mobile usage duration
  useEffect(() => {
    if (mobileFrom && mobileTo) {
      const start = new Date(`1970-01-01T${mobileFrom}`);
      const end = new Date(`1970-01-01T${mobileTo}`);
      const diff = (end - start) / 60000;
      setMobileDuration(diff > 0 ? diff + " mins" : "");
    }
  }, [mobileFrom, mobileTo]);

  // Load work logs from Firebase for current user
  const loadLogs = async () => {
    try {
      const q = query(
        collection(db, "workLogs"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(data);
    } catch (err) {
      console.error("Error loading logs:", err);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  // Submit work to Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    const workData = {
      uid: user.uid,
      name: user.name,
      work,
      fromTime,
      toTime,
      duration,
      status,
      mobileUsed,
      mobileFrom: mobileUsed === "Yes" ? mobileFrom : "",
      mobileTo: mobileUsed === "Yes" ? mobileTo : "",
      mobileDuration: mobileUsed === "Yes" ? mobileDuration : "",
      mobileReason: mobileUsed === "Yes" ? mobileReason : "",
      // date: serverTimestamp(),                 // Firestore Timestamp
      // dateKey: new Date().toISOString().split("T")[0], // YYYY-MM-DD fallback
      // createdAt: serverTimestamp()
      date: new Date().toLocaleDateString(),
      createdAt: Date.now()
    };

    try {
      await addDoc(collection(db, "workLogs"), workData);
      alert("Work details added successfully ✅");
      loadLogs();

      // reset form
      setWork("");
      setFromTime("");
      setToTime("");
      setDuration("");
      setStatus("Ongoing");
      setMobileUsed("No");
      setMobileFrom("");
      setMobileTo("");
      setMobileDuration("");
      setMobileReason("");
    } catch (err) {
      console.error("Error saving work log:", err);
      alert("Failed to save work log.");
    }
  };

  // Helper to format Firestore timestamp safely
  const formatDate = (timestamp, fallback) => {
    if (timestamp?.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString("en-IN");
    }
    if (fallback) {
      return new Date(fallback).toLocaleDateString("en-IN");
    }
    return "-";
  };

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#0d6efd" }}>Work Management</h1>

      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("add")}
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            border: activeTab === "add" ? "2px solid #0b5e23" : "1px solid #ccc",
            backgroundColor: activeTab === "add" ? "#198754" : "#28a745",
            color: "white",
            cursor: "pointer",
          }}
        >
          Add Work
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            border: activeTab === "saved" ? "2px solid #b71c1c" : "1px solid #ccc",
            backgroundColor: activeTab === "saved" ? "#dc3545" : "#f87171",
            color: "white",
            cursor: "pointer",
          }}
        >
          Saved Work
        </button>
      </div>

      {/* Add Work Form */}
      {activeTab === "add" && (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <label>Work Description</label>
          <textarea value={work} onChange={(e) => setWork(e.target.value)} required />

          <label>Work Time From</label>
          <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} required />

          <label>Work Time To</label>
          <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} required />

          {duration && <p style={{ color: "#198754", fontWeight: "600" }}>Total Work Time: {duration}</p>}

          <div style={{ padding: "10px 0" }}>
            <label>Progress Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ width: "220px", borderRadius: "6px", padding: "6px 10px", border: "1px solid #ccc", marginTop: "5px", fontSize: "14px", cursor: "pointer" }}
            >
              <option>Ongoing</option>
              <option>Completed</option>
            </select>
          </div>

          <div style={{ padding: "10px 0" }}>
            <label>Mobile Usage</label>
            <select
              value={mobileUsed}
              onChange={(e) => setMobileUsed(e.target.value)}
              style={{ width: "220px", borderRadius: "6px", padding: "6px 10px", border: "1px solid #ccc", marginTop: "5px", fontSize: "14px", cursor: "pointer" }}
            >
              <option>No</option>
              <option>Yes</option>
            </select>

            {mobileUsed === "Yes" && (
              <>
                <label>Mobile Usage From</label>
                <input type="time" value={mobileFrom} onChange={(e) => setMobileFrom(e.target.value)} />

                <label>Mobile Usage To</label>
                <input type="time" value={mobileTo} onChange={(e) => setMobileTo(e.target.value)} />

                {mobileDuration && <p style={{ color: "#dc3545", fontWeight: "600" }}>Mobile Usage Time: {mobileDuration}</p>}

                <label>Reason for Mobile Usage</label>
                <input
                  type="text"
                  value={mobileReason}
                  onChange={(e) => setMobileReason(e.target.value)}
                  placeholder="Enter reason"
                  required
                />
              </>
            )}
          </div>

          <button
            type="submit"
            style={{ padding: "10px", background: "#198754", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            Submit Work
          </button>
        </form>
      )}

      {/* Saved Work Table */}
      {activeTab === "saved" && (
        <div style={{ overflowX: "auto" }}>
          {logs.length === 0 ? (
            <p>No work logs found.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#0d6efd", color: "white" }}>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Employee</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Work</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Time</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Mobile Used</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Mobile Time</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Reason</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} style={log.mobileUsed === "Yes" ? { backgroundColor: "#fde2e2" } : {}}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.name || log.uid || "-"}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {formatDate(log.date, log.dateKey)}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.work}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.fromTime} – {log.toTime} ({log.duration})</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.status}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{log.mobileUsed}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {log.mobileUsed === "Yes" ? `${log.mobileFrom} – ${log.mobileTo} (${log.mobileDuration})` : "-"}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {log.mobileUsed === "Yes" ? log.mobileReason : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
