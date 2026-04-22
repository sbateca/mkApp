import {Box} from "@mui/material";
import {Typography} from "../../../shared/ui";
import {COMPANY_NAME} from "../../../utils/constants";
import {
  SharedTypographyAlign,
  SharedTypographyColors,
  SharedTypographyVariants,
} from "../../../utils/enums";
import {SignInForm} from "../../../features/auth/signIn/ui/SignInForm";
import {LoginTemplateStyles} from "./LoginTemplateStyles";

export const LoginPanel = () => {
  return (
    <Box sx={LoginTemplateStyles}>
      <Typography
        text={COMPANY_NAME}
        size="20px"
        padding="0 0 5px 0"
        variant={SharedTypographyVariants.H1}
        align={SharedTypographyAlign.CENTER}
        color={SharedTypographyColors.PRIMARY}
      />
      <SignInForm />
    </Box>
  );
};
