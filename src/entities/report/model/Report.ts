import {ReportStatus} from "../../../utils/enums";
import {Sample} from "../../sample";
import {Test} from "../../test";

export interface Report {
  id: string;
  reportNumber: string;
  reportDate: string;
  status?: ReportStatus;
  sample: Sample;
  tests: Test[];
}
