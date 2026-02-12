import {useEffect, useState} from "react";

import {Box} from "@mui/material";

import {Button, Spinner, Typography} from "../../atoms";
import {SideSection} from "../SideSection/SideSection";
import {SampleDetail} from "../SampleDetail";
import {Table} from "../Table";

import {useSampleType} from "../../../utils/hooks";
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
import useSnackBarStore from "../../../stores/snackBarStore";
import useSideSectionStore from "../../../stores/sideSectionStore";
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

  const {sampleTypes} = useSampleType();
  const {showSnackBarMessage} = useSnackBarStore();
  const {isSideSectionOpen, setIsSideSectionOpen, setSideSectionTitle} =
    useSideSectionStore();

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
