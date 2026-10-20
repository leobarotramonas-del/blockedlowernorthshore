/** Chicago headline style for editorial headings; body copy and FAQ questions stay sentence case. */
export function titleCase(value: string): string {
  const minor = new Set('a an the and but or nor for so yet as at by in of on per to via vs from into onto upon with within without over under between through throughout about above across after against along amid among around before behind below beneath beside beyond despite down during except inside near off outside past round since than till toward towards until versus'.split(' '));
  const words = value.match(/[A-Za-z0-9]+(?:['’][A-Za-z]+)?/g) ?? [];
  let index = 0;
  return value.replace(/[A-Za-z0-9]+(?:['’][A-Za-z]+)?/g, (word, offset) => {
    const current = index++;
    if (/^[A-Z0-9]{2,}$/.test(word) || /[a-z][A-Z]/.test(word)) return word;
    const lower = word.toLowerCase();
    const sentenceStart = /[.!?:]\s*$/.test(value.slice(0, offset));
    if (current > 0 && current < words.length - 1 && !sentenceStart && minor.has(lower)) return lower;
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });
}
