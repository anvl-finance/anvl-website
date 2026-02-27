import Image from 'next/image';

type FeatureCard = {
  heading: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
};

const featureCards: FeatureCard[] = [
  {
    heading: 'BLE Tag Management',
    body: 'Track the status and location of floorplan inventory using Bluetooth Low Energy Tags, stored on blockchain for security and an immutable record.',
    imageSrc: '/BLE Tag Management.png',
    imageAlt: 'BLE Tag Management screenshot',
  },
  {
    heading: 'Dashboard',
    body: 'Built-in AI analytics create confidence scores on a dealer-by-dealer basis across your entire portfolio.',
    imageSrc: '/Dashboard.png',
    imageAlt: 'Dashboard screenshot',
  },
];

export default function PlatformInActionSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[1160px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
            Platform in Action
          </h2>
          <p className="text-lg text-[#C9CDD3] leading-relaxed">
            Operational dashboards built for modern floorplan lenders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featureCards.map((card) => (
            <article
              key={card.heading}
              className="bg-white/5 rounded-xl border border-white/10 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg border border-white/10 mb-5">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">{card.heading}</h3>
              <p className="text-[#C9CDD3] leading-relaxed">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
