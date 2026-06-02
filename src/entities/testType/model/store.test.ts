import {TEST_TYPE_NOT_PROVIDED} from "../../../utils/constants";
import {
  createTestTypeService,
  deleteTestTypeService,
  editTestTypeService,
  getTestTypeByIdService,
  getTestTypesService,
} from "../api/testTypeService";
import {TestType} from "./TestType";
import {useTestTypeStore} from "./store";

const mockTestTypes: TestType[] = [
  {id: "1", name: "Physical"},
  {id: "2", name: "Microbiological"},
];

jest.mock("../api/testTypeService", () => ({
  getTestTypesService: jest.fn(),
  getTestTypeByIdService: jest.fn(),
  createTestTypeService: jest.fn(),
  editTestTypeService: jest.fn(),
  deleteTestTypeService: jest.fn(),
}));

describe("useTestTypeStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useTestTypeStore.setState({
      testTypes: null,
      selectedTestType: null,
      isLoading: false,
      error: null,
    });
  });

  it("should set test types", () => {
    useTestTypeStore.getState().setTestTypes(mockTestTypes);

    expect(useTestTypeStore.getState().testTypes).toEqual(mockTestTypes);
  });

  it("should set selected test type", () => {
    useTestTypeStore.getState().setSelectedTestType(mockTestTypes[0]);

    expect(useTestTypeStore.getState().selectedTestType).toEqual(
      mockTestTypes[0],
    );
  });

  it("should get test types and update the store", async () => {
    (getTestTypesService as jest.Mock).mockResolvedValueOnce(mockTestTypes);

    const testTypes = await useTestTypeStore.getState().getTestTypes();

    expect(testTypes).toEqual(mockTestTypes);
    expect(useTestTypeStore.getState().testTypes).toEqual(mockTestTypes);
    expect(useTestTypeStore.getState().isLoading).toBe(false);
  });

  it("should get test type by id", async () => {
    (getTestTypeByIdService as jest.Mock).mockResolvedValueOnce(
      mockTestTypes[0],
    );

    const testType = await useTestTypeStore.getState().getTestTypeById("1");

    expect(testType).toEqual(mockTestTypes[0]);
    expect(useTestTypeStore.getState().selectedTestType).toEqual(
      mockTestTypes[0],
    );
    expect(getTestTypeByIdService).toHaveBeenCalledWith("1");
  });

  it("should create a test type", async () => {
    (createTestTypeService as jest.Mock).mockResolvedValueOnce(
      mockTestTypes[0],
    );

    const testType = await useTestTypeStore
      .getState()
      .createTestType(mockTestTypes[0]);

    expect(testType).toEqual(mockTestTypes[0]);
    expect(createTestTypeService).toHaveBeenCalledWith(mockTestTypes[0]);
  });

  it("should edit a test type", async () => {
    (editTestTypeService as jest.Mock).mockResolvedValueOnce(mockTestTypes[0]);

    const testType = await useTestTypeStore
      .getState()
      .editTestType(mockTestTypes[0], "1");

    expect(testType).toEqual(mockTestTypes[0]);
    expect(editTestTypeService).toHaveBeenCalledWith(mockTestTypes[0], "1");
  });

  it("should delete a test type", async () => {
    (deleteTestTypeService as jest.Mock).mockResolvedValueOnce(
      mockTestTypes[0],
    );

    const testType = await useTestTypeStore.getState().deleteTestType("1");

    expect(testType).toEqual(mockTestTypes[0]);
    expect(deleteTestTypeService).toHaveBeenCalledWith("1");
  });

  it("should set an error when test type data is not provided", async () => {
    const testType = await useTestTypeStore.getState().deleteTestType("");

    expect(testType).toBeNull();
    expect(useTestTypeStore.getState().error).toBe(TEST_TYPE_NOT_PROVIDED);
  });

  it("should set an error when a service fails", async () => {
    (getTestTypesService as jest.Mock).mockRejectedValueOnce(
      new Error("Mock error"),
    );

    const testTypes = await useTestTypeStore.getState().getTestTypes();

    expect(testTypes).toBeNull();
    expect(useTestTypeStore.getState().error).toBe("Mock error");
  });
});
