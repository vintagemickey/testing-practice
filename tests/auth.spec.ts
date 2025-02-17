import { test, expect } from "@playwright/test";

test("Пользователь может авторизоваться и выйти", async ({ page }) => {
    await page.goto("http://localhost:3000"); // Открываем страницу

    // Проверяем, что пользователь видит кнопку "Авторизоваться"
    const loginButton = page.getByRole("button", { name: "Авторизоваться" });
    await expect(loginButton).toBeVisible();

    // Нажимаем "Авторизоваться"
    await loginButton.click();

    // Проверяем, что появилось модальное окно с формой
    const modal = page.getByTestId('modal-background');
    await expect(modal).toBeVisible();

    // Проверяем, что поля ввода присутствуют
    const emailInput = page.locator("input[type='email']");
    const passwordInput = page.locator("input[type='password']");
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    // Вводим **неправильный email** и проверяем валидацию
    await emailInput.fill("invalid-email");
    await passwordInput.fill("123");
    await page.getByRole("button", { name: "Войти" }).click();

    // Ожидаем, что валидация покажет ошибку
    await expect(page.getByText("Валидация не пройдена")).toBeVisible();

    // Вводим **правильные данные**
    await emailInput.fill("tester@gmail.com");
    await passwordInput.fill("12345678");
    await page.getByRole("button", { name: "Войти" }).click();

    // Проверяем, что пользователь авторизован
    await expect(page.getByText("Вы авторизованы")).toBeVisible();
    await expect(page.getByRole("button", { name: "Выйти" })).toBeVisible();

    // Нажимаем "Выйти"
    await page.getByRole("button", { name: "Выйти" }).click();

    // Проверяем, что пользователь разлогинился
    await expect(page.getByRole("button", { name: "Авторизоваться" })).toBeVisible();
});
