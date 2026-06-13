export {
  defineI18n,
  defineTranslations,
} from 'fumadocs-core/dist/i18n/index.js'

export function renderTranslation(
  input: unknown,
  replacements: Record<string, string | number | boolean> = {},
): string {
  const text =
    input === undefined || input === null ? '' : String(input)

  return text.replace(/\{(\w+)\}/g, (_, key: string) => {
    if (!(key in replacements)) {
      return `{${key}}`
    }

    return String(replacements[key])
  })
}
