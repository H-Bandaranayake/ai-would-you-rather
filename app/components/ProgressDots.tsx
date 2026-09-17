export default function ProgressDots({ total, done }: { total: number; done: number }) {
  return (
    <>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`dot ${i < done ? "done" : ""}`} />
      ))}
    </>
  );
}
