"use client";

import { useEffect } from "react";

const LIQUID_SELECTOR = "[data-liquid]";

function getLiquidElement(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest<HTMLElement>(LIQUID_SELECTOR);
}

function updateLiquidPosition(element: HTMLElement, event: PointerEvent) {
  const rect = element.getBoundingClientRect();

  if (!rect.width || !rect.height) {
    return;
  }

  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  element.style.setProperty("--liquid-x", `${x.toFixed(2)}%`);
  element.style.setProperty("--liquid-y", `${y.toFixed(2)}%`);
}

export function LiquidGlassController() {
  useEffect(() => {
    function handlePointerOver(event: PointerEvent) {
      const element = getLiquidElement(event.target);

      if (!element) {
        return;
      }

      element.dataset.liquidHovered = "true";
      updateLiquidPosition(element, event);
    }

    function handlePointerMove(event: PointerEvent) {
      const element = getLiquidElement(event.target);

      if (!element) {
        return;
      }

      updateLiquidPosition(element, event);
    }

    function handlePointerOut(event: PointerEvent) {
      const element = getLiquidElement(event.target);

      if (!element) {
        return;
      }

      const relatedElement = getLiquidElement(event.relatedTarget);

      if (relatedElement === element) {
        return;
      }

      element.dataset.liquidHovered = "false";
      element.dataset.liquidPressed = "false";
    }

    function handlePointerDown(event: PointerEvent) {
      const element = getLiquidElement(event.target);

      if (!element) {
        return;
      }

      element.dataset.liquidPressed = "true";
      updateLiquidPosition(element, event);
    }

    function handlePointerUp(event: PointerEvent) {
      const element = getLiquidElement(event.target);

      if (!element) {
        return;
      }

      element.dataset.liquidPressed = "false";
      updateLiquidPosition(element, event);
    }

    function resetStates() {
      document.querySelectorAll<HTMLElement>(LIQUID_SELECTOR).forEach((element) => {
        element.dataset.liquidHovered = "false";
        element.dataset.liquidPressed = "false";
      });
    }

    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerout", handlePointerOut);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("blur", resetStates);

    return () => {
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("blur", resetStates);
    };
  }, []);

  return null;
}
