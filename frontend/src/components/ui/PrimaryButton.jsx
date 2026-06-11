const PrimaryButton = ({
  children,
  onClick,
  type = "button",
}) => {

  return (

    <button

      type={type}

      onClick={onClick}

      className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"

    >

      {children}

    </button>

  );

};

export default PrimaryButton;