import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { contact, copy } from '../lib/content';
import { routeHref } from '../lib/routes';
import type { Locale, Page } from '../lib/routes';
import { Arrow } from './Icons';

export function Layout({
  locale,
  page,
  children,
}: {
  locale: Locale;
  page: Page;
  children: ReactNode;
}) {
  const t = copy[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);
  const navLinks = [
    routeHref(locale, 'home', '#servicos'),
    routeHref(locale, 'projects'),
    routeHref(locale, 'home', '#sobre'),
    routeHref(locale, 'blog'),
  ];
  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a
            className="wordmark"
            href={routeHref(locale, 'home')}
            aria-label="Eric Ramos Souza — Home"
          >
            eric ramos souza<span>.</span>
          </a>
          <nav className="desktop-nav" aria-label={locale === 'pt' ? 'Principal' : 'Main'}>
            {t.nav.map((label, index) => (
              <a
                key={label}
                href={navLinks[index]}
                aria-current={
                  (index === 1 && ['projects', 'finance', 'explorer'].includes(page)) ||
                  (index === 3 && ['blog', 'article', 'first-post'].includes(page))
                    ? 'page'
                    : undefined
                }
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <div className="language-switch" aria-label={locale === 'pt' ? 'Idioma' : 'Language'}>
              <a
                lang="pt-BR"
                href={routeHref('pt', page)}
                aria-current={locale === 'pt' ? 'true' : undefined}
              >
                PT
              </a>
              <span>/</span>
              <a
                lang="en"
                href={routeHref('en', page)}
                aria-current={locale === 'en' ? 'true' : undefined}
              >
                EN
              </a>
            </div>
            <a className="button small header-contact" href="#contato">
              {t.contact}
              <Arrow diagonal />
            </a>
            <button
              ref={menuButton}
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? t.close : t.menu}
            >
              {menuOpen ? (
                '×'
              ) : (
                <>
                  <span />
                  <span />
                </>
              )}
            </button>
          </div>
        </div>
        <nav
          className="mobile-nav"
          id="mobile-menu"
          hidden={!menuOpen}
          aria-label={locale === 'pt' ? 'Menu móvel' : 'Mobile menu'}
        >
          {t.nav.map((label, index) => (
            <a href={navLinks[index]} key={label} onClick={() => setMenuOpen(false)}>
              {label}
              <Arrow />
            </a>
          ))}
          <a href="#contato" onClick={() => setMenuOpen(false)}>
            {t.contact}
            <Arrow />
          </a>
        </nav>
      </header>
      <main id="main">{children}</main>
      <section className="contact-section" id="contato" aria-labelledby="contact-title">
        <div className="container contact-inner">
          <div>
            <p className="eyebrow light">{t.contactLabel}</p>
            <h2 id="contact-title">{t.contactTitle}</h2>
            <p>{t.contactText}</p>
          </div>
          <div className="contact-links">
            <a className="button amber" href={`mailto:${contact.email}`}>
              {t.email}
              <Arrow diagonal />
            </a>
            <a className="email-link" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <div className="social-links">
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <Arrow diagonal />
              </a>
              <a href={contact.github} target="_blank" rel="noopener noreferrer">
                GitHub <Arrow diagonal />
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer className="site-footer">
        <div className="container">
          <a className="wordmark" href={routeHref(locale, 'home')}>
            eric ramos souza<span>.</span>
          </a>
          <span>{t.footer}</span>
          <span>© 2026 Eric Ramos Souza</span>
        </div>
      </footer>
    </>
  );
}
