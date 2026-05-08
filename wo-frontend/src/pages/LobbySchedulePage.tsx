import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { User } from '../lib/api';
import { getLobbyUsers } from '../lib/api';
import { getUserColor } from '../lib/colors';
import { getScheduleForUser, type TimeSlot } from '../lib/mockData';
import { WeeklyCalendar } from '../components/WeeklyCalendar';
import { UsersList } from '../components/UsersList';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

export function LobbySchedulePage() {
  const { lobbyId } = useParams<{ lobbyId: string }>();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lobbyId) return;

    async function fetchUsers(id: string) {
      try {
        const response = await getLobbyUsers(id);
        setUsers(response.users);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers(lobbyId);

    const interval = setInterval(() => fetchUsers(lobbyId), 5000);

    return () => clearInterval(interval);
  }, [lobbyId]);

  const userColors = new Map<string, string>();
  const userSchedules = new Map<string, TimeSlot[]>();

  users.forEach((user, index) => {
    userColors.set(user.id, getUserColor(index));
    userSchedules.set(user.id, getScheduleForUser(user.id));
  });

  return (
    <main className="mx-auto min-h-screen max-w-6xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900">Lobby Schedule</h1>
        <p className="mt-2 text-sm text-zinc-600">Lobby ID: {lobbyId}</p>
      </div>

      {error && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Error: {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
          <CardDescription>
            {loading
              ? 'Loading...'
              : `${users.length} user${users.length !== 1 ? 's' : ''} in lobby`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            {loading ? (
              <div className="flex items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 py-12">
                <p className="text-sm text-zinc-600">Loading schedule...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="flex items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 py-12">
                <p className="text-sm text-zinc-600">No users in lobby yet</p>
              </div>
            ) : (
              <WeeklyCalendar
                userSchedules={userSchedules}
                userColors={userColors}
              />
            )}
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">
              Users in Lobby
            </h3>
            {users.length === 0 ? (
              <p className="text-sm text-zinc-600">
                Waiting for users to join...
              </p>
            ) : (
              <UsersList users={users} userColors={userColors} />
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
