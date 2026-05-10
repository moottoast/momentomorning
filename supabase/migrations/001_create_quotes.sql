CREATE TABLE quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  quote_text text NOT NULL,
  attribution text NOT NULL,
  reflection text NOT NULL,
  virtue text NOT NULL CHECK (virtue IN ('wisdom', 'courage', 'justice', 'temperance')),
  created_at timestamptz DEFAULT now()
);

CREATE OR REPLACE FUNCTION get_quote_for_date(p_month integer, p_day integer)
RETURNS SETOF quotes
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT *
  FROM quotes
  WHERE EXTRACT(MONTH FROM date) = p_month
    AND EXTRACT(DAY FROM date) = p_day
  ORDER BY date DESC
  LIMIT 1;
$$;

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read access"
  ON quotes
  FOR SELECT
  TO anon
  USING (true);

GRANT EXECUTE ON FUNCTION get_quote_for_date(integer, integer) TO anon;

INSERT INTO quotes (date, quote_text, attribution, reflection, virtue) VALUES
  ('2026-05-10', 'The happiness of your life depends upon the quality of your thoughts.', 'Marcus Aurelius, Meditations V.16', 'What will you give your attention to today?', 'wisdom'),
  ('2026-05-11', 'He who fears death will never do anything worthy of a man who is alive.', 'Seneca, Letters 77.6', 'What would you attempt if fear were not a factor?', 'courage'),
  ('2026-05-12', 'The best revenge is not to be like your enemy.', 'Marcus Aurelius, Meditations 6.6', 'How will you respond to unfairness today?', 'justice'),
  ('2026-05-13', 'No person is free who is not master of himself.', 'Epictetus, Fragment 35', 'Where does your discipline serve you most right now?', 'temperance');
