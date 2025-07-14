import React, { useState } from "react";

export default function HomePage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFiles = async () => {
    setLoading(true);
    const resp = await fetch("/.netlify/functions/list-files");
    const data = await resp.json();
    setFiles(data);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={loadFiles}>
        {loading ? "Завантаження..." : "Показати список файлів"}
      </button>
      <ul>
        {files.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </div>
  );
}
