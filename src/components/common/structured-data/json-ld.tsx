interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[] | null;
}

export default function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
