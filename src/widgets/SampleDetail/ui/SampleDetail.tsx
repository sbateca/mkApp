import React from "react";

import {SxProps} from "@mui/material/styles";
import {Box, Divider, Theme, useMediaQuery, useTheme} from "@mui/material";

import {Spinner} from "../../../shared/ui";
import SampleSideSectionButtons from "./SampleSideSectionActions";
import {useSampleStore} from "../../../entities/sample/model/store";
import {selectSelectedSample} from "../../../entities/sample/model/selectors";
import {SampleDetailHeader} from "./SampleDetailHeader";
import {SampleDetailForm} from "./SampleDetailForm";
import {useSampleErrorNotifier} from "../model/useSampleErrorNotifier";
import {useSampleDetailController} from "../model/useSampleDetailController";
import {
  formActionsSx,
  getBoxContainerProps,
} from "../../../shared/commonStyles";

export const SampleDetail = (): React.ReactElement => {
  const theme = useTheme<Theme>();
  const isLessThanMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const selectedSample = useSampleStore(selectSelectedSample);

  const {sampleDetailForm, catalog, uiElements, actions} =
    useSampleDetailController({
      selectedSample,
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

  const {clients, canChangeClient, isLoading, isLoadingAll, sampleTypes} =
    catalog;
  const {sideSectionTitle} = uiElements;

  const {onCloseSideSection, handleCreateSample, handleEditSample} = actions;

  const createSample = () => {
    handleCreateSample(form, clients, sampleTypes);
  };

  const editSample = () => {
    handleEditSample(form, clients, sampleTypes);
  };

  useSampleErrorNotifier();

  return (
    <Box sx={getBoxContainerProps(isLessThanMediumScreen) as SxProps}>
      <SampleDetailHeader
        selectedSample={selectedSample}
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
          canChangeClient={canChangeClient}
          form={form}
          formFieldsErrors={formFieldsErrors}
          getAutoCompleteOptionsFromModel={getAutoCompleteOptionsFromModel}
          getTextFieldHelperText={getTextFieldHelperText}
          handleAutoCompleteChange={handleAutoCompleteChange}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          isLessThanMediumScreen={isLessThanMediumScreen}
          sampleTypes={sampleTypes}
        />
      )}
      <Box sx={formActionsSx}>
        <SampleSideSectionButtons
          isNotValidForm={isNotValidForm}
          sample={selectedSample}
          handleCreateSample={createSample}
          handleEdit={editSample}
        />
      </Box>
    </Box>
  );
};
