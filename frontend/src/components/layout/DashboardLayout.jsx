import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;