export function removeHtmlTags(text: String, characters: number) {
  const refined = text.replace(/<[^>]*>/g, '');
  return refined.slice(0, characters)
}