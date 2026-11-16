import { defaultConfig, t, type SiteConfig } from '@explainer/config'
import { Icon } from '@iconify/react'
import * as React from 'react'

export interface FooterProps {
  config?: SiteConfig
  locale?: string
  appUrlOverrides?: Partial<Record<string, string>>
  /** 'cells': full-bleed rows and a centre divider, meant to sit inside a framed page grid */
  variant?: 'default' | 'cells'
}

function detectLocale(config: SiteConfig): string {
  if (typeof document === 'undefined') return config.defaultLocale

  const match = document.cookie.match(/(?:^|; )locale=([^;]*)/)
  if (match?.[1] && config.locales.includes(match[1])) return match[1]

  const browser = (navigator.language || '').split('-')[0]
  if (config.locales.includes(browser)) return browser

  return config.defaultLocale
}

export function Footer({ config = defaultConfig, locale: localeProp, appUrlOverrides, variant = 'default' }: FooterProps) {
  const cells = variant === 'cells'
  const [locale, setLocale] = React.useState(localeProp ?? config.defaultLocale)

  React.useEffect(() => {
    if (!localeProp) {
      setLocale(detectLocale(config))
    }
  }, [localeProp, config])

  const blogUrl = appUrlOverrides?.blog ?? '/'
  const { footer, name } = config

  const copyrightText = t(locale, footer.copyright).replace('{year}', String(new Date().getFullYear()))
  const builtWithParts = t(locale, footer.builtWith).split('{icon}')

  return (
    <footer className={cells ? '' : 'mt-12 border-t pt-12 pb-8'}>
      <div className={cells ? 'grid grid-cols-1 sm:grid-cols-2' : 'grid grid-cols-1 gap-10 sm:grid-cols-[1.6fr_1fr]'}>
        {/* Brand */}
        <div className={cells ? 'border-b p-6 sm:border-b-0 sm:p-8' : undefined}>
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-[4px] border border-primary/20 bg-primary/10 text-primary">
              <Icon icon="lucide:book-open" className="size-5" />
            </span>
            <span className="text-base font-bold text-foreground">{name}</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t(locale, footer.description)}
          </p>
        </div>

        {/* Resources */}
        <div className={cells ? 'p-6 sm:border-l sm:p-8' : undefined}>
          <h4 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            {t(locale, footer.columns.resources)}
          </h4>
          <ul className="space-y-1">
            {footer.links.resources.map((link) => {
              const href = link.appId === 'blog' ? blogUrl : link.href
              return (
                <li key={link.label}>
                  <a
                    href={href}
                    className="inline-flex items-center gap-1.5 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {t(locale, link.label)}
                    {link.external && <Icon icon="lucide:arrow-up-right" className="size-3.5" />}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className={`flex flex-col items-center justify-between gap-2 border-t font-mono text-[11px] uppercase tracking-[0.04em] text-muted-foreground sm:flex-row ${cells ? 'px-6 py-4 sm:px-8' : 'mt-10 pt-6'}`}
      >
        <p>{copyrightText}</p>
        <p className="flex items-center gap-1.5">
          {builtWithParts[0]} ❤️ {builtWithParts[1]}
        </p>
      </div>
    </footer>
  )
}
