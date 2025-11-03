import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 gap-6">
      <h1 className="text-4xl font-extrabold text-blue-700">
        Duke Blue Devils Digest
      </h1>
      <Link 
        href="/dashboard"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}