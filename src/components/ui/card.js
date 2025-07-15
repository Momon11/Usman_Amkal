// src/components/ui/card.js

export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl shadow p-5 bg-white ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`mt-2 text-sm ${className}`}>{children}</div>;
}
