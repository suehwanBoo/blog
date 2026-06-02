import { useEffect, useState } from "react";

export default function useObjectUrl(blob: Blob | null | undefined) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!blob) {
      setUrl(null);
    }
    if (blob) {
      const url = URL.createObjectURL(blob);
      setUrl(url);
    }
  }, [blob]);

  return url;
}
