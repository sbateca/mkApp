import {Box, Typography, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {BaseRoutes} from "../../../utils/constants/baseRoutes";
import {selectUser, useSessionStore} from "../../../entities/auth";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  GO_LOGIN_BUTTON_LABEL,
  NOT_FOUND_DESCRIPTION,
  NOT_FOUND_HEADER,
  NOT_FOUND_TEXT,
  RETURN_HOME_BUTTON_LABEL,
} from "../../../utils/constants";

export const NotFoundPage = (): React.ReactElement => {
  const userSession = useSessionStore(selectUser);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(userSession ? BaseRoutes.HOME : BaseRoutes.LOGIN);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      px={2}
    >
      <ErrorOutlineIcon sx={{fontSize: 80, mb: 2, color: "gray"}} />
      <Typography variant="h1" fontWeight="bold">
        {NOT_FOUND_HEADER}
      </Typography>

      <Typography variant="h5" mb={2}>
        {NOT_FOUND_TEXT}
      </Typography>

      <Typography variant="body1" mb={4}>
        {NOT_FOUND_DESCRIPTION}
      </Typography>

      <Button variant="contained" onClick={handleRedirect}>
        {userSession ? RETURN_HOME_BUTTON_LABEL : GO_LOGIN_BUTTON_LABEL}
      </Button>
    </Box>
  );
};
