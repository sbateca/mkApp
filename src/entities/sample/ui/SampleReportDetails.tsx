import {Card, CardContent, Divider, Grid, Typography} from "@mui/material";

import {Spinner} from "../../../shared/ui";
import {useSampleReportDetails} from "../model/useSampleReportDetails";
import {Sample} from "../model/Sample";
import {SampleType} from "../../sampleType";
import {Client} from "../../client";
import React from "react";

interface SampleReportDetailsProps {
  sample: Sample | null;
  sampleTypes: SampleType[];
  clients: Client[];
  isLoadingSample: boolean;
}

export const SampleReportDetails = ({
  sample,
  sampleTypes,
  clients,
  isLoadingSample,
}: SampleReportDetailsProps) => {
  const {sampleCardDetails} = useSampleReportDetails(
    sample,
    sampleTypes,
    clients,
  );

  return isLoadingSample ? (
    <Spinner />
  ) : (
    <Card sx={{width: "100%"}}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Sample information
        </Typography>

        <Divider sx={{marginBottom: 2}} />

        {sample ? (
          <Grid container spacing={1}>
            {Object.entries(sampleCardDetails).map(([key, detail]) => (
              <React.Fragment key={key}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.primary">
                    {detail.label}:
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" color="text.primary">
                    {detail.value}
                  </Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        ) : (
          <Typography variant="body2" color="text.primary">
            No sample content. Please, select a sample to see the details.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
