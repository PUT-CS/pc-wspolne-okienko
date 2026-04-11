import { Link, useLocation, useParams } from 'react-router-dom'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

type CopyStatus = 'copied' | 'failed'

type LobbyNavigationState = {
  name?: string
  joinUrl?: string
  copyStatus?: CopyStatus
}

export function LobbyDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const state = location.state as LobbyNavigationState | null

  const joinUrl = state?.joinUrl ?? (id ? `${window.location.origin}/join/${id}` : null)

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl items-center p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Lobby created</CardTitle>
          <CardDescription>Your lobby is ready to share.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">
            <span className="font-medium">Lobby ID:</span> {id ?? 'unknown'}
          </p>
          {state?.name && (
            <p className="text-sm">
              <span className="font-medium">Lobby name:</span> {state.name}
            </p>
          )}
          {joinUrl && (
            <div className="rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm">
              <p className="font-medium">Share link</p>
              <p className="break-all text-zinc-700">{joinUrl}</p>
              {state?.copyStatus === 'copied' && <p className="mt-1 text-emerald-700">Copied to clipboard.</p>}
              {state?.copyStatus === 'failed' && <p className="mt-1 text-amber-700">Clipboard blocked. Copy link manually.</p>}
            </div>
          )}
          <Link className="inline-block text-sm text-zinc-600 underline" to="/lobby">
            Create another lobby
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}
