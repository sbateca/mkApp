import {Sample} from "../../sample";
import {Test} from "../../test";

export interface Report {
  id: string;
  reportNumber: string;
  reportDate: string;
  sample: Sample;
  tests: Test[];
}
