import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { Quote } from "../types/quote";

export function useQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuote() {
      const now = new Date();
      const month = now.getMonth() + 1;
      const day = now.getDate();

      const { data, error: queryError } = await supabase.rpc(
        "get_quote_for_date",
        { p_month: month, p_day: day }
      );

      if (queryError) {
        setError(queryError.message);
      } else if (data && data.length > 0) {
        setQuote(data[0] as Quote);
      }

      setLoading(false);
    }

    fetchQuote();
  }, []);

  return { quote, loading, error };
}
