import ReactMarkdown from 'react-markdown';

interface ContentProps {
  content: string;
  className?: string;
}

export default function Content({ content, className }: ContentProps) {
  return <ReactMarkdown children={content} className={className} />;
}
