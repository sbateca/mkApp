import {v4 as uuid4} from "uuid";
import {Criteria} from "../../../entities/criteria";
import {FormProps} from "../../../utils/constants";
import {CriteriaFormFields} from "../../../utils/enums";

export const criteriaToForm = (criteria: Criteria) => ({
  [CriteriaFormFields.NAME]: criteria.name,
});

export const formToCriteria = (
  form: FormProps,
  criteriaId?: string,
): Criteria => ({
  id: criteriaId || uuid4(),
  name: form[CriteriaFormFields.NAME] as string,
});
