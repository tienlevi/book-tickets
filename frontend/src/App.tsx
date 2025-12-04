import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((count) => count + 1);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Book Tickets
        </h1>

        <div className="bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl p-6 mb-6">
          <p className="text-white text-lg mb-4 text-center">
            Vite + React + TypeScript
          </p>
          <div className="bg-white rounded-lg p-4">
            <p className="text-gray-700 text-center mb-3">
              Count:{" "}
              <span className="font-bold text-2xl text-indigo-600">
                {count}
              </span>
            </p>
            <button
              onClick={handleIncrement}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              aria-label="Increment counter"
            >
              Click me
            </button>
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>TailwindCSS v4 configured</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>
              Path alias{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">@/</code>{" "}
              configured
            </span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>TypeScript enabled</span>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Edit{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">src/App.tsx</code> and
          save to test HMR
        </p>
      </div>
    </div>
  );
};

export default App;
