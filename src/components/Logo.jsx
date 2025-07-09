import GoodFlightLogo from "../assets/GoodFlightLogo.png";
import BadFlightLogo from "../assets/BadFlightLogo.png";

export default function Logo({ variant }) {
  const boxShadow =
    variant === "good"
      ? "shadow-[0_8px_16px_rgba(0,128,0,0.4)]" // green shadow
      : variant === "bad"
      ? "shadow-[0_8px_16px_rgba(255,0,0,0.4)]" // red shadow
      : "shadow-[0_8px_16px_rgba(0,0,0,0.2)]";

  const src = variant === "good" ? GoodFlightLogo : BadFlightLogo;
  const alt = variant === "good" ? "Good Flight Logo" : "Bad Flight Logo";
  const link =
    variant === "good"
      ? "/accessible/SearchFlight"
      : "/nonaccessible/SearchFlight";

  return (
    <div className="w-[30vw] mx-[2vw]" aria-hidden="true">
      <a href={link} aria-hidden="true">
        <img
          aria-hidden="true"
          src={src}
          alt={alt}
          className={`w-full h-auto rounded-lg block ${boxShadow}`}
        />
      </a>
    </div>
  );
}
