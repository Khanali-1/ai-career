import { useRef, useState } from "react";
import { FileUp, FileText, X } from "lucide-react";

export default function ResumeUploader({ onFileSelect }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

 //  const selectedFile = 

  function handleFile(selectedFile) {
    if (!selectedFile) return;


    // type check if in end .pdf is ? 

    const isPdf =
      selectedFile.type === "application/pdf" ||
      selectedFile.name.toLowerCase().endsWith(".pdf");


      // if .pdgf is not available

    if (!isPdf) {
      setError("Please select a PDF file.");
      return;
    }

    // if size is much bigger

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be 5 MB or less.");
      return;
    }

    setError("");
    setFile(selectedFile);
    onFileSelect?.(selectedFile);
  }


  // to delete selected or delete file

  function removeFile() {
    setFile(null);
    setError("");
    onFileSelect?.(null);

    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          handleFile(event.dataTransfer.files?.[0]);
        }}
        className="flex w-full flex-col items-center rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/40 px-5 py-10 text-center hover:bg-violet-50"
      >
        <FileUp size={32} className="text-violet-600" />
        <span className="mt-4 font-bold text-gray-800">Upload your resume</span>
        <span className="mt-2 text-sm text-gray-500">
          Click to select or drag your PDF here
        </span>
        <span className="mt-1 text-xs text-gray-400">PDF only · Max 5 MB</span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}

      {file && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border p-3">
          <FileText className="text-violet-600" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{file.name}</p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button type="button" onClick={removeFile} aria-label="Remove file">
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}