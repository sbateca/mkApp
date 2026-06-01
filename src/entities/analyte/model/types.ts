import {Analyte} from "./Analyte";

export type AnalyteStore = {
  analytes: Analyte[] | null;
  selectedAnalyte: Analyte | null;
  setSelectedAnalyte: (analyte: Analyte | null) => void;
  setAnalytes: (analytes: Analyte[] | null) => void;
  getAnalytes: () => Promise<Analyte[] | null>;
  getAnalyteById: (analyteId: string) => Promise<Analyte | null>;
  getAnalytesByTestTypeId: (testTypeId: string) => Promise<Analyte[] | null>;
  createAnalyte: (analyte: Analyte) => Promise<Analyte | null>;
  editAnalyte: (analyte: Analyte, analyteId: string) => Promise<Analyte | null>;
  deleteAnalyte: (analyteId: string) => Promise<Analyte | null>;
  isLoading: boolean;
  error: string | null;
};
