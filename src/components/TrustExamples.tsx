import React from "react";
import DocumentSamples from "./DocumentSamples";

interface TrustExamplesProps {
  onNavigate?: (segment: string) => void;
}

export default function TrustExamples({ onNavigate }: TrustExamplesProps) {
  return (
    <div className="space-y-6">
      <DocumentSamples onNavigate={onNavigate} />
    </div>
  );
}
