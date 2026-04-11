export type LobbyResponse = {
  id: string
  name: string
  users: Record<string, unknown>
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

export async function createLobby(name: string): Promise<LobbyResponse> {
  const response = await fetch(`${API_BASE_URL}/lobby`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || `Request failed with status ${response.status}`)
  }

  return (await response.json()) as LobbyResponse
}


