

type GameBodyProps = {
  ai_recap: string;
  ai_tags: string;
};

const GameBody = ({ ai_recap, ai_tags }: GameBodyProps) => {
  // Parse tags: split by comma, trim whitespace, filter out empty strings
  const tags = ai_tags
    ? ai_tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
    : [];

  return (
    <div className="px-5 py-5 space-y-5">
      {/* Recap section */}
      {ai_recap ? (
        <div className="space-y-2">
          <p className="text-sm md:text-base text-gray-700 leading-7">
            {ai_recap}
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic">No recap available</p>
      )}

      {/* Tags section */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-medium hover:bg-blue-700 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameBody;
