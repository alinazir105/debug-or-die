import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const styles = {
    container: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "black",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      position: "absolute",
      top: "35%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: "4rem",
      fontWeight: "800",
      color: "red",
      textTransform: "uppercase",
      letterSpacing: "0.3em",
      zIndex: 10,
    },
    startButton: {
      position: "absolute",
      top: "55%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "red",
      color: "white",
      padding: "20px 40px",
      fontSize: "1.5rem",
      fontWeight: "800",
      textTransform: "uppercase",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(255, 0, 0, 0.5)",
      transition: "all 0.2s ease-in-out",
      textDecoration: "none",
      border: "none",
      cursor: "pointer",
    },
    startButtonHover: {
      backgroundColor: "darkred",
      boxShadow: "0px 6px 12px rgba(255, 0, 0, 0.6)",
    },
    warningMessage: {
      position: "absolute",
      top: "72%", // Positioned further below the start button
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "75%",
      textAlign: "center",
      color: "red",
      fontSize: "1.2rem",
      fontFamily: "monospace",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Debug or Die</h1>
      <button
        style={styles.startButton}
        onMouseOver={(e) => (e.target.style.backgroundColor = "darkred")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "red")}
        onClick={() => navigate("/homepage")}
      >
        Start Game
      </button>
      <p style={styles.warningMessage}>
        ⚠ WARNING: Pressing Start will begin the competition! 90-minute
        countdown starts immediately.
      </p>
    </div>
  );
};

export default MainPage;
