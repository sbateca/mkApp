jest.mock("sweetalert2", () => ({
  __esModule: true,
  default: {
    fire: jest.fn(),
    mixin: jest.fn(() => ({ fire: jest.fn() })),
    close: jest.fn(),
    update: jest.fn(),
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
    isVisible: jest.fn(() => false),
  },
}));
