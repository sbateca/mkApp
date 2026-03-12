import {useEffect, useState} from "react";

import {Card, CardContent, Grid, Typography} from "@mui/material";

import {Client, Sample, SampleType} from "../../../model";
import {Spinner} from "../../../shared/ui";

interface SampleReportDetailsProps {
  sample: Sample | null;
  sampleTypes: SampleType[];
  clients: Client[];
  isLoadingSample: boolean;
}

interface SampleCardDetails {
  sampleCode: string;
  sampleType: string;
  client: string;
  getSampleDate: string;
  receptionDate: string;
  analysisDate: string;
  sampleLocation: string;
  responsable: string;
}

export const SampleReportDetails = ({
  sample,
  sampleTypes,
  clients,
  isLoadingSample,
}: SampleReportDetailsProps) => {
  const [sampleCardDetails, setSampleCardDetails] =
    useState<SampleCardDetails>();

  const getSampleTypeFromSample = () => {
    if (sample) {
      return sampleTypes.find(
        (sampleType) => sampleType.id === sample.sampleTypeId,
      );
    }
    return null;
  };

  const getClientFromSample = () => {
    if (sample) {
      return clients.find((client) => client.id === sample.clientId);
    }
    return null;
  };

  const getSampleCardDetails = (): SampleCardDetails => {
    return {
      sampleCode: sample ? sample.sampleCode : "",
      sampleType: getSampleTypeFromSample()?.name || "",
      client: getClientFromSample()?.name || "",
      getSampleDate: sample ? sample.getSampleDate : "",
      receptionDate: sample ? sample.receptionDate : "",
      analysisDate: sample ? sample.analysisDate : "",
      sampleLocation: sample ? sample.sampleLocation : "",
      responsable: sample ? sample.responsable : "",
    };
  };

  useEffect(() => {
    const sampleCardDetails = getSampleCardDetails();
    setSampleCardDetails(sampleCardDetails);
  }, [sample]);

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
