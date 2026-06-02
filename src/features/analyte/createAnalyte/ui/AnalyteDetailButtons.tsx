import {Box} from "@mui/material";
import {Analyte} from "../../../../entities/analyte";
import {Button} from "../../../../shared/ui";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../../utils/enums";
import {EDIT_ANALYTE_BUTTON_LABEL} from "../../../../utils/constants";
import {useReadOnlyMode} from "../../../readOnlyMode";

type AnalyteDetailButtonsProps = {
  isNotValidForm: boolean;
  analyte: Analyte | null;
  handleReadOnlyModeChange: () => void;
  handleCreateAnalyte: () => void;
  handleEditAnalyte: () => void;
};

export const AnalyteDetailButtons = ({
  isNotValidForm,
  analyte,
  handleReadOnlyModeChange,
  handleCreateAnalyte,
  handleEditAnalyte,
}: AnalyteDetailButtonsProps) => {
  const {isReadOnlyMode} = useReadOnlyMode();
  return (
    <Box>
      {isReadOnlyMode && analyte ? (
        <Button
          icon={IconNames.EDIT}
          label={EDIT_ANALYTE_BUTTON_LABEL}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleReadOnlyModeChange}
        />
      ) : null}
      {!isReadOnlyMode && analyte ? (
        <>
          <Button
            icon={IconNames.SAVE}
            label={SharedButtonCommonLabels.SAVE}
            disabled={isNotValidForm}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.SUCCESS}
            onClick={handleEditAnalyte}
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
      {!isReadOnlyMode && !analyte ? (
        <Button
          icon={IconNames.SAVE}
          label={SharedButtonCommonLabels.SAVE}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.SUCCESS}
          onClick={handleCreateAnalyte}
        />
      ) : null}
    </Box>
  );
};
