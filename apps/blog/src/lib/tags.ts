export interface TagDef {
  en: string
  fr: string
}

/**
 * Central tag registry. Posts reference tags by UID (like `author`),
 * and the localized label is resolved at render time — no more FR/EN
 * duplication in frontmatter.
 */
export const tags: Record<string, TagDef> = {
  ai: { en: 'AI', fr: 'IA' },
  architecture: { en: 'Architecture', fr: 'Architecture' },
  backend: { en: 'Backend', fr: 'Backend' },
  career: { en: 'Career', fr: 'Carrière' },
  dart: { en: 'Dart', fr: 'Dart' },
  development: { en: 'Development', fr: 'Développement' },
  environment: { en: 'Environment', fr: 'Environnement' },
  ferrislabs: { en: 'FerrisLabs', fr: 'FerrisLabs' },
  hot_reload: { en: 'Hot Reload', fr: 'Hot Reload' },
  open_source: { en: 'Open Source', fr: 'Open Source' },
  opinion: { en: 'Opinion', fr: 'Opinion' },
  rust: { en: 'Rust', fr: 'Rust' },
  security: { en: 'Security', fr: 'Sécurité' },
  sovereignty: { en: 'Sovereignty', fr: 'Souveraineté' },
  tools: { en: 'Tools', fr: 'Outils' },
}

/** Resolve a tag UID to its localized label (falls back to en, then the raw uid). */
export function getTagLabel(uid: string, locale = 'en'): string {
  const tag = tags[uid]
  if (!tag) return uid
  return tag[locale as keyof TagDef] ?? tag.en ?? uid
}
