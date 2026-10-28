import Footer from "@/components/Footer";
import GsapEffects from "@/components/GsapEffects";
import Header from "@/components/Header";
import { CartProvider } from "@/components/cart/CartProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dastoor | Restaurant",
  description: "Good food, good tradition. Dastoor Restaurant in Gujranwala.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-white font-sans text-[#17172f] antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <GsapEffects />
        </CartProvider>
      </body>
    </html>
  );
}
