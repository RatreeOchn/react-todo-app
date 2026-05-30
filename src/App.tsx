import { message } from '@/test-alias';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Todo App</h1>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export default App;
