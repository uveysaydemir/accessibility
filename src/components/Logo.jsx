import GoodFlightLogo from "../assets/GoodFlightLogo.png";
import BadFlightLogo from "../assets/BadFlightLogo.png";

export default function Logo({ variant }) {
  const boxShadow =
    variant === "good"
      ? "shadow-[0_8px_16px_rgba(0,128,0,0.4)]"
      : variant === "bad"
      ? "shadow-[0_8px_16px_rgba(255,0,0,0.4)]"
      : "shadow-[0_8px_16px_rgba(0,0,0,0.2)]";

  const src = variant === "good" ? GoodFlightLogo : BadFlightLogo;
  const alt = variant === "good" ? "Good Flight Logo" : "Bad Flight Logo";
  const link =
    variant === "good"
      ? "/accessible/SearchFlight"
      : "/nonaccessible/SearchFlight";

  const ariaLabel =
    variant === "good"
      ? "Good Flight'a erişmek için tıklayın"
      : "Bad Flight'a erişmek için tıklayın";

  return (
    <div className="w-full sm:w-[48vw] max-w-md mx-auto sm:mx-[2vw]">
      <a href={link} aria-label={ariaLabel}>
        <img
          src={src}
          alt={alt}
          className={`w-full h-auto rounded-lg block ${boxShadow}`}
        />
      </a>
    </div>
  );
}
