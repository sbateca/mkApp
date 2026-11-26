import {AnalysisMethod} from "../../analysisMethod/model/AnalysisMethod";
import {Analyte} from "../../analyte/model/Analyte";
import {Criteria} from "../../criteria";
import {TestType} from "../../testType/model/TestType";

export interface Test {
  id: string;
  testType: TestType;
  sampleId: string;
  analyte: Analyte;
  analysisMethod: AnalysisMethod;
  criteria: Criteria;
  result: string;
}

export interface TestRequest {
  id: string;
  testTypeId: string;
  sampleId: string;
  analyteId: string;
  analysisMethodId: string;
  criteriaId: string;
  result: string;
}
