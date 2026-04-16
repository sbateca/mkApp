import axios from "axios";
import {getUserByUserName} from "./userService";

const mockUsers = [
  {
    name: "John Doe",
    username: "johndoe",
  },
  {
    name: "Jane Doe",
    username: "janedoe",
  },
];
jest.mock("../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));
jest.mock("axios");

describe("userService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a user by username", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({data: mockUsers[0]});
    const expectedURL = "http://mockurl.com/api/users?username=johndoe";

    const user = await getUserByUserName({username: "johndoe"});

    expect(user).toEqual(mockUsers[0]);
    expect(axios.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should throw an error when an error occurs in get", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error("Mock error"));

    try {
      await getUserByUserName({username: "johndoe"});
    } catch (error) {
      expect((error as Error).message).toBe(
        "Error retrieving user by username johndoe.",
      );
    }
  });
});
