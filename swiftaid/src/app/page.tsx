import Link from "next/link";

export default function Home() {
  return (
    <div className="relative isolate">
      {/* Hero section */}
      <div className="relative pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your AI-Powered Urban Relocation Assistant
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              SwiftAid makes moving to a new city seamless with AI-powered
              assistance for housing, security, and lifestyle management.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/explore"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Explore Cities
              </Link>
              <Link
                href="/services"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Our Services <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Everything you need
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Complete Relocation Solution
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From finding the perfect home to settling in, SwiftAid provides
            comprehensive assistance for your urban relocation journey.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    name: "Relocation Assistance",
    description:
      "Housing recommendations, utility setup, and local registration assistance tailored to your needs.",
  },
  {
    name: "360° Security Services",
    description:
      "Comprehensive security solutions including emergency response, healthcare network, and personal safety monitoring.",
  },
  {
    name: "Lifestyle Management",
    description:
      "Seamless hotel bookings, restaurant recommendations, grocery delivery, and medical appointments.",
  },
];
