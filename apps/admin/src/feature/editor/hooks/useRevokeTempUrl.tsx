import { useEffect } from "react";

export default function useRevokeTempUrl(imgUrl: string | null) {
  useEffect(() => {
    return () => {
      if (imgUrl) URL.revokeObjectURL(imgUrl);
    };
  }, [imgUrl]);
}
