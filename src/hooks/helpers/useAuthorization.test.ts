import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useAuthorization } from "../useAuthorization";
import { authorizeUser } from "../../api";
import { LoginPayload } from "../../types";

jest.mock("../../api", () => ({
    authorizeUser: jest.fn(),
}));

describe("useAuthorization", () => {
    const mockSuccess = jest.fn();
    const mockError = jest.fn();
    const loginData: LoginPayload = { email: "tester@gmail.com", password: "12345678" };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("должен инициализироваться с isAuthorized=false", () => {
        const { result } = renderHook(() => useAuthorization({}));

        expect(result.current.isAuthorized).toBe(false);
    });

    test("успешная авторизация вызывает handleSuccess и устанавливает isAuthorized=true", async () => {
        (authorizeUser as jest.Mock).mockResolvedValueOnce({});

        const { result } = renderHook(() => useAuthorization({ handleSuccess: mockSuccess }));

        await act(async () => {
            await result.current.authorize(loginData);
        });

        expect(authorizeUser).toHaveBeenCalledWith(loginData);
        expect(mockSuccess).toHaveBeenCalledWith(loginData);
        expect(result.current.isAuthorized).toBe(true);
    });

    test("ошибка авторизации вызывает handleError", async () => {
        (authorizeUser as jest.Mock).mockRejectedValueOnce(new Error("Auth failed"));

        const { result } = renderHook(() => useAuthorization({ handleError: mockError }));

        await act(async () => {
            await result.current.authorize(loginData);
        });

        expect(authorizeUser).toHaveBeenCalledWith(loginData);
        expect(mockError).toHaveBeenCalled();
        expect(result.current.isAuthorized).toBe(false);
    });

    test("logout сбрасывает isAuthorized в false", () => {
        const { result } = renderHook(() => useAuthorization({}));

        act(() => {
            result.current.logout();
        });

        expect(result.current.isAuthorized).toBe(false);
    });
});
