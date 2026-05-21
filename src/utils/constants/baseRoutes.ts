export enum BaseRoutes {
  ANY = "*",
  HOME = "/",
  SAMPLES = "/samples",
  REPORTS = "/reports",
  ATTACHED_REPORT = "/attachedReport",
  LOGIN = "/login",
  AUTH = "/auth",
  ANALYSIS_METHODS = "/analysisMethods",
  ANALYTES = "/analytes",
  CLIENTS = "/clients",
  CRITERIAS = "/criterias",
  SAMPLE_TYPES = "/sampleTypes",
  TESTS = "/tests",
  TEST_TYPES = "/testTypes",
}

export enum Routes {
  LOGIN = `${BaseRoutes.AUTH}/login`,
  LOGOUT = `${BaseRoutes.AUTH}/logout`,
  ME = `${BaseRoutes.AUTH}/me`,
}
