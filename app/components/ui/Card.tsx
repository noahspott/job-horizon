interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-gray-800 text-gray-100 shadow rounded-lg ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`px-6 py-4 border-b border-gray-700 ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }: CardProps) {
  return <div className={`px-6 py-4 text-gray-300 ${className}`} {...props} />;
}
