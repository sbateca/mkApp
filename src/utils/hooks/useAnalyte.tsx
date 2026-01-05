import {useEffect} from "react";
import useAnalyteStore from "../../stores/analyteStore";

export const useAnalyte = () => {
  const {
    analytes,
    isLoading,
    selectedAnalyte,
    getAnalytes,
    setSelectedAnalyte,
    getAnalyteById,
    error,
  } = useAnalyteStore();

  useEffect(() => {
    if (!analytes) {
      getAnalytes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analytes]);

  return {
    analytes,
    isLoading,
    selectedAnalyte,
    setSelectedAnalyte,
    getAnalytes,
    getAnalyteById,
    error,
  };
};
