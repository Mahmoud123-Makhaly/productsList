/**
 *
 * @param {string} text - The text to be sliced
 * @param  {number} [max=50] - The maximum length of the sliced text
 * @returns {string} The sliced text
 */
export function textSlicer(text: string, max: number = 50) {
  if (text.length > max) return `${text.slice(0, max)}...`;
  return text;
}
