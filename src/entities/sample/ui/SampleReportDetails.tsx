import {Card, CardContent, Grid, Typography} from "@mui/material";

import {Client, Sample, SampleType} from "../../../model";
import {Spinner} from "../../../shared/ui";
import {useSampleReportDetails} from "../model/useSampleReportDetails";

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
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Sample information
        </Typography>
        {sample ? (
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.primary">
                Sample Code:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.primary">
                {sampleCardDetails?.sampleCode}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.primary">
                Sample Type:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.primary">
                {sampleCardDetails?.sampleType}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.primary">
                Client:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.primary">
                {sampleCardDetails?.client}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.primary">
                Get Sample Date:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.primary">
                {sampleCardDetails?.getSampleDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.primary">
                Reception Date:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.primary">
                {sampleCardDetails?.receptionDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.primary">
                Analysis Date:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.primary">
                {sampleCardDetails?.analysisDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.primary">
                Sample Location:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.primary">
                {sampleCardDetails?.sampleLocation}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.primary">
                Responsable:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.primary">
                {sampleCardDetails?.responsable}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body2" color="text.primary">
            No sample content
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
