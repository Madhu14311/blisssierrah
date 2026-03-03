// import { useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   sendEmailVerification
// } from "firebase/auth";
// import { auth } from "./firebase";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async () => {
//     e.preventDefault();
//     if (!name || !email || !password) return alert("fill all fields")
//     try {
//       const res = await createUserWithEmailAndPassword(
//         auth,

//         email,
//         password
//       );

//       await sendEmailVerification(res.user);

//       alert("Verification email sent. Please verify before login");

//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <input type="name"
//       placeholder="enter your name"
//       onChange={(e)=> setEmail(e.target.value)}
      
//       ></input>

//       <input
//         type="email"
//         placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// }


// import { useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   sendEmailVerification
// } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "./firebase";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       const res = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       // 🔥 SAVE EMPLOYEE PROFILE
//       await setDoc(doc(db, "employees", res.user.uid), {
//         uid: res.user.uid,
//         name,
//         email,
//         role: "employee",
//         createdAt: new Date()
//       });

//       await sendEmailVerification(res.user);

//       alert("Registration successful. Verify email before login.");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleRegister}>
//       <h2>Register</h2>

//       <input
//         type="text"
//         placeholder="Full Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />

//       <button type="submit">Register</button>
//     </form>
//   );
// }
// 
import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // 1. Create user
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      // 2. SAVE NAME WITH UID in Firestore
      await setDoc(doc(db, "employees", uid), {
        uid,
        name,
        email,
        createdAt: serverTimestamp()
      });

      // 3. Send email verification
      await sendEmailVerification(userCred.user);

      setMessage("Registration successful! Please verify your email. Waiting for verification...");

      // 4. Poll or check verification
      const checkEmailVerified = setInterval(async () => {
        await userCred.user.reload(); // Refresh user data
        if (userCred.user.emailVerified) {
          clearInterval(checkEmailVerified);

          // 5. Auto-login
          const loggedInUser = await signInWithEmailAndPassword(auth, email, password);
          localStorage.setItem("loggedEmployee", JSON.stringify({
            uid: loggedInUser.user.uid,
            name,
            email
          }));

          setMessage("Email verified! You are now logged in.");
        }
      }, 3000); // Check every 3 seconds

      // Optional: reset form
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#797b7ec8"
      }}
    >
      <div
        style={{
          backgroundColor: "#c4d5eec8",
          padding: "40px 30px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
          width: "350px",
          textAlign: "center"
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#ee3bdcff" }}>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            style={{
              width: "100%",
              padding: "12px 15px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none"
            }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={{
              width: "100%",
              padding: "12px 15px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none"
            }}
          />
          <div style={{ position: "relative", margin: "10px 0" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                margin:"10px 0",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "16px",
                outline: "none",
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "18px",
                color: "#888",
                userSelect: "none",
              }}
            >
              {showPassword ? "🙈🤦‍♂️" : "👁️"}
            </span>
          </div>
          <button
            type="submit"
            style={{
              width: "70%",
              padding: "10px",
              margin:"15px",
              marginTop: "15px",
              backgroundColor: "#22c55e",
              color: "#fff",
              border: "none",
              borderRadius: "9px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              fontSize:"19px",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#16a34a")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#22c55e")}
          >
            Register
          </button>
        </form>
        {message && (
          <p style={{ marginTop: "15px", color: "#16a34a", fontWeight: "500" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}