import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal component", () => {
    let handleClose: jest.Mock;

    beforeEach(() => {
        handleClose = jest.fn();
        document.body.innerHTML = '<div id="portal"></div>'; // Создаём контейнер для портала
    });

    test("отображается при isOpen=true", () => {
        render(
            <Modal isOpen={true} handleClose={handleClose}>
                <p>Modal content</p>
            </Modal>
        );

        expect(screen.getByText("Modal content")).toBeInTheDocument();
    });

    test("не рендерится при isOpen=false", () => {
        render(
            <Modal isOpen={false} handleClose={handleClose}>
                <p>Modal content</p>
            </Modal>
        );

        expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
    });

    test("закрывается при клике на фон", () => {
        render(
            <Modal isOpen={true} handleClose={handleClose}>
                <p>Modal content</p>
            </Modal>
        );

        fireEvent.click(screen.getByTestId("modal-background")); // Кликаем на фон

        expect(handleClose).toHaveBeenCalled();
    });

    test("закрывается при клике на крестик", () => {
        render(
            <Modal isOpen={true} handleClose={handleClose}>
                <p>Modal content</p>
            </Modal>
        );

        fireEvent.click(screen.getByText("X")); // Кликаем по кнопке закрытия

        expect(handleClose).toHaveBeenCalled();
    });

    test("закрывается при нажатии Escape", () => {
        render(
            <Modal isOpen={true} handleClose={handleClose}>
                <p>Modal content</p>
            </Modal>
        );

        fireEvent.keyDown(document, { key: "Escape" }); // Нажимаем Escape

        expect(handleClose).toHaveBeenCalled();
    });
});
