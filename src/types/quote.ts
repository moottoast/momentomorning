export type Virtue = "wisdom" | "courage" | "justice" | "temperance";

export interface Quote {
  id: string;
  date: string;
  quote_text: string;
  attribution: string;
  reflection: string;
  virtue: Virtue;
  created_at: string;
}
