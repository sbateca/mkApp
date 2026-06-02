import {Box} from "@mui/material";
import {Criteria} from "../../../entities/criteria";
import {Button} from "../../../shared/ui";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../utils/enums";
import {EDIT_CRITERIA_BUTTON_LABEL} from "../../../utils/constants";
import {useReadOnlyMode} from "../../../features/readOnlyMode";

type CriteriaDetailButtonsProps = {
  isNotValidForm: boolean;
  criteria: Criteria | null;
  handleReadOnlyModeChange: () => void;
  handleCreateCriteria: () => void;
  handleEditCriteria: () => void;
};

export const CriteriaDetailButtons = ({
  isNotValidForm,
  criteria,
  handleReadOnlyModeChange,
  handleCreateCriteria,
  handleEditCriteria,
}: CriteriaDetailButtonsProps) => {
  const {isReadOnlyMode} = useReadOnlyMode();
  return (
    <Box>
      {isReadOnlyMode && criteria ? (
        <Button
          icon={IconNames.EDIT}
          label={EDIT_CRITERIA_BUTTON_LABEL}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleReadOnlyModeChange}
        />
      ) : null}
      {!isReadOnlyMode && criteria ? (
        <>
          <Button
            icon={IconNames.SAVE}
            label={SharedButtonCommonLabels.SAVE}
            disabled={isNotValidForm}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.SUCCESS}
            onClick={handleEditCriteria}
          />
          <Button
            label={SharedButtonCommonLabels.CANCEL}
            icon={IconNames.CLOSE}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.ERROR}
            onClick={handleReadOnlyModeChange}
          />
        </>
      ) : null}
      {!isReadOnlyMode && !criteria ? (
        <Button
          icon={IconNames.SAVE}
          label={SharedButtonCommonLabels.SAVE}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.SUCCESS}
          onClick={handleCreateCriteria}
        />
      ) : null}
    </Box>
  );
};
