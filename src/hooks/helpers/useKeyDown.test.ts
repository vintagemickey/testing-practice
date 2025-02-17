import { renderHook } from "@testing-library/react";
import { useKeyDown } from "../useKeyDown";
import { act } from "react";

describe("useKeyDown", () => {
    let callback: jest.Mock;

    beforeEach(() => {
        callback = jest.fn();
    });

    test("вызывает callback при нажатии на Enter", () => {
        renderHook(() => useKeyDown(["Enter"], callback));

        act(() => {
            const event = new KeyboardEvent("keydown", { key: "Enter" });
            document.dispatchEvent(event);
        });

        expect(callback).toHaveBeenCalled();
    });

    test("не вызывает callback при нажатии на другую клавишу", () => {
        renderHook(() => useKeyDown(["Enter"], callback));

        act(() => {
            const event = new KeyboardEvent("keydown", { key: "Escape" });
            document.dispatchEvent(event);
        });

        expect(callback).not.toHaveBeenCalled();
    });

    test("отключает обработчик после размонтирования", () => {
        const { unmount } = renderHook(() => useKeyDown(["Enter"], callback));

        unmount(); // Размонтируем хук

        act(() => {
            const event = new KeyboardEvent("keydown", { key: "Enter" });
            document.dispatchEvent(event);
        });

        expect(callback).not.toHaveBeenCalled();
    });
});
