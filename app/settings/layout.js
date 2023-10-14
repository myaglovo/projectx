import "../globals.css";
import NavMenu from "../components/Nav/Nav";

export const metadata = {
  title: "Настройки",
  description: "Настройки проекта",
};

export default function RootLayout({ children }) {
  return (
    <div className="mt-3 mb-5">
      <NavMenu />
      {children}
    </div>
  );
}
