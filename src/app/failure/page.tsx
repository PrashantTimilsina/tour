function Failure() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 px-4 mt-10 text-xl">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center max-w-xl w-full">
        {/* Animated Cross Icon */}
        <div className="flex justify-center mb-6">
          <svg
            className="w-20 h-20 text-red-500 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-100"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>

        <p className="text-gray-700">
          Your transaction could not be completed. Please try again or contact
          support if the issue persists.
        </p>
      </div>
    </div>
  );
}

export default Failure;
