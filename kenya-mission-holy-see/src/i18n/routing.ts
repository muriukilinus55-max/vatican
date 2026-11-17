import { locales, type Locale } from "@/config/locales";

export function localizedPath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && locales.includes(segments[0] as Locale)) {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }
  return `/${segments.join("/")}`;
}

export function fallbackLocalePath(
  pathname: string,
  targetLocale: Locale,
  validPaths: Set<string>,
): string {
  const candidate = localizedPath(pathname, targetLocale);
  return validPaths.has(candidate) ? candidate : `/${targetLocale}`;
}
