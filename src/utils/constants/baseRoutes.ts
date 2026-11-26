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

export enum ApiRoutes {
  ANALYSIS_METHODS = "/analysis-methods",
  CRITERIAS = "/criteria",
  SAMPLE_TYPES = "/sample-types",
  TEST_TYPES = "/test-types",
}

export enum Routes {
  LOGIN = `${BaseRoutes.AUTH}/login`,
  LOGOUT = `${BaseRoutes.AUTH}/logout`,
  ME = `${BaseRoutes.AUTH}/me`,
}
