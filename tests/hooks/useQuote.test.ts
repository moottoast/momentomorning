import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useQuote } from "../../src/hooks/useQuote";

vi.mock("../../src/lib/supabase", () => {
  const mockRpc = vi.fn();
  return {
    supabase: { rpc: mockRpc },
    __mockRpc: mockRpc,
  };
});

import { __mockRpc } from "../../src/lib/supabase";

function mockSupabaseResponse(data: unknown, error: unknown = null) {
  (__mockRpc as ReturnType<typeof vi.fn>).mockResolvedValue({ data, error });
}

describe("useQuote", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a quote for today's date", async () => {
    const mockQuote = {
      id: "abc-123",
      date: "2026-05-10",
      quote_text: "Test quote",
      attribution: "Test Author",
      reflection: "Test reflection?",
      virtue: "wisdom",
      created_at: "2026-05-10T00:00:00Z",
    };

    mockSupabaseResponse([mockQuote]);

    const { result } = renderHook(() => useQuote());

    await waitFor(() => {
      expect(result.current.quote).toEqual(mockQuote);
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("sets error when query fails", async () => {
    mockSupabaseResponse(null, { message: "Network error" });

    const { result } = renderHook(() => useQuote());

    await waitFor(() => {
      expect(result.current.error).toBe("Network error");
    });
    expect(result.current.quote).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("sets quote to null when no data returned", async () => {
    mockSupabaseResponse([]);

    const { result } = renderHook(() => useQuote());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.quote).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
