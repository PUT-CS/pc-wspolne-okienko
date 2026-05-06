export type LobbyResponse = {
  id: string;
  name: string;
  users: Record<string, unknown>;
};

export type User = {
  id: string;
  name: string;
  picture_data?: string | null;
};

export type GetLobbyUsersResponse = {
  users: User[];
};

export type JoinLobbyInput = {
  lobbyId: string;
  lobbyName: string;
  userName: string;
  pictureData?: string | null;
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

async function ensureOk(response: Response): Promise<void> {
  if (response.ok) {
    return;
  }

  const text = await response.text();
  throw new Error(text || `Request failed with status ${response.status}`);
}

export async function createLobby(name: string): Promise<LobbyResponse> {
  const response = await fetch(`${API_BASE_URL}/lobby`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  await ensureOk(response);

  return (await response.json()) as LobbyResponse;
}

export async function joinLobby(input: JoinLobbyInput): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lobby_id: input.lobbyId,
      lobby_name: input.lobbyName,
      user: {
        id: crypto.randomUUID(),
        name: input.userName,
        picture_data: input.pictureData ?? null,
      },
    }),
  });

  await ensureOk(response);
}

export async function getLobbyUsers(
  lobbyId: string,
): Promise<GetLobbyUsersResponse> {
  const response = await fetch(`${API_BASE_URL}/lobby/${lobbyId}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  await ensureOk(response);

  return (await response.json()) as GetLobbyUsersResponse;
}
