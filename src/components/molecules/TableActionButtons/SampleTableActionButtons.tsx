import {useEffect} from "react";

import {Box} from "@mui/material";
import Swal from "sweetalert2";

import {Button, Spinner} from "../../atoms";
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
import {useSampleStore} from "../../../features/samples/model/store";
import {
  selectDeleteSample,
  selectError,
  selectGetSampleById,
  selectGetSamples,
  selectIsLoading,
  selectSetSelectedSample,
} from "../../../features/samples/model/selectors";
import {useSideSectionStore} from "../../../features/sideSection/model/store";
import {
  selectSetIsSideSectionOpen,
  selectSetSideSectionTitle,
} from "../../../features/sideSection/model/selectors";
import {useSnackBarStore} from "../../../features/snackbar/model/store";
import {selectShowSnackBarMessage} from "../../../features/snackbar/model/selectors";

export const SampleTableActionButtons = ({
  sampleId,
}: SampleTableActionButtonsProps): React.ReactElement => {
  const getSamples = useSampleStore(selectGetSamples);
  const setSelectedSample = useSampleStore(selectSetSelectedSample);
  const getSampleById = useSampleStore(selectGetSampleById);
  const deleteSample = useSampleStore(selectDeleteSample);
  const isLoading = useSampleStore(selectIsLoading);
  const error = useSampleStore(selectError);

  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  const setIsSideSectionOpen = useSideSectionStore(selectSetIsSideSectionOpen);
  const setSideSectionTitle = useSideSectionStore(selectSetSideSectionTitle);

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
