import React from "react";
import {ReportsProvider} from "../../context";
import {AnalysisMethodProvider} from "../../context/Services/AnalysisMethodContext";

export function AdminProviders({children}: {children: React.ReactNode}) {
  return (
    <ReportsProvider>
      <AnalysisMethodProvider>{children}</AnalysisMethodProvider>
    </ReportsProvider>
  );
}
