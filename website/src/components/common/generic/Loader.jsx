import React from "react";

const Loader = React.memo(() => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#050505",
        textAlign: "center",
        zIndex: 9999,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
      }}
    >
      <div className="loader-container" style={{ position: "relative" }}>
        <div
          style={{
            width: "4rem",
            height: "4rem",
            border: "2px solid rgba(255, 107, 0, 0.1)",
            borderTop: "2px solid #ff6b00",
            borderRadius: "50%",
            animation: "spin 1s cubic-bezier(0.16, 1, 0.3, 1) infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "10px",
            fontWeight: "900",
            color: "#ff6b00",
            letterSpacing: "0.2em",
          }}
        >
          IOM
        </div>
      </div>
      <p
        style={{
          marginTop: "20px",
          color: "#666",
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
        }}
      >
        KAIAOM
      </p>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
});

Loader.displayName = "Loader";

export default Loader;