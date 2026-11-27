import {formatInterfaceDate} from "../../../shared/i18n/formatInterfaceDate";
import {useInterfaceTranslation} from "../../../shared/i18n/useInterfaceTranslation";
import {Box, Grid, Typography} from "@mui/material";

import {formSectionSx} from "../../../shared/commonStyles";
import {Spinner} from "../../../shared/ui";
import {useSampleReportDetails} from "../model/useSampleReportDetails";
import {Sample} from "../model/Sample";
import React from "react";

interface SampleReportDetailsProps {
  sample: Sample | null;
  isLoadingSample?: boolean;
}

export const SampleReportDetails = ({
  sample,
  isLoadingSample,
}: SampleReportDetailsProps) => {
  const {t, language} = useInterfaceTranslation();
  const {sampleCardDetails} = useSampleReportDetails(sample);

  return isLoadingSample ? (
    <Spinner />
  ) : (
    <Box component="section" sx={formSectionSx}>
      <Typography component="h2" fontWeight={750} sx={{mb: 2}}>
        {t("Sample information")}
      </Typography>

      {sample ? (
        <Grid container spacing={1}>
          {Object.entries(sampleCardDetails).map(([key, detail]) => (
            <React.Fragment key={key}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.primary">
                  {t(detail.label)}:
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2" color="text.primary">
                  {detail.isDate
                    ? formatInterfaceDate(detail.value, language)
                    : detail.value}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      ) : (
        <Typography variant="body2" color="text.primary">
          {t("No sample content. Please, select a sample to see the details.")}
        </Typography>
      )}
    </Box>
  );
};
