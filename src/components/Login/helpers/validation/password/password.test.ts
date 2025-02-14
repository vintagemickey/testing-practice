import { validatePassword } from "./";

describe("validatePassword function", () => {
    it("should return true for valid numeric passwords with at least 8 digits", () => {
        expect(validatePassword("12345678")).toBe(true);
        expect(validatePassword("00000000")).toBe(true);
        expect(validatePassword("987654321")).toBe(true); // Длина больше 8
    });

    it("should return false for passwords shorter than 8 digits", () => {
        expect(validatePassword("1234567")).toBe(false); // 7 символов
        expect(validatePassword("1")).toBe(false);       // 1 символ
        expect(validatePassword("")).toBe(false);        // Пустая строка
    });

    it("should return false for passwords containing non-numeric characters", () => {
        expect(validatePassword("password")).toBe(false); // Только буквы
        expect(validatePassword("1234abcd")).toBe(false); // Цифры + буквы
        expect(validatePassword("1234 5678")).toBe(false); // Цифры + пробел
        expect(validatePassword("1234@5678")).toBe(false); // Цифры + спецсимвол
    });
});
