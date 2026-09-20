import { copy } from '../lib/content';
import { routeHref } from '../lib/routes';
import type { Locale } from '../lib/routes';
import { Arrow } from './Icons';
import { ProjectVisual } from './ProjectVisual';

export function ProjectCards({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <div className="project-grid">
      {(['finance', 'explorer'] as const).map((kind) => (
        <article className="project-card" key={kind}>
          <a
            href={routeHref(locale, kind)}
            className="project-image-link"
            aria-label={kind === 'finance' ? t.financeTitle : t.explorerTitle}
          >
            <ProjectVisual kind={kind} locale={locale} />
          </a>
          <div className="project-card-body">
            <p className="tiny-label">{kind === 'finance' ? t.financeTag : t.explorerTag}</p>
            <h3>
              <a href={routeHref(locale, kind)}>
                {kind === 'finance' ? t.financeTitle : t.explorerTitle}
              </a>
            </h3>
            <p>{kind === 'finance' ? t.financeText : t.explorerText}</p>
            <a className="text-link" href={routeHref(locale, kind)}>
              {t.viewProject}
              <Arrow />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
