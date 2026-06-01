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
import {Analyte} from "../../../entities/analyte";
import {CommonDetailStyles} from "../../../utils/constants";
import {useReadOnlyMode} from "../../../features/readOnlyMode";
import {useSideSection} from "../../../features/sideSection";

export type AnalyteDetailHeaderProps = {
  handleCloseSideSection: () => void;
  selectedAnalyte: Analyte | null;
  isLoading: boolean;
};

export const AnalyteDetailHeader = ({
  handleCloseSideSection,
  selectedAnalyte,
  isLoading,
}: AnalyteDetailHeaderProps): React.ReactElement => {
  const {isReadOnlyMode} = useReadOnlyMode();
  const {sideSectionTitle} = useSideSection();

  const getEditModeChip = (): React.ReactNode => {
    if (selectedAnalyte) {
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
        sx={CommonDetailStyles.closeButton}
      />
    </Stack>
  );
};
