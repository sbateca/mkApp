import {useInterfaceTranslation} from "../../../i18n/useInterfaceTranslation";
import {TextField, InputAdornment} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {SharedButtonSizes, SharedButtonVariants} from "../../../../utils/enums";

type TableSearchProps = {
  searchValue: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TableSearch = ({searchValue, handleSearch}: TableSearchProps) => {
  const {t} = useInterfaceTranslation();
  return (
    <TextField
      id="search-input"
      placeholder={t("Search records")}
      inputProps={{"aria-label": t("Search records")}}
      value={searchValue}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      size={SharedButtonSizes.SMALL}
      variant={SharedButtonVariants.OUTLINED}
      onChange={handleSearch}
      sx={{width: "100%", maxWidth: 400}}
    />
  );
};
