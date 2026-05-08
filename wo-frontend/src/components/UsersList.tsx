import type { User } from '../lib/api'

interface UsersListProps {
  users: User[]
  userColors: Map<string, string> // userId -> pastel color
}

export function UsersList({ users, userColors }: UsersListProps) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {users.map((user) => {
        const color = userColors.get(user.id)
        return (
          <div
            key={user.id}
            className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm"
          >
            <div
              className="h-3 w-3 flex-shrink-0 rounded-full border border-zinc-300"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
            <span className="text-zinc-700">{user.name}</span>
            {user.picture_data && (
              <img
                src={user.picture_data}
                alt={user.name}
                className="ml-1 h-5 w-5 flex-shrink-0 rounded-full"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
