import './_styles.scss';

export default function InvestmentType({ content }: { content: string }) {
    return (
        <span className={`investiment-type-badge ${content}`}>{content}</span>
    );
}
