
export const button = (text, attrs = '') =>
  `<button class="btn" ${attrs}>${text}</button>`;

export const emptyState = (msg) =>
  `<div class="ongc-card center">${msg}</div>`;
export const html = (strings, ...values) =>
  strings.reduce((out, str, i) => out + str + serialize(values[i]), '');

function serialize(v) {
  if (v == null || v === false) return '';
  if (Array.isArray(v)) return v.map(serialize).join('');
  return String(v);
}
