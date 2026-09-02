import { getTranslations } from '@/i18n';
import { Locale } from '@/i18n/config';
import JsonLd from '@/components/common/structured-data/json-ld';
import {
  buildGraphSchema,
  buildOrganizationSchema,
  buildProfessionalServiceSchema,
  buildWebSiteSchema,
} from '@/utils/seo';

interface LocalBusinessSchemaProps {
  locale: Locale;
}

export default function LocalBusinessSchema({ locale }: LocalBusinessSchemaProps) {
  const t = getTranslations(locale);

  const structuredData = buildGraphSchema([
    buildOrganizationSchema({
      description: t.meta.description,
      address: t.contact.address,
      locale,
    }),
    buildWebSiteSchema({
      name: t.home.title,
      description: t.meta.description,
      locale,
    }),
    buildProfessionalServiceSchema({
      description: t.meta.description,
      address: t.contact.address,
      locale,
    }),
  ]);

  return <JsonLd data={structuredData} />;
}
