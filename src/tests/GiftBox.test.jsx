import { render, screen, fireEvent } from "@testing-library/react";
import GiftBox from "../components/GiftBox";

describe("GiftBox", () => {
  test("opens on Enter key", async () => {
    render(<GiftBox reducedMotion={true} />);
    const box = screen.getByRole("button", { name: /open gift/i });
    fireEvent.keyDown(box, { key: "Enter" });
    expect(await screen.findByText(/Good luck/i)).toBeInTheDocument();
  });
});