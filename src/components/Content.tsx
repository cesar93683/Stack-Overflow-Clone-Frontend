interface ContentProps {
  content: string;
}

interface ContentPart {
  isCode: boolean;
  content: string;
}

export default function Content({ content }: ContentProps) {
  let startIndex = 0;
  let isCode = false;
  const contentParts: Array<ContentPart> = [];
  for (let i = 0; i < content.length - 2; i++) {
    if (content.substring(i, i + 3) == '```') {
      if (startIndex !== -1) {
        contentParts.push({
          isCode,
          content: content.substring(startIndex, i),
        });
      }
      isCode = !isCode;
      startIndex = i + 3;
    }
  }
  if (startIndex !== content.length) {
    contentParts.push({ isCode, content: content.substring(startIndex) });
  }

  return (
    <div>
      {contentParts.map((part, i) =>
        part.isCode ? (
          <div className="p-2 bg-light-gray" key={i}>
            {part.content.split('\n').map((content, j) => (
              <p key={j} className="mb-1">
                {content}
              </p>
            ))}
          </div>
        ) : (
          part.content.split('\n').map((content, j) => (
            <p key={j} className="mb-1">
              {content}
            </p>
          ))
        )
      )}
    </div>
  );
}
