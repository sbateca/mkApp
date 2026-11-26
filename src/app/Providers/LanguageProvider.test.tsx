import {fireEvent, render, screen, within} from "@testing-library/react";
import {LanguageSelect} from "../../features/language/ui/LanguageSelect";
import {LANGUAGE_STORAGE_KEY} from "../../shared/i18n/language";
import {useInterfaceTranslation} from "../../shared/i18n/useInterfaceTranslation";
import {LanguageProvider} from "./LanguageProvider";

const Form = () => {
  const {t} = useInterfaceTranslation();
  return (
    <>
      <LanguageSelect />
      <label>
        {t("Sample code")}
        <input />
      </label>
    </>
  );
};

const renderForm = () =>
  render(
    <LanguageProvider>
      <Form />
    </LanguageProvider>,
  );

afterEach(() => {
  localStorage.removeItem(LANGUAGE_STORAGE_KEY);
  document.documentElement.lang = "";
});

it("defaults to Spanish and preserves form input and language preference when switched", async () => {
  const {unmount} = renderForm();
  expect(document.documentElement.lang).toBe("es");

  fireEvent.change(screen.getByLabelText("Código de muestra"), {
    target: {value: "MK-123"},
  });

  fireEvent.mouseDown(screen.getByRole("combobox", {name: "Idioma"}));
  fireEvent.click(
    within(screen.getByRole("listbox")).getByRole("option", {name: "English"}),
  );

  expect(await screen.findByLabelText("Sample code")).toHaveValue("MK-123");
  expect(document.documentElement.lang).toBe("en");
  expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe("en");

  unmount();
  renderForm();
  expect(screen.getByRole("combobox", {name: "Language"})).toHaveTextContent(
    "English",
  );
});
