"use client";

type SetQueryParamOptions = {
  replace?: boolean;
};

export default function setClientSearchParams(
  key: string,
  value?: string | null,
  options?: SetQueryParamOptions,
) {
  const url = new URL(window.location.href);

  if (!value) {
    url.searchParams.delete(key);
  } else {
    url.searchParams.set(key, value);
  }

  const nextUrl = `${url.pathname}${url.search}${url.hash}`;

  if (options?.replace ?? true) {
    window.history.replaceState(null, "", nextUrl);
  } else {
    window.history.pushState(null, "", nextUrl);
  }
}
