import {AutoCompleteOption} from "../shared/ui/AutoComplete/types";

export interface GenericModelWithId {
  id: string;
  name: string;
}

export const findModelById = <T extends GenericModelWithId>(
  id: string | undefined,
  models: T[] | null,
) => {
  return models?.find((model) => model.id === id);
};

export const getAutoCompleteOptionsFromModel = <T extends GenericModelWithId>(
  models: T[] | null,
): AutoCompleteOption[] => {
  return (
    models?.map((model) => {
      return {
        id: model.id,
        optionLabel: model.name ?? "",
      };
    }) ?? []
  );
};
