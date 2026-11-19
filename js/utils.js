export function getImagePath(path) {
  return `./welcome-bonus-assets/public${path}`;
}

export function highlightLastWords(text, count = 2) {
  const words = text.split(" ");
  const highlighted = words.splice(-count, count);

  return `${words.join(" ")} <span class="pinkText">${highlighted.join(" ")}</span>`;
}
