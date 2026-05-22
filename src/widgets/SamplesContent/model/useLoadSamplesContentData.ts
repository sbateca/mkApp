import {useEffect, useState} from "react";
import {
  samplesToTableRows,
  selectGetSamples,
  selectIsLoading,
  selectSamples,
  useSampleStore,
} from "../../../entities/sample";
import {
  selectClients,
  selectGetClients,
  useClientStore,
} from "../../../entities/client";
import {
  selectGetSampleTypes,
  selectSamplesTypes,
  selectSetSampleTypes,
  useSampleTypeStore,
} from "../../../entities/sampleType";
import {TableRowProps} from "../../../shared/ui/Table/TableRow";
import {useTableControls} from "../../../shared/ui/Table/Table/useTableControls";

export const useLoadSamplesContentData = () => {
  const [rows, setRows] = useState<TableRowProps[]>([]);
  const {
    page,
    rowsPerPage,
    order,
    orderBy,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
  } = useTableControls();

  const samples = useSampleStore(selectSamples);
  const isLoading = useSampleStore(selectIsLoading);

  const getSamples = useSampleStore(selectGetSamples);

  const clients = useClientStore(selectClients);
  const getClients = useClientStore(selectGetClients);

  const sampleTypes = useSampleTypeStore(selectSamplesTypes);
  const getSampleTypes = useSampleTypeStore(selectGetSampleTypes);
  const setSampleTypes = useSampleTypeStore(selectSetSampleTypes);

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
      const rows = samplesToTableRows(samples);
      setRows(rows);
    }
  }, [samples, clients, sampleTypes]);

  return {
    rows,
    isLoading,
    page,
    rowsPerPage,
    order,
    orderBy,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
  };
};
