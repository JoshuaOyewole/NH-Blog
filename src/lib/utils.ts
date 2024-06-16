export function removeHtmlTags(text:String) {
    return text.replace(/<[^>]*>/g, '');
  }