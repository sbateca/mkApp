import {useSessionStore} from "../../entities/auth/model/store";

export const setWorkspaceTestRole = (role: string) => {
  useSessionStore.setState({
    user: {id: "test-user", username: "user", name: "Test User", role},
    isAuthenticated: true,
    isSessionResolved: true,
    isLoading: false,
  });
};
