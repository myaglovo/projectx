import "./globals.css";
import Header from "./components/Header/Header";
import { Inter } from "next/font/google";
import Provider from "./components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Проект",
  description: "Проект",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <Header />
          <div className="container-sm mt-3 mb-5">{children}</div>
        </body>
      </Provider>
    </html>
  );
}
