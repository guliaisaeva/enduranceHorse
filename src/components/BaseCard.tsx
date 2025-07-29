import React from "react";

interface BaseCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  description?: string;
  tagText?: string;
  tagColor?: string;
  bottomText?: string;
  buttonLabel?: string;
  onClick?: () => void;
}

const BaseCard: React.FC<BaseCardProps> = ({
  imageUrl,
  title,
  subtitle,
  description,
  tagText,
  tagColor = "bg-blue-700",
  bottomText,
  buttonLabel = "View",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="rounded overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white flex flex-col h-[300px] duration-200 transform hover:scale-105 cursor-pointer"
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover filter brightness-50"
        />
        {tagText && (
          <div
            className={`absolute top-2 left-2 text-white text-xs font-bold px-2 rounded ${tagColor}`}
          >
            {tagText}
          </div>
        )}
        {bottomText && (
          <div className="absolute bottom-2 left-2 bg-green-900 text-white text-xs px-2 py-0.5 rounded">
            {bottomText}
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col justify-between flex-grow text-center">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-400 my-1 truncate">{subtitle}</p>
          )}
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>

        <div className="mt-2 w-full">
          <button
            onClick={onClick}
            className="bg-[#0DA27E] text-white py-1 px-6 rounded w-full hover:bg-[#0C936F] transition"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseCard;
