"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { trackCityExploration, trackUserAction } from "@/lib/analytics";

export default function ExplorePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      trackUserAction("explore_page_visit", {
        userId: session.user.id,
        timestamp: new Date().toISOString(),
      });
    }
  }, [session]);

  const handleCitySelect = (city: string) => {
    trackCityExploration(city, "select", {
      userId: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
    // Add your city selection logic here
  };

  const handleServiceSelect = (service: string) => {
    trackUserAction("service_selection", {
      service,
      userId: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
    // Add your service selection logic here
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Cities</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* City Cards */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Popular Cities</h2>
          <div className="space-y-4">
            {["New York", "San Francisco", "Chicago", "Los Angeles"].map(
              (city) => (
                <button
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className="w-full text-left p-3 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {city}
                </button>
              )
            )}
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Available Services</h2>
          <div className="space-y-4">
            {["Housing", "Utilities", "Healthcare", "Education"].map(
              (service) => (
                <button
                  key={service}
                  onClick={() => handleServiceSelect(service)}
                  className="w-full text-left p-3 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {service}
                </button>
              )
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Your exploration history will appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
