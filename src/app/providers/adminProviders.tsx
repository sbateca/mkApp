import React from "react";
import {CriteriaProvider, ReportsProvider} from "../../context";
import {AnalysisMethodProvider} from "../../context/Services/AnalysisMethodContext";

export function AdminProviders({children}: {children: React.ReactNode}) {
  return (
    <ReportsProvider>
      <CriteriaProvider>
        <AnalysisMethodProvider>{children}</AnalysisMethodProvider>
      </CriteriaProvider>
    </ReportsProvider>
  );
}
