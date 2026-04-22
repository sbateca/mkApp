import {SnackBarContainer} from "../../../features/snackbar";
import {LoginPanel} from "../../../widgets/LoginPanel/ui/LoginPanel";

export const LoginPage = () => {
  return (
    <>
      <LoginPanel />;
      <SnackBarContainer />
    </>
  );
};
