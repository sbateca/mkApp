export enum BaseRoutes {
  ANY = "*",
  HOME = "/",
  SAMPLES = "/samples",
  REPORTS = "/reports",
  LOGIN = "/login",
  AUTH = "/auth",
  ANALYSIS_METHODS = "/analysisMethods",
  ANALYTES = "/analytes",
  CLIENTS = "/clients",
  CRITERIAS = "/criterias",
  SAMPLE_TYPES = "/sampleTypes",
}

export enum Routes {
  LOGIN = `${BaseRoutes.AUTH}/login`,
  LOGOUT = `${BaseRoutes.AUTH}/logout`,
  ME = `${BaseRoutes.AUTH}/me`,
}
