import {IconButton} from "@mui/material";
import {styled, useTheme} from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type StyledHeaderMenuProps = {
  onClick: () => void;
};

const StyledHeaderMenu = styled("div")(({theme}) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const HeaderMenu = ({
  onClick,
}: StyledHeaderMenuProps): React.ReactElement => {
  const theme = useTheme();

  return (
    <StyledHeaderMenu>
      <IconButton onClick={onClick}>
        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </StyledHeaderMenu>
  );
};
