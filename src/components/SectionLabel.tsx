export default function SectionLabel({ number, children }: {
    number: string;
    children: React.ReactNode;
}) {
    return <div className="section-label"><span>{children}</span><span>{number}</span></div>;
}
