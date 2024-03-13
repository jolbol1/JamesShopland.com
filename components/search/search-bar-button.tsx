const ACTION_KEY_DEFAULT = "CTRL"

interface SearchBarButtonProps {
  onClick?: () => void
  kbd?: string
}

export const SearchBarButton = ({
  onClick,
  kbd = ACTION_KEY_DEFAULT,
}: SearchBarButtonProps) => {
  return (
    <button
      onClick={onClick}
      title="Search"
      className="mx-4 flex size-[34px] cursor-text items-center justify-center rounded-md border border-gray-800 bg-gray-50 px-2 text-sm hover:border-blue-600 hover:bg-gray-100 dark:border-gray-200 dark:bg-gray-900 dark:hover:border-blue-600 dark:hover:bg-gray-800 [@media(min-width:900px)]:w-[unset]"
    >
      <span className="my-2 block  w-4 [@media(min-width:900px)]:mr-2">
        <svg
          className="text-gray-800 dark:text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <span className="mr-8 hidden text-slate-600 dark:text-slate-300 [@media(min-width:980px)]:block">
        Search...
      </span>
      <kbd
        className={`hidden  whitespace-nowrap rounded px-1 align-middle font-medium leading-4 tracking-wide [font-size:10px] [@media(min-width:900px)]:inline-block ${"border border-slate-400/70 text-slate-500 dark:border-slate-600 dark:text-slate-400"}`}
      >
        {kbd}
      </kbd>
      <kbd
        className={`ml-1 hidden whitespace-nowrap rounded px-1 align-middle font-medium leading-4 tracking-wide [font-size:10px] [@media(min-width:900px)]:inline-block ${"border border-slate-400/70 text-slate-500 dark:border-slate-600 dark:text-slate-400"}`}
      >
        K
      </kbd>
    </button>
  )
}
