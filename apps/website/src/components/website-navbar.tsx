import type { NavbarLink } from '@explainer/ui'
import { LocaleSwitcher, MobileMenu, MobileNavLinks, Navbar, getAppLinks } from '@explainer/ui'
import { useEffect, useState } from 'react'
import { useTranslations } from '../i18n/utils'

function getClientLocale(): string {
  const match = document.cookie.match(/(?:^|; )locale=([^;]*)/)
  const cookie = match?.[1]
  if (cookie === 'en' || cookie === 'fr') return cookie
  const browser = (navigator.language || '').split('-')[0]
  if (browser === 'en' || browser === 'fr') return browser
  return 'en'
}

interface WebsiteNavbarProps {
  appUrlOverrides?: Partial<Record<string, string>>
}

export function WebsiteNavbar({ appUrlOverrides }: WebsiteNavbarProps) {
  const [locale, setLocale] = useState('en')
  const [activeSection, setActiveSection] = useState('')
  const appLinks = getAppLinks('website', appUrlOverrides)
  const t = useTranslations(locale)

  useEffect(() => {
    setLocale(getClientLocale())
  }, [])

  // Scroll-spy: highlight the nav link of the section currently in view.
  useEffect(() => {
    const ids = ['experience', 'projects', 'articles', 'contact']
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (!sections.length) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        const current = ids.find((id) => visible.has(id))
        setActiveSection(current ? `#${current}` : '')
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const websiteLinks: NavbarLink[] = [
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.articles'), href: '#articles' },
    { label: t('nav.contact'), href: '#contact' },
  ]

  return (
    <Navbar
      currentApp="website"
      appUrlOverrides={appUrlOverrides}
      brandBadge
      variant="segmented"
      activePath={activeSection}
      links={websiteLinks}
      leftSlot={
        <MobileMenu>
          <MobileNavLinks
            links={websiteLinks}
            appLinks={appLinks}
          />
        </MobileMenu>
      }
      rightSlot={
        <LocaleSwitcher
          elevated
          locales={['en', 'fr']}
          currentLocale={locale}
          onLocaleChange={(newLocale) => {
            setLocale(newLocale)
            window.dispatchEvent(new CustomEvent('locale:change', { detail: { locale: newLocale } }))
          }}
        />
      }
    />
  )
}
