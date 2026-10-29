export default function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-sm font-semibold text-[#33344a]">
          {label}
        </span>
      )}

      <input
        {...props}
        className={`
          w-full rounded-xl border border-[#e5e4ef]
          bg-white px-4 py-3 text-sm text-[#202137]
          outline-none transition
          placeholder:text-[#a0a1b3]
          focus:border-[#9d95ff]
          focus:ring-4 focus:ring-[#efedff]
          ${className}
        `}
      />

      {error && (
        <span className="mt-1.5 block text-xs text-rose-600">
          {error}
        </span>
      )}
    </label>
  );
}
