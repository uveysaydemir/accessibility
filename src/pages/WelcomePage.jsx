import Logo from "../components/Logo";
export const LogoVariant = {
  GOOD: "good",
  BAD: "bad",
};
export default function WelcomePage() {
  return (
    <div className="flex flex-col p-5 h-screen">
      <div className="flex-1">
        <h1 className="text-center">
          Aşağıdaki hava yollarından birini seçiniz
        </h1>
      </div>

      <div className="flex flex-9 justify-center p-5 h-[90vh]">
        <div aria-label="Good Flight'a erişmek için tıklayın">
          <Logo variant={LogoVariant.GOOD} />
        </div>
        <div aria-label="Bad Flight'a erişmek için tıklayın">
          <Logo variant={LogoVariant.BAD} />
        </div>
      </div>
    </div>
  );
}
