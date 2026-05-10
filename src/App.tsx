import { useQuote } from "./hooks/useQuote";
import { QuotePage } from "./components/QuotePage";

export default function App() {
  const { quote, loading, error } = useQuote();

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <p className="text-secondary text-sm tracking-wide">...</p>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="min-h-screen bg-bg font-sans flex flex-col items-center justify-center p-8 text-center">
        <p className="text-[1.75rem] leading-[1.7] font-light max-w-[600px] text-primary">
          "Begin at once to live, and count each separate day as a separate life."
        </p>
        <p className="text-sm text-secondary mt-8">Seneca</p>
      </div>
    );
  }

  return <QuotePage quote={quote} />;
}
