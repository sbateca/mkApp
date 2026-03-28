import React from "react";

import {SxProps} from "@mui/material/styles";
import {Box, Divider, Theme, useMediaQuery, useTheme} from "@mui/material";

import {Spinner} from "../../../shared/ui";
import SampleSideSectionButtons from "./SampleSideSectionActions";
import {SampleDetailProps} from "./Types";
import {getBoxContainerProps} from "./SampleDetailStyles";
import {useSampleStore} from "../../../entities/sample/model/store";
import {selectSelectedSample} from "../../../entities/sample/model/selectors";
import {SampleDetailHeader} from "./SampleDetailHeader";
import {SampleDetailForm} from "./SampleDetailForm";
import {useSampleErrorNotifier} from "../model/useSampleErrorNotifier";
import {useSampleDetailController} from "../model/useSampleDetailController";

export const SampleDetail = ({
  isReadOnlyMode,
  setIsReadOnlyMode,
}: SampleDetailProps): React.ReactElement => {
  const theme = useTheme<Theme>();
  const isLessThanMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const selectedSample = useSampleStore(selectSelectedSample);

  const {sampleDetailForm, catalog, uiElements, actions} =
    useSampleDetailController({
      selectedSample,
      setIsReadOnlyMode,
    });

  const {
    form,
    formFieldsErrors,
    getAutoCompleteOptionsFromModel,
    getTextFieldHelperText,
    handleAutoCompleteChange,
    handleChange,
    handleDateChange,
    isNotValidForm,
  } = sampleDetailForm;

  const {clients, isLoading, isLoadingAll, sampleTypes} = catalog;
  const {sideSectionTitle} = uiElements;

  const {onCloseSideSection, handleCreateSample, handleEditSample} = actions;

  const createSample = () => {
    handleCreateSample(form);
  };

  const editSample = () => {
    handleEditSample(form);
  };

  useSampleErrorNotifier();

  return (
    <Box sx={getBoxContainerProps(isLessThanMediumScreen) as SxProps}>
      <SampleDetailHeader
        selectedSample={selectedSample}
        isReadOnlyMode={isReadOnlyMode}
        sideSectionTitle={sideSectionTitle}
        isLoading={isLoading}
        handleCloseSideSection={onCloseSideSection}
      />
      <Divider />
      {isLoadingAll ? (
        <Spinner />
      ) : (
        <SampleDetailForm
          clients={clients}
          form={form}
          formFieldsErrors={formFieldsErrors}
          getAutoCompleteOptionsFromModel={getAutoCompleteOptionsFromModel}
          getTextFieldHelperText={getTextFieldHelperText}
          handleAutoCompleteChange={handleAutoCompleteChange}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          isLessThanMediumScreen={isLessThanMediumScreen}
          isReadOnlyMode={isReadOnlyMode}
          sampleTypes={sampleTypes}
        />
      )}
      <Box
        sx={{
          display: "flex",
          alignSelf: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <SampleSideSectionButtons
          isNotValidForm={isNotValidForm}
          sample={selectedSample}
          isReadOnlyMode={isReadOnlyMode}
          setIsReadOnlyMode={setIsReadOnlyMode}
          handleCreateSample={createSample}
          handleEdit={editSample}
        />
      </Box>
    </Box>
  );
};
