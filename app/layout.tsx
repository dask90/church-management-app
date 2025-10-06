import "./../styles/globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "../contexts/AuthContext";
import { SidebarProvider } from "../contexts/SidebarContext";
import { MembersProvider } from "../contexts/MembersContext";
import { EventsProvider } from "../contexts/EventsContext";
import { DonationsProvider } from "../contexts/DonationsContext";
import { SermonsProvider } from "../contexts/SermonsContext";
import { AttendanceProvider } from "../contexts/AttendanceContext"; // ✅ add this

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Church Management App",
  description:
    "Complete church management system built with Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SidebarProvider>
            <MembersProvider>
              <EventsProvider>
                <DonationsProvider>
                  <SermonsProvider>
                    <AttendanceProvider>
                      {" "}
                      {/* ✅ wrap here */}
                      {children}
                    </AttendanceProvider>
                  </SermonsProvider>
                </DonationsProvider>
              </EventsProvider>
            </MembersProvider>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
