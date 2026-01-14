import React from "react";
import {
  ClientProvider,
  CriteriaProvider,
  ReportsProvider,
  SampleProvider,
  SampleTypeProvider,
} from "../../context";
import {AnalysisMethodProvider} from "../../context/Services/AnalysisMethodContext";

export function AdminProviders({children}: {children: React.ReactNode}) {
  return (
    <ClientProvider>
      <SampleTypeProvider>
        <SampleProvider>
          <ReportsProvider>
            <CriteriaProvider>
              <AnalysisMethodProvider>{children}</AnalysisMethodProvider>
            </CriteriaProvider>
          </ReportsProvider>
        </SampleProvider>
      </SampleTypeProvider>
    </ClientProvider>
  );
}
