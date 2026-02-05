import React from "react";
import {
  ClientProvider,
  CriteriaProvider,
  ReportsProvider,
  SampleTypeProvider,
} from "../../context";
import {AnalysisMethodProvider} from "../../context/Services/AnalysisMethodContext";

export function AdminProviders({children}: {children: React.ReactNode}) {
  return (
    <ClientProvider>
      <SampleTypeProvider>
        <ReportsProvider>
          <CriteriaProvider>
            <AnalysisMethodProvider>{children}</AnalysisMethodProvider>
          </CriteriaProvider>
        </ReportsProvider>
      </SampleTypeProvider>
    </ClientProvider>
  );
}
