import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar or Branding Section */}
      <div
        style={{
          flex: 1,
          background: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>FYB App</h1>
      </div>

      {/* Main Content (Outlet renders the nested pages) */}
      <div
        style={{
          flex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
