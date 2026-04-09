import {useState} from "react";
import {Box} from "@mui/material";

import {Button, Spinner, Table, Typography} from "../../../shared/ui";
import {SideSection} from "../../../shared/ui/SideSection/SideSection";
import {
  SharedButtonColors,
  SharedButtonIcons,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../utils/enums";
import {
  SAMPLES_CREATE_BUTTON_LABEL,
  SAMPLES_TABLE_HEADER_LABELS,
  SAMPLES_TITLE_CONFIG,
} from "../../../utils/constants";
import {SampleDetail} from "../../SampleDetail";
import {SampleContentStyles} from "./SamplesContentStyles";
import {useLoadSamplesContentData} from "../model/useLoadSamplesContentData";
import {useOpenSideSection} from "../model/useOpenSideSection";
import {useSamplesContentErrorNotifier} from "../model/useSamplesContentErrorNotifier";
import {SampleTableActionButtons} from "../../../features/sample/TableActionButtons";

export const SamplesContent = (): React.ReactElement => {
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(true);

  const {rows, isLoading} = useLoadSamplesContentData();
  const {handleOpenSideSection, isSideSectionOpen} = useOpenSideSection();
  useSamplesContentErrorNotifier();

  const openSideSection = () => {
    setIsReadOnlyMode(false);
    handleOpenSideSection();
  };

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
            onClick={openSideSection}
          />
        </Box>
      </Box>
      <Table
        headerLabels={SAMPLES_TABLE_HEADER_LABELS}
        rows={rows}
        renderActions={(row) => (
          <SampleTableActionButtons sampleId={row.id ?? ""} />
        )}
      />
      <SideSection isOpen={isSideSectionOpen}>
        <SampleDetail
          isReadOnlyMode={isReadOnlyMode}
          setIsReadOnlyMode={setIsReadOnlyMode}
        />
      </SideSection>
    </Box>
  );
};
