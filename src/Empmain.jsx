import "./Empmain.css";
import { useNavigate } from "react-router-dom";
import logoImg from "./assets/image.png";

function Empmain() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
          <div className="bubbles">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>

      <header className="header">
        <img className="img" src={logoImg} alt="logo" />
        <h1 className="logo">HRMS Portal</h1>
        <button className="madhu" onClick={() => navigate("/adminlogin")}>
          Logout
        </button>
      </header>

      <section className="hero">
        <h2 className="hero-title">Welcome to HR Management System</h2>
        <p className="hero-text">
          Manage attendance, payroll, work logs, and more.
        </p>
      </section>

      <div className="card-container">
        <div className="icard1" onClick={() => navigate("/attendance")}>
          <h3 className="card-title">Attendance</h3>
          <p className="card-text">Check in and checkout daily.</p>
        </div>

        <div className="icard2" onClick={() => navigate("/addwork")}>
          <h3 className="card-title">Work Log Update</h3>
          <p className="card-text">Update your work details daily.</p>
        </div>

        <div className="icard3" onClick={() => navigate("/employeepayroll")}>
          <h3 className="card-title">Payroll & Reports</h3>
          <p className="card-text">
            Generate payroll and reports quickly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Empmain;