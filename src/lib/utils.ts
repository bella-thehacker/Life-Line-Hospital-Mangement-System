// src/lib/utils.ts
/**
 * Small helper to merge conditional classNames.
 * Works like a tiny version of `classnames` or `clsx`.
 */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}
