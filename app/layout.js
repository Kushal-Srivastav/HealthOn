import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/nextjs"
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"]})

export const metadata = {
  title: "HealthOn - Doctors Appoointment App",
  description: "Connect with doctors anytime, anywhere.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: "dark",
      elements: {
        root: {
          position: "relative",
        },
        drawerRoot: {
          position: "fixed",
          inset: 0,
          zIndex: 999999,
        },
        drawerContent: {
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: "450px",
          zIndex: 999999,
        },
        drawerOverlay: {
          position: "fixed",
          inset: 0,
          zIndex: 999998,
        }
      }
    }}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} relative`}>
             <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
            
                 {/*header */}
                 <Header />
          <main className="min-h-screen relative">{children}</main>
          <Toaster richColors/>
          {/*footer*/}
          <footer className="bg-muted/50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-200">
              <p>Made with love by Kushal.</p>
            </div>
          </footer>
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
