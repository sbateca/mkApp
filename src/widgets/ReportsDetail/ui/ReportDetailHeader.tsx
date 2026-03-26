import {Chip, Stack} from "@mui/material";
import {Button, Typography} from "../../../shared/ui";
import {
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
  SharedChipColors,
  SharedChipSizes,
  SharedTypographyAlign,
  SharedTypographyColors,
  SharedTypographyVariants,
} from "../../../utils/enums";
import {ReportDetailStyles} from "./ReportsDetailStyles";
import {Report} from "../../../model";

export type HeaderProps = {
  isReadOnlyMode: boolean;
  handleCloseSideSection: () => void;
  isLoading: boolean;
  selectedReport: Report | null;
  sideSectionTitle: string;
};

export const ReportDetailHeader = ({
  isReadOnlyMode,
  handleCloseSideSection,
  isLoading,
  selectedReport,
  sideSectionTitle,
}: HeaderProps): React.ReactElement => {
  const getEditModeChip = (): React.ReactNode => {
    if (selectedReport) {
      return (
        <Stack direction={"row"} spacing={1} sx={{marginLeft: "10px"}}>
          <Typography
            text={"Edit mode"}
            variant={SharedTypographyVariants.CAPTION}
            align={SharedTypographyAlign.LEFT}
            color={SharedTypographyColors.TEXT_SECONDARY}
            padding="0 0 5px 0"
            sx={{alignSelf: "center"}}
          />
          {isReadOnlyMode ? (
            <Chip
              label="OFF"
              size={SharedChipSizes.SMALL}
              color={SharedChipColors.DEFAULT}
            />
          ) : (
            <Chip
              label="ON"
              size={SharedChipSizes.SMALL}
              color={SharedChipColors.SUCCESS}
            />
          )}
        </Stack>
      );
    }
    return null;
  };

  return (
    <Stack direction="row">
      <Stack direction={"row"}>
        <Typography
          text={sideSectionTitle}
          variant={SharedTypographyVariants.H6}
          align={SharedTypographyAlign.LEFT}
          color={SharedTypographyColors.PRIMARY}
          padding="0 0 5px 0"
        />
        {getEditModeChip()}
      </Stack>
      <Button
        disabled={isLoading}
        label={SharedButtonCommonLabels.CLOSE}
        variant={SharedButtonVariants.OUTLINED}
        size={SharedButtonSizes.SMALL}
        color={SharedButtonColors.ERROR}
        icon="close"
        onClick={handleCloseSideSection}
        sx={ReportDetailStyles.closeButton}
      />
    </Stack>
  );
};
