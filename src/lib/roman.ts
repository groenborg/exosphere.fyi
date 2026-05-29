const ROMAN_MAP: ReadonlyArray<readonly [string, number]> = [
  ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
  ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
  ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1],
];

export function toRoman(num: number): string {
  let n = Math.max(0, Math.floor(num));
  let out = '';
  for (const [letter, value] of ROMAN_MAP) {
    while (n >= value) {
      out += letter;
      n -= value;
    }
  }
  return out;
}
