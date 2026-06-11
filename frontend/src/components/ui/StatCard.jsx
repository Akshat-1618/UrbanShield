const StatCard = ({
  title,
  value,
}) => {

  return (

    <div className="rounded-xl bg-white p-6 shadow">

      <h3 className="text-gray-500 text-sm">

        {title}

      </h3>

      <h1 className="mt-2 text-3xl font-bold">

        {value}

      </h1>

    </div>

  );

};

export default StatCard;