import Logo from "../components/Logo";
export const LogoVariant = {
  GOOD: "good",
  BAD: "bad",
};
export default function WelcomePage() {
  return (
    <div className="flex flex-col p-5 h-screen w-full max-w-screen-xl mx-auto">
      <div className="flex-1">
        <h1 className="text-center">
          Aşağıdaki hava yollarından birini seçiniz
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 p-5 flex-9 h-[90vh]">
        <div>
          <Logo variant={LogoVariant.GOOD} />
        </div>
        <div>
          <Logo variant={LogoVariant.BAD} />
        </div>
      </div>
    </div>
  );
}
