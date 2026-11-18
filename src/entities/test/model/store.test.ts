import {buildTestsData} from "../../../shared/test/builders";
import {
  createTestService,
  deleteTestService,
  editTestService,
  getTestByIdService,
  getTestsService,
} from "../api/testService";
import {useTestStore} from "./store";

jest.mock("../api/testService", () => ({
  getTestsService: jest.fn(),
  getTestByIdService: jest.fn(),
  createTestService: jest.fn(),
  editTestService: jest.fn(),
  deleteTestService: jest.fn(),
}));

describe("useTestStore", () => {
  const mockTests = buildTestsData(2);

  beforeEach(() => {
    jest.clearAllMocks();
    useTestStore.setState({
      tests: null,
      selectedTest: null,
      isLoading: false,
      error: null,
    });
  });

  it("should set tests", () => {
    useTestStore.getState().setTests(mockTests);

    expect(useTestStore.getState().tests).toEqual(mockTests);
  });

  it("should set selected test", () => {
    useTestStore.getState().setSelectedTest(mockTests[0]);

    expect(useTestStore.getState().selectedTest).toEqual(mockTests[0]);
  });

  it("should get tests and update the store", async () => {
    (getTestsService as jest.Mock).mockResolvedValueOnce(mockTests);

    const tests = await useTestStore.getState().getTests();

    expect(tests).toEqual(mockTests);
    expect(useTestStore.getState().tests).toEqual(mockTests);
    expect(useTestStore.getState().isLoading).toBe(false);
  });

  it("should get test by id", async () => {
    (getTestByIdService as jest.Mock).mockResolvedValueOnce(mockTests[0]);

    const test = await useTestStore.getState().getTestById("1");

    expect(test).toEqual(mockTests[0]);
    expect(getTestByIdService).toHaveBeenCalledWith("1");
  });

  it("should create a test", async () => {
    (createTestService as jest.Mock).mockResolvedValueOnce(mockTests[0]);

    const test = await useTestStore.getState().createTest(mockTests[0]);

    expect(test).toEqual(mockTests[0]);
    expect(createTestService).toHaveBeenCalledWith(mockTests[0]);
  });

  it("should edit a test", async () => {
    (editTestService as jest.Mock).mockResolvedValueOnce(mockTests[0]);

    const test = await useTestStore.getState().editTest("1", mockTests[0]);

    expect(test).toEqual(mockTests[0]);
    expect(editTestService).toHaveBeenCalledWith("1", mockTests[0]);
  });

  it("should delete a test", async () => {
    (deleteTestService as jest.Mock).mockResolvedValueOnce(mockTests[0]);

    const test = await useTestStore.getState().deleteTest("1");

    expect(test).toBeUndefined();
    expect(deleteTestService).toHaveBeenCalledWith("1");
  });

  it("should set an error when deletion fails", async () => {
    (deleteTestService as jest.Mock).mockRejectedValueOnce(
      new Error("Delete failed"),
    );

    await useTestStore.getState().deleteTest("1");

    expect(useTestStore.getState().error).toBe("Delete failed");
  });

  it("should set an error when a service fails", async () => {
    (getTestsService as jest.Mock).mockRejectedValueOnce(
      new Error("Mock error"),
    );

    const tests = await useTestStore.getState().getTests();

    expect(tests).toBeNull();
    expect(useTestStore.getState().error).toBe("Mock error");
  });
});
