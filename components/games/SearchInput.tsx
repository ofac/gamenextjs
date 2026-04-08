"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition }              from "react";
import { useState, useEffect }        from "react";

export default function SearchInput() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("search") || "");
  const [isPending, startTransition] = useTransition();

  // Debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      params.set("page", "1");

      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    }, 400); // 400ms debounce

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="relative w-80">
      <input
        type="text"
        placeholder="Search games..."
        className="input input-bordered w-full max-w-xs rounded"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* Loading */}
      {isPending && (
        <span className="loading loading-spinner loading-sm absolute right-2 top-2"></span>
      )}
    </div>
  );
}