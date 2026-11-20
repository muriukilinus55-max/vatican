import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd(), "src/i18n/dictionaries");
const locales = ["en", "it", "sw"];
const dictionaries = Object.fromEntries(
  locales.map((locale) => [
    locale,
    JSON.parse(fs.readFileSync(path.join(root, `${locale}.json`), "utf8")),
  ]),
);

const referenceKeys = Object.keys(dictionaries.en).sort();
const errors = [];

for (const locale of locales) {
  if (!/^[a-z]{2}$/.test(locale)) errors.push(`Invalid locale code: ${locale}`);
  const keys = Object.keys(dictionaries[locale]).sort();
  for (const key of referenceKeys) {
    if (!Object.hasOwn(dictionaries[locale], key)) {
      errors.push(`${locale}: missing key "${key}"`);
    } else if (typeof dictionaries[locale][key] !== "string" || !dictionaries[locale][key].trim()) {
      errors.push(`${locale}: empty or invalid key "${key}"`);
    }
  }
  for (const key of keys) {
    if (!referenceKeys.includes(key)) errors.push(`${locale}: unexpected key "${key}"`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${locales.length} dictionaries with ${referenceKeys.length} shared keys.`);
