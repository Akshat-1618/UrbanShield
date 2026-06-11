import Navbar from "./Navbar";

const DashboardLayout = ({
  children,
}) => {

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <main className="mx-auto max-w-7xl p-8">

        {children}

      </main>

    </div>

  );

};

export default DashboardLayout;