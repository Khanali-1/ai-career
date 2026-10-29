
export default function Loader({ label = "Loading..." }) {
  return (
    <div
      role="status"
      className="flex items-center justify-center gap-3 py-8 text-sm text-[#77788e]"
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#dedbff] border-t-[#6255ee]" />

      {label}
    </div>
  );
}
