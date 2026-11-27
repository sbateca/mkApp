import {useEffect, useId, useRef, useState} from "react";
import {Alert, Box, Button, Stack, Typography} from "@mui/material";
import {Client, getClientsService} from "../../../entities/client";
import {
  Sample,
  createSampleService,
  sampleFormToSample,
} from "../../../entities/sample";
import {SampleType} from "../../../entities/sampleType";
import {useInterfaceTranslation} from "../../../shared/i18n/useInterfaceTranslation";
import {formSectionSx} from "../../../shared/commonStyles";
import {Spinner} from "../../../shared/ui";
import {UNEXPECTED_ERROR} from "../../../utils/constants";
import {SampleDetailForm} from "../../SampleDetail/ui/SampleDetailForm";
import {useSampleDetailForm} from "../../SampleDetail/model/useSampleDetailForm";

type Props = {
  id: string;
  sampleTypes: SampleType[] | null;
  isLessThanMediumScreen: boolean;
  onCancel: () => void;
  onCreated: (sample: Sample) => void;
};

export const InlineSampleForm = ({
  id,
  sampleTypes,
  isLessThanMediumScreen,
  onCancel,
  onCreated,
}: Props) => {
  const {t} = useInterfaceTranslation();
  const formState = useSampleDetailForm(null);
  const headingId = useId();
  const [clients, setClients] = useState<Client[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const saving = useRef(false);

  useEffect(() => {
    let active = true;
    const loadClients = async () => {
      try {
        const values = await getClientsService();
        if (active) setClients(values);
      } catch (requestError) {
        if (active)
          setError(
            requestError instanceof Error
              ? requestError.message
              : UNEXPECTED_ERROR,
          );
      } finally {
        if (active) setIsLoading(false);
      }
    };
    void loadClients();
    return () => {
      active = false;
    };
  }, []);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formState.isNotValidForm || saving.current || !clients || !sampleTypes)
      return;

    saving.current = true;
    setIsSaving(true);
    setError(null);
    try {
      const sample = await createSampleService(
        sampleFormToSample(formState.form, "", clients, sampleTypes),
      );
      if (!sample) throw new Error(UNEXPECTED_ERROR);
      onCreated(sample);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : UNEXPECTED_ERROR,
      );
    } finally {
      saving.current = false;
      setIsSaving(false);
    }
  };

  return (
    <Box
      component="form"
      id={id}
      aria-labelledby={headingId}
      noValidate
      onSubmit={handleSave}
      sx={formSectionSx}
    >
      <Typography component="h2" id={headingId} fontWeight={750}>
        {t("Add sample")}
      </Typography>
      {error && (
        <Alert severity="error" sx={{mt: 2}}>
          {t(error)}
        </Alert>
      )}
      {isLoading && <Spinner />}
      {clients && (
        <Box
          component="fieldset"
          disabled={isSaving}
          sx={{border: 0, p: 0, m: 0, minWidth: 0}}
        >
          <SampleDetailForm
            {...formState}
            clients={clients}
            sampleTypes={sampleTypes}
            isLessThanMediumScreen={isLessThanMediumScreen}
          />
        </Box>
      )}
      <Stack direction="row" justifyContent="flex-end" gap={1} sx={{mt: 2}}>
        <Button type="button" onClick={onCancel} disabled={isSaving}>
          {t("Cancel")}
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={
            isLoading ||
            isSaving ||
            !clients ||
            !sampleTypes ||
            formState.isNotValidForm
          }
        >
          {t("Save sample")}
        </Button>
      </Stack>
    </Box>
  );
};
