import React from "react";
import {AnalysisMethodProvider} from "../../context/Services/AnalysisMethodContext";

export function AdminProviders({children}: {children: React.ReactNode}) {
  return <AnalysisMethodProvider>{children}</AnalysisMethodProvider>;
}
