import {Box} from "@mui/material";
import {SampleType} from "../../../../entities/sampleType";
import {Button} from "../../../../shared/ui";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../../utils/enums";
import {EDIT_SAMPLE_TYPE_BUTTON_LABEL} from "../../../../utils/constants";
import {useReadOnlyMode} from "../../../readOnlyMode";

type SampleTypeDetailButtonsProps = {
  isNotValidForm: boolean;
  sampleType: SampleType | null;
  handleReadOnlyModeChange: () => void;
  handleCreateSampleType: () => void;
  handleEditSampleType: () => void;
};

export const SampleTypeDetailButtons = ({
  isNotValidForm,
  sampleType,
  handleReadOnlyModeChange,
  handleCreateSampleType,
  handleEditSampleType,
}: SampleTypeDetailButtonsProps) => {
  const {isReadOnlyMode} = useReadOnlyMode();
  return (
    <Box>
      {isReadOnlyMode && sampleType ? (
        <Button
          icon={IconNames.EDIT}
          label={EDIT_SAMPLE_TYPE_BUTTON_LABEL}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleReadOnlyModeChange}
        />
      ) : null}
      {!isReadOnlyMode && sampleType ? (
        <>
          <Button
            icon={IconNames.SAVE}
            label={SharedButtonCommonLabels.SAVE}
            disabled={isNotValidForm}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.SUCCESS}
            onClick={handleEditSampleType}
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
      {!isReadOnlyMode && !sampleType ? (
        <Button
          icon={IconNames.SAVE}
          label={SharedButtonCommonLabels.SAVE}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.SUCCESS}
          onClick={handleCreateSampleType}
        />
      ) : null}
    </Box>
  );
};
