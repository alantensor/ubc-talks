"use client";

export default function SearchBar({
  onChange,
}: {
  onChange: (e: any) => void;
}) {
  return (
    <div className="relative w-full my-5">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <svg
          className="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 18l5-5m0 0l-5-5m5 5H4"
          ></path>
        </svg>
      </span>
      <input
        type="text"
        placeholder="Search..."
        className="block w-full bg-sky-700 text-white rounded-full pl-10 pr-4 py-1.5 focus:outline-none"
        onChange={onChange}
      />
    </div>
  );
}
