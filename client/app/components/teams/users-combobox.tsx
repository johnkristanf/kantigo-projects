import { useRef, useEffect, useState, type SetStateAction, type Dispatch } from "react"
import type { User, UserWithPositions } from "~/types/users"

type UsersComboboxProps = {
    userLists: UserWithPositions[]
    selectedUsers: User[]
    setSelectedUsers: Dispatch<SetStateAction<User[]>>
    placeholder?: string
}

export const UsersCombobox = ({
    userLists,
    selectedUsers,
    setSelectedUsers,
    placeholder = "Select members..."
}: UsersComboboxProps) => {

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

    const filteredUsers = userLists.filter(
        (user) =>
            user.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            !selectedUsers.some((selected) => selected.id === user.id)
    )

    const toggleUser = (user: User) => {
        setSelectedUsers((prev) =>
            prev.some((u) => u.id === user.id)
                ? prev.filter((u) => u.id !== user.id)
                : [...prev, user]
        )
    }

    const removeUser = (userId: number) => {
        setSelectedUsers((prev) => prev.filter((u) => u.id !== userId))
    }

    return (
        <div className="relative w-full">
            {/* Trigger - mimics shadcn Button with Popover */}
            <div
                ref={triggerRef}
                onClick={() => setOpen(!open)}
                className="flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
                <div className="flex flex-wrap gap-1 flex-1">
                    {selectedUsers.length > 0 ? (
                        selectedUsers.map((user) => (
                            <span
                                key={user.id}
                                className="inline-flex items-center gap-1 rounded-sm bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                            >
                                {user.name}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeUser(user.id)
                                    }}
                                    className="ml-1 rounded-sm hover:bg-secondary-foreground/20"
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
                        <span className="text-muted-foreground">{placeholder}</span>
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

            {/* Popover Content - mimics shadcn Command */}
            {open && (
                <div
                    ref={popoverRef}
                    className="absolute z-50 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95"
                >
                    {/* Command Input */}
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
                            placeholder="Search users..."
                            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    {/* Command List */}
                    <div className="max-h-[300px] overflow-y-auto overflow-x-hidden p-1">
                        {filteredUsers.length > 0 ? (
                            <div role="group">
                                {filteredUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        onClick={() => {
                                            toggleUser(user)
                                            setSearchValue("")
                                        }}
                                        className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50"
                                    >
                                        <svg
                                            className={`mr-2 h-4 w-4 ${selectedUsers.some((u) => u.id === user.id)
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
                                        {user.name}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                No users found.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}