import {useEffect} from "react";

import {Box} from "@mui/material";
import Swal from "sweetalert2";

import {Button, Spinner} from "../../atoms";
import {useSample, useSideSection} from "../../../utils/hooks";
import {SampleTableActionButtonsProps} from "./Types";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
  SnackBarSeverity,
  SweetAlertIcon,
} from "../../../utils/enums";
import {
  SAMPLE_DELETE_CONFIRMATION_SUBTITLE,
  SAMPLE_DELETE_CONFIRMATION_TEXT,
  SAMPLE_SUCCESSFULLY_DELETED_TEXT,
  SAMPLE_DELETE_CONFIRMATION_TITLE,
  SAMPLE_DETAILS_TITLE_TEXT,
} from "../../../utils/constants";
import useSnackBarStore from "../../../stores/snackBarStore";

export const SampleTableActionButtons = ({
  sampleId,
}: SampleTableActionButtonsProps): React.ReactElement => {
  const {
    getSampleById,
    deleteSample,
    getSamples,
    setSelectedSample,
    isLoading,
    error,
  } = useSample();
  const {showSnackBarMessage} = useSnackBarStore();
  const {setIsSideSectionOpen, setSideSectionTitle} = useSideSection();

  const handleOpenSideSection = async (sampleId: string) => {
    const sample = await getSampleById(sampleId);
    if (sample) {
      setSelectedSample(sample);
      setSideSectionTitle(SAMPLE_DETAILS_TITLE_TEXT);
      setIsSideSectionOpen(true);
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: SAMPLE_DELETE_CONFIRMATION_TITLE,
      text: SAMPLE_DELETE_CONFIRMATION_SUBTITLE,
      icon: SweetAlertIcon.WARNING,
      showCancelButton: true,
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#d33",
      confirmButtonText: SAMPLE_DELETE_CONFIRMATION_TEXT,
    }).then((result) => {
      if (result.isConfirmed) {
        const result = deleteSample(sampleId);
        if (result !== null) {
          showSnackBarMessage(
            SAMPLE_SUCCESSFULLY_DELETED_TEXT,
            SnackBarSeverity.SUCCESS,
            getSamples,
          );
        }
      }
    });
  };

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR);
    }
  }, [error]);

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Button
            icon={IconNames.SEARCH}
            label={SharedButtonCommonLabels.VIEW}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            onClick={() => handleOpenSideSection(sampleId)}
          />
          <Button
            icon={IconNames.DELETE}
            label={SharedButtonCommonLabels.DELETE}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.ERROR}
            onClick={handleDelete}
          />
        </>
      )}
    </Box>
  );
};
