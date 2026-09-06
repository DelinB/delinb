import { buildMetadata } from '@/lib/seo';
import { webPageJsonLd } from '@/lib/schema';
import { PLAYG } from '@/data/content';
import { PageHero } from '@/components/sections/shared';
import { PlaygroundGrid } from '@/components/playground/playground-grid';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = buildMetadata({
  title: 'Playground — Delin B',
  description:
    'Live experiments: canvas, GSAP, cursor effects, scroll physics and CSS — all running in the page.',
  path: '/playground',
});

export default function PlaygroundPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd('/playground', 'Playground — Delin B', 'Live experiments: canvas, GSAP, cursor effects, scroll physics and CSS — all running in the page.')} />

      <PageHero
        eyebrow="PLAYGROUND"
        title={
          <>
            Where components
            <br />
            misbehave on purpose.
          </>
        }
        sub='Experiments in GSAP, canvas, CSS and pure pointer math. Every demo below is live — no screenshots, no videos. Click any "View Experiment" for the enlarged cut.'
        meta="08 LIVE DEMOS · RUNS IN THIS PAGE"
      />

      <section className="sec first" style={{ paddingBottom: '120px' }}>
        <div className="wrap">
          <PlaygroundGrid items={PLAYG} />
        </div>
      </section>
    </>
  );
}
