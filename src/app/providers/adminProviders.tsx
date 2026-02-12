import React from "react";
import {
  CriteriaProvider,
  ReportsProvider,
  SampleTypeProvider,
} from "../../context";
import {AnalysisMethodProvider} from "../../context/Services/AnalysisMethodContext";

export function AdminProviders({children}: {children: React.ReactNode}) {
  return (
    <SampleTypeProvider>
      <ReportsProvider>
        <CriteriaProvider>
          <AnalysisMethodProvider>{children}</AnalysisMethodProvider>
        </CriteriaProvider>
      </ReportsProvider>
    </SampleTypeProvider>
  );
}
