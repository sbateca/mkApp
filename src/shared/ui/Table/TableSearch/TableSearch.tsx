import {TextField, InputAdornment} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {SharedButtonSizes, SharedButtonVariants} from "../../../../utils/enums";

type TableSearchProps = {
  searchValue: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TableSearch = ({searchValue, handleSearch}: TableSearchProps) => {
  return (
    <TextField
      id={"search-input"}
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
      sx={{marginBottom: "5px"}}
    />
  );
};
