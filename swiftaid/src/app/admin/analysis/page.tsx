"use client";

import { useState } from "react";

export default function AnalysisPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [modelAnalysis, setModelAnalysis] = useState<any>(null);

  const handleGenerateAnalysis = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/preferences/analyze");

      if (!response.ok) {
        throw new Error("Failed to generate analysis");
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      setError("Failed to generate analysis. Please try again.");
      console.error("Error generating analysis:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelAnalysis = async () => {
    try {
      setIsModelLoading(true);
      setError(null);

      const response = await fetch("/api/preferences/model");

      if (!response.ok) {
        throw new Error("Failed to generate model analysis");
      }

      const data = await response.json();
      setModelAnalysis(data);
    } catch (error) {
      setError(
        "Failed to generate model analysis. Please ensure the model server is running."
      );
      console.error("Error generating model analysis:", error);
    } finally {
      setIsModelLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-black">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Lead Generation Analysis
        </h1>
        <p className="text-gray-600">
          Generate AI-powered insights from user preferences data.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-8 flex gap-4">
        <button
          onClick={handleGenerateAnalysis}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating Analysis...
            </>
          ) : (
            "Generate Gemini Analysis"
          )}
        </button>

        <button
          onClick={handleModelAnalysis}
          disabled={isModelLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isModelLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Running Model Analysis...
            </>
          ) : (
            "Run Model Analysis"
          )}
        </button>
      </div>

      {analysis && (
        <div className="prose prose-blue max-w-none bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4">Gemini Analysis</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: analysis.replace(/\n/g, "<br/>"),
            }}
          />
        </div>
      )}

      {modelAnalysis && modelAnalysis.success && (
        <div className="prose prose-blue max-w-none bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Model Analysis</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Likelihood
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current City
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Target City
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {modelAnalysis.rankings.map((customer: any) => (
                  <tr key={customer.rank}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.rank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.likelihood_percentage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.current_city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.target_city}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>
              Total Customers: {modelAnalysis.model_metrics.total_customers}
            </p>
            <p>
              Analysis Time:{" "}
              {new Date(modelAnalysis.model_metrics.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
