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

export const filterModelsById = <T extends {id: string}>(
  items: T[],
  id: string,
): T => {
  const filtered = items.filter((item) => item.id === id);
  if (filtered.length === 0) {
    throw new Error(`Item with id ${id} not found`);
  }
  return filtered[0];
};

export const filterModelsByIds = <T extends {id: string}>(
  items: T[],
  ids: string[],
): T[] => {
  const filtered = items.filter((item) => ids.includes(item.id));
  if (filtered.length !== ids.length) {
    throw new Error(
      `Some items with ids ${ids.join(", ")} were not found. Found ${filtered.length} items.`,
    );
  }
  return filtered;
};
