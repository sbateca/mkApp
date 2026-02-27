import {Analyte} from "../../../model";

export type AnalyteStore = {
  analytes: Analyte[] | null;
  selectedAnalyte: Analyte | null;
  setSelectedAnalyte: (analyte: Analyte | null) => void;
  setAnalytes: (analytes: Analyte[] | null) => void;
  getAnalytes: () => Promise<Analyte[] | null>;
  getAnalyteById: (analyteId: string) => Promise<Analyte | null>;
  isLoading: boolean;
  error: string | null;
};
