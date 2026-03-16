import {useEffect, useState} from "react";

import {Box} from "@mui/material";

import {Button, Spinner, Table, Typography} from "../../../shared/ui";
import {SideSection} from "../../../shared/ui/SideSection/SideSection";
import {SampleDetail} from "../SampleDetail";

import {samplesToTableRows} from "../../../adapters/tableRow";
import {
  SharedButtonColors,
  SharedButtonIcons,
  SharedButtonSizes,
  SharedButtonVariants,
  SnackBarSeverity,
} from "../../../utils/enums";
import {
  CREATE_SAMPLE_TITLE_TEXT,
  SAMPLES_CREATE_BUTTON_LABEL,
  SAMPLES_TABLE_HEADER_LABELS,
  SAMPLES_TITLE_CONFIG,
} from "../../../utils/constants";
import {TableRowProps} from "../../molecules/TableRow/Types";
import {SampleContentStyles} from "./SamplesContentStyles";
import {useSampleStore} from "../../../features/samples/model/store";
import {
  selectError,
  selectGetSamples,
  selectIsLoading,
  selectSamples,
  selectSetSelectedSample,
} from "../../../features/samples/model/selectors";
import {
  selectClients,
  selectGetClients,
  useClientStore,
} from "../../../features/clients";
import {useSampleTypeStore} from "../../../features/sampleType/model/store";
import {
  selectGetSampleTypes,
  selectSamplesTypes,
  selectSetSampleTypes,
} from "../../../features/sampleType/model/selectors";
import {
  selectIsSideSectionOpen,
  selectSetIsSideSectionOpen,
  selectSetSideSectionTitle,
} from "../../../features/sideSection/model/selectors";
import {useSideSectionStore} from "../../../features/sideSection/model/store";
import {useSnackBarStore} from "../../../features/snackbar/model/store";
import {selectShowSnackBarMessage} from "../../../features/snackbar/model/selectors";

export const SamplesContent = (): React.ReactElement => {
  const [rows, setRows] = useState<TableRowProps[]>([]);
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(true);

  const samples = useSampleStore(selectSamples);
  const isLoading = useSampleStore(selectIsLoading);
  const error = useSampleStore(selectError);
  const getSamples = useSampleStore(selectGetSamples);
  const setSelectedSample = useSampleStore(selectSetSelectedSample);

  const clients = useClientStore(selectClients);
  const getClients = useClientStore(selectGetClients);

  const sampleTypes = useSampleTypeStore(selectSamplesTypes);
  const getSampleTypes = useSampleTypeStore(selectGetSampleTypes);
  const setSampleTypes = useSampleTypeStore(selectSetSampleTypes);

  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  const isSideSectionOpen = useSideSectionStore(selectIsSideSectionOpen);
  const setSideSectionTitle = useSideSectionStore(selectSetSideSectionTitle);
  const setIsSideSectionOpen = useSideSectionStore(selectSetIsSideSectionOpen);

  const handleOpenSideSection = () => {
    setSelectedSample(null);
    setIsReadOnlyMode(false);
    setSideSectionTitle(CREATE_SAMPLE_TITLE_TEXT);
    setIsSideSectionOpen(true);
  };

  useEffect(() => {
    getClients();
  }, [getClients]);

  useEffect(() => {
    getSamples();
  }, [getSamples]);

  useEffect(() => {
    const getAllSampleTypes = async () => {
      const sampleTypes = await getSampleTypes();
      setSampleTypes(sampleTypes);
    };

    getAllSampleTypes();
  }, [getSampleTypes, setSampleTypes]);

  useEffect(() => {
    if (samples) {
      setRows(samplesToTableRows(samples, sampleTypes, clients));
    }
  }, [samples, clients, sampleTypes]);

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR, getSamples);
    }
  }, [error, getSamples, showSnackBarMessage]);

  return isLoading ? (
    <Spinner />
  ) : (
    <Box>
      <Box sx={SampleContentStyles.titleContentContainer}>
        <Typography {...SAMPLES_TITLE_CONFIG} />
        <Box sx={SampleContentStyles.titleContentActions}>
          <Button
            label={SAMPLES_CREATE_BUTTON_LABEL}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            icon={SharedButtonIcons.CREATE}
            onClick={handleOpenSideSection}
          />
        </Box>
      </Box>
      <Table headerLabels={SAMPLES_TABLE_HEADER_LABELS} rows={rows} />
      <SideSection isOpen={isSideSectionOpen}>
        <SampleDetail
          isReadOnlyMode={isReadOnlyMode}
          setIsReadOnlyMode={setIsReadOnlyMode}
        />
      </SideSection>
    </Box>
  );
};
