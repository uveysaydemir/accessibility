import Logo from "../components/Logo";
export const LogoVariant = {
  GOOD: "good",
  BAD: "bad",
};
export default function WelcomePage() {
  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <div style={{ flex: 1 }}>
        <h1 style={{ textAlign: "center" }}>Choose One of the Brand</h1>
      </div>

      <div
        className="logo-container"
        style={{
          display: "flex",
          flex: 9,
          justifyContent: "center",
          padding: "20px",
          height: "90vh",
        }}
      >
        <Logo variant={LogoVariant.GOOD} />
        <Logo variant={LogoVariant.BAD} />
      </div>
    </div>
  );
}
