import { validateEmail } from "./";

describe("validateEmail function", () => {
  it("should return true for valid email", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("test@example.gov.ru")).toBe(true); //проверка поддоменов
    expect(validateEmail("te.st-ok@example.com")).toBe(true); //проверка спец символов
    expect(validateEmail("1234567890@example.com")).toBe(true); //проверка содержания только цифр
  });

  it("should return false for missing @", () => {
    expect(validateEmail("testexample.com")).toBe(false);
  });

  it("should return false for multiple @ symbols", () => {
    expect(validateEmail("test@@example.com")).toBe(false);
  });

  it("should return false for missing domain", () => {
    expect(validateEmail("test@.com")).toBe(false);
    expect(validateEmail("test@com")).toBe(false);
  });

  it("should return false for missing username", () => {
    expect(validateEmail("@example.com")).toBe(false);
  });

  it("should return false for invalid characters", () => {
    expect(validateEmail("te st@example.com")).toBe(false); // Пробел в адресе
    expect(validateEmail("test@ex ample.com")).toBe(false); // Пробел в домене
    expect(validateEmail("test@ex!ample.com")).toBe(false); // Запрещенные символы
  });

});
