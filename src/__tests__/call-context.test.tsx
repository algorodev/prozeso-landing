import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CallProvider, useCall } from "@/components/CallContext";

afterEach(cleanup);

function TestConsumer() {
  const {
    isCallActive,
    isCalling,
    callStartTime,
    setIsCallActive,
    setIsCalling,
  } = useCall();
  return (
    <div>
      <span data-testid="active">{String(isCallActive)}</span>
      <span data-testid="calling">{String(isCalling)}</span>
      <span data-testid="startTime">{String(callStartTime)}</span>
      <button type="button" onClick={() => setIsCallActive(true)}>
        start
      </button>
      <button type="button" onClick={() => setIsCallActive(false)}>
        stop
      </button>
      <button type="button" onClick={() => setIsCalling(true)}>
        setCalling
      </button>
    </div>
  );
}

describe("CallContext", () => {
  it("throws when useCall is used outside CallProvider", () => {
    const spy = { error: console.error };
    console.error = () => {};
    expect(() => render(<TestConsumer />)).toThrow(
      "useCall must be used within a CallProvider",
    );
    console.error = spy.error;
  });

  it("provides initial state", () => {
    render(
      <CallProvider>
        <TestConsumer />
      </CallProvider>,
    );
    expect(screen.getByTestId("active").textContent).toBe("false");
    expect(screen.getByTestId("calling").textContent).toBe("false");
    expect(screen.getByTestId("startTime").textContent).toBe("null");
  });

  it("setIsCallActive(true) sets callStartTime", () => {
    render(
      <CallProvider>
        <TestConsumer />
      </CallProvider>,
    );
    act(() => {
      screen.getByText("start").click();
    });
    expect(screen.getByTestId("active").textContent).toBe("true");
    expect(screen.getByTestId("startTime").textContent).not.toBe("null");
  });

  it("setIsCallActive(false) resets callStartTime and isCalling", () => {
    render(
      <CallProvider>
        <TestConsumer />
      </CallProvider>,
    );
    act(() => {
      screen.getByText("start").click();
    });
    act(() => {
      screen.getByText("setCalling").click();
    });
    expect(screen.getByTestId("calling").textContent).toBe("true");
    act(() => {
      screen.getByText("stop").click();
    });
    expect(screen.getByTestId("active").textContent).toBe("false");
    expect(screen.getByTestId("calling").textContent).toBe("false");
    expect(screen.getByTestId("startTime").textContent).toBe("null");
  });

  it("setIsCalling updates isCalling", () => {
    render(
      <CallProvider>
        <TestConsumer />
      </CallProvider>,
    );
    act(() => {
      screen.getByText("setCalling").click();
    });
    expect(screen.getByTestId("calling").textContent).toBe("true");
  });

  it("renders children inside provider", () => {
    render(
      <CallProvider>
        <span>child content</span>
      </CallProvider>,
    );
    expect(screen.getByText("child content")).toBeDefined();
  });
});
