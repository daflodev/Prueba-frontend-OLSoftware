interface CardProps { children: React.ReactNode; className?: string }

export const Card = ({ children, className }: CardProps) => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
        {children}
    </div>
);

Card.Header = ({ children }: CardProps) => <div className="p-4 border-b bg-gray-50">{children}</div>;
Card.Body = ({ children }: CardProps) => <div className="">{children}</div>;