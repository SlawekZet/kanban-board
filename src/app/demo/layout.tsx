import { Navbar } from '../ui/dashboard/Navbar';
import Sidebar from '../ui/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col w-full h-screen">
        <Navbar />
        {children}
      </div>
    </>
  );
}
