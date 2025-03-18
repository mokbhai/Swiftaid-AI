"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PreferencesForm from "@/components/forms/PreferencesForm";
import { trackPageView } from "@/lib/analytics";

export default function PreferencesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      trackPageView("/preferences");
    }
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Tell us about your preferences
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Help us understand your travel preferences so we can provide you with
        the best recommendations for your next adventure.
      </p>
      <PreferencesForm />
    </div>
  );
}
