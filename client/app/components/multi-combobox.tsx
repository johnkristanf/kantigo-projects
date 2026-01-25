import { useRef, useEffect, useState, type SetStateAction, type Dispatch } from "react"

// Generic reusable MultiSelectCombobox
type ComboboxOption = {
    id: number | string
    label: string
    [key: string]: any
}

type MultiSelectComboboxProps<T extends ComboboxOption> = {
    options: T[]
    selected: T[]
    setSelected: Dispatch<SetStateAction<T[]>>
    renderOptionLabel?: (option: T) => React.ReactNode
    renderSelectedLabel?: (option: T) => React.ReactNode
    placeholder?: string
    searchPlaceholder?: string
    disabled?: boolean
}

export function MultiSelectCombobox<T extends ComboboxOption>({
    options,
    selected,
    setSelected,
    renderOptionLabel,
    renderSelectedLabel,
    placeholder,
    searchPlaceholder = "Search...",
    disabled = false,
}: MultiSelectComboboxProps<T>) {
    const [open, setOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const popoverRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLDivElement>(null)

    // Close popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setOpen(false)
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClickOutside)
            return () => document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [open])

    const filteredOptions = options.filter(
        (item) =>
            (!searchValue ||
                item.label.toLowerCase().includes(searchValue.toLowerCase())) &&
            !selected.some((sel) => sel.id === item.id)
    )

    const toggleOption = (option: T) => {
        setSelected((prev) =>
            prev.some((o) => o.id === option.id)
                ? prev.filter((o) => o.id !== option.id)
                : [...prev, option]
        )
    }

    const removeOption = (optionId: T["id"]) => {
        setSelected((prev) => prev.filter((o) => o.id !== optionId))
    }

    return (
        <div className="relative w-full">
            {/* Trigger */}
            <div
                ref={triggerRef}
                onClick={() => !disabled && setOpen((prev) => !prev)}
                className={[
                    "flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                    "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    "disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
                    disabled ? "pointer-events-none opacity-50" : ""
                ].join(" ")}
                tabIndex={disabled ? -1 : 0}
                aria-disabled={disabled}
            >
                <div className="flex flex-wrap gap-1 flex-1">
                    {selected.length > 0 ? (
                        selected.map((option) => (
                            <span
                                key={option.id}
                                className="inline-flex items-center gap-1 rounded-sm bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                            >
                                {renderSelectedLabel ? renderSelectedLabel(option) : option.label}
                                <button
                                    type="button"
                                    onClick={e => {
                                        e.stopPropagation()
                                        removeOption(option.id)
                                    }}
                                    className="ml-1 rounded-sm hover:bg-secondary-foreground/20"
                                    tabIndex={-1}
                                >
                                    <svg
                                        className="h-3 w-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </span>
                        ))
                    ) : (
                        <span className="text-muted-foreground">{placeholder || ""}</span>
                    )}
                </div>
                <svg
                    className="h-4 w-4 shrink-0 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                </svg>
            </div>

            {/* Popover Content */}
            {open && !disabled && (
                <div
                    ref={popoverRef}
                    className="absolute z-50 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95"
                >
                    {/* Search Input */}
                    <div className="flex items-center border-b px-3">
                        <svg
                            className="mr-2 h-4 w-4 shrink-0 opacity-50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="max-h-[300px] overflow-y-auto overflow-x-hidden p-1">
                        {filteredOptions.length > 0 ? (
                            <div role="group">
                                {filteredOptions.map((option) => (
                                    <div
                                        key={option.id}
                                        onClick={() => {
                                            toggleOption(option)
                                            setSearchValue("")
                                        }}
                                        className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50"
                                    >
                                        <svg
                                            className={`mr-2 h-4 w-4 ${selected.some((o) => o.id === option.id)
                                                ? "opacity-100"
                                                : "opacity-0"
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        {renderOptionLabel ? renderOptionLabel(option) : option.label}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                No items found.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

// USAGE EXAMPLE: Specialized UsersCombobox
import type { User, UserWithPositions } from "~/types/users"

type UsersComboboxProps = {
    userLists: UserWithPositions[]
    selectedUsers: User[]
    setSelectedUsers: Dispatch<SetStateAction<User[]>>
    placeholder?: string
    searchPlaceholder?: string
    disabled?: boolean
}
