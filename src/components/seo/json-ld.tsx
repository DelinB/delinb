interface JsonLdProps {
  data: object;
}

/**
 * Renders Schema.org JSON-LD. Only ever receives trusted, statically-defined
 * site data (never user input), so structured-data injection is safe here.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
