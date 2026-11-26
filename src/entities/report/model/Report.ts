import {ReportStatus} from "../../../utils/enums";
import {Sample} from "../../sample";
import {Test, TestRequest} from "../../test";

type ReportAction = "read" | "update" | "delete" | "approve" | "download";

type ActionDecision = {
  allowed: boolean;
  code?: string | null;
  reason?: string | null;
};

export type ReportActions = Partial<Record<ReportAction, ActionDecision>>;

export type ReportCollectionActions = {create: ActionDecision};

export interface Report {
  id: string;
  reportNumber: string;
  reportDate: string;
  status?: ReportStatus;
  sample: Sample;
  tests: Test[];
  actions?: ReportActions;
}

export interface ReportRequest {
  id: string;
  reportNumber: string;
  reportDate: string;
  status?: ReportStatus;
  sampleId: string;
  testIds: TestRequest[];
}
