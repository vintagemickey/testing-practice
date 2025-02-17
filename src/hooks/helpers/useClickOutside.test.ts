import { renderHook } from "@testing-library/react";
import { useClickOutside } from "../useClickOutside";
import React, { act } from "react";

describe("useClickOutside", () => {
    let callback: jest.Mock;
    let ref: React.MutableRefObject<HTMLDivElement | null>;

    beforeEach(() => {
        callback = jest.fn();
        ref = { current: document.createElement("div") }; // Создаем элемент
        document.body.appendChild(ref.current); // Добавляем в DOM
    });

    afterEach(() => {
        document.body.removeChild(ref.current!); // Удаляем после теста
    });

    test("вызывает callback при клике вне элемента", () => {
        renderHook(() => useClickOutside(callback, ref));

        act(() => {
            document.body.click(); // Кликаем вне элемента
        });

        expect(callback).toHaveBeenCalled();
    });

    test("не вызывает callback при клике внутри элемента", () => {
        renderHook(() => useClickOutside(callback, ref));

        act(() => {
            ref.current!.click(); // Кликаем внутри
        });

        expect(callback).not.toHaveBeenCalled();
    });

    test("отключает обработчик событий после размонтирования", () => {
        const { unmount } = renderHook(() => useClickOutside(callback, ref));

        unmount(); // Размонтируем хук

        act(() => {
            document.body.click(); // Кликаем после размонтирования
        });

        expect(callback).not.toHaveBeenCalled(); // Не должен вызываться
    });
});
