import GoodFlightLogo from "../assets/GoodFlightLogo.png";
import BadFlightLogo from "../assets/BadFlightLogo.png";

export default function Logo({ variant }) {
  const boxShadow =
    variant === "good"
      ? "0 8px 16px rgba(0, 128, 0, 0.4)" // green shadow
      : variant === "bad"
      ? "0 8px 16px rgba(255, 0, 0, 0.4)" // red shadow
      : "0 8px 16px rgba(0, 0, 0, 0.2)";

  const src = variant === "good" ? GoodFlightLogo : BadFlightLogo;
  const alt = variant === "good" ? "Good Flight Logo" : "Bad Flight Logo";
  const link =
    variant === "good"
      ? "/accessible/SearchFlight"
      : "/nonaccessible/SearchFlight";

  return (
    <div style={{ width: "30vw", margin: "0 2vw" }}>
      <a href={link}>
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "10px",
            boxShadow,
            display: "block",
          }}
        />
      </a>
    </div>
  );
}
