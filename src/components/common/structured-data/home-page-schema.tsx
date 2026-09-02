import { getTranslations } from '@/i18n';
import { getLocaleFromHeaders } from '@/i18n/server-utils';
import JsonLd from '@/components/common/structured-data/json-ld';
import { buildWebPageSchema, buildLocalizedUrl } from '@/utils/seo';

export default async function HomePageSchema() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  const structuredData = buildWebPageSchema({
    name: t.home.title,
    description: t.meta.description,
    url: buildLocalizedUrl('/', locale),
    locale,
  });

  return <JsonLd data={structuredData} />;
}
