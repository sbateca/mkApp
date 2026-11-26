import {LanguageSelect} from "../../../features/language/ui/LanguageSelect";
import {useInterfaceTranslation} from "../../../shared/i18n/useInterfaceTranslation";
import {Box, Typography} from "@mui/material";
import {SignInForm} from "../../../features/auth/signIn/ui/SignInForm";
import {AppBrand} from "../../../shared/ui/AppBrand/AppBrand";
import {LoginTemplateStyles} from "./LoginTemplateStyles";

export const LoginPanel = () => {
  const {t} = useInterfaceTranslation();

  return (
    <Box component="main" sx={LoginTemplateStyles.container}>
      <Box component="section" sx={LoginTemplateStyles.intro}>
        <AppBrand />
        <Typography
          component="p"
          sx={{
            maxWidth: "16ch",
            mt: {xs: 2.5, md: 5},
            fontSize: {xs: "1.85rem", lg: "2.75rem"},
            fontWeight: 800,
            letterSpacing: "-0.035em",
            lineHeight: 1.16,
          }}
        >
          {t("Manage your laboratory work in one place.")}
        </Typography>
        <Typography sx={{mt: 2, maxWidth: "42ch", color: "#dbeefa"}}>
          {t("Access samples, clients, and lab reports from one application.")}
        </Typography>
      </Box>
      <Box component="section" sx={LoginTemplateStyles.access}>
        <Box sx={{width: "100%", maxWidth: 448}}>
          <Typography
            component="h1"
            sx={{fontSize: "1.65rem", fontWeight: 800}}
          >
            {t("Sign in")}
          </Typography>
          <Typography color="text.secondary" sx={{mt: 0.5, mb: 3}}>
            {t("Enter your laboratory account credentials.")}
          </Typography>
          <SignInForm />
          <Box sx={{mt: 3}}>
            <LanguageSelect />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
