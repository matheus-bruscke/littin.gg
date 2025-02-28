export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function deslugify(text: string) {
  return text
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}
