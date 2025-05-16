import Logo from "../components/Logo";
export const LogoVariant = {
  GOOD: "good",
  BAD: "bad",
};
export default function WelcomePage() {
  return (
    <div className="flex flex-col p-5 h-screen">
      <div className="flex-1">
        <h1 className="text-center">Choose One of the Brand</h1>
      </div>

      <div className="flex flex-9 justify-center p-5 h-[90vh]">
        <Logo variant={LogoVariant.GOOD} />
        <Logo variant={LogoVariant.BAD} />
      </div>
    </div>
  );
}
