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
    <form onSubmit={handleRegister}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
}

