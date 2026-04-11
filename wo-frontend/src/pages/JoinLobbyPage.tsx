import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { joinLobby } from '../lib/api'

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unknown error'
}

export function JoinLobbyPage() {
  const { id } = useParams<{ id: string }>()
  const [lobbyName, setLobbyName] = useState('')
  const [userName, setUserName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const joinLobbyMutation = useMutation({
    mutationFn: joinLobby,
    onSuccess: () => {
      setSuccess(true)
      setUserName('')
    },
    onError: (mutationError) => {
      setError(getErrorMessage(mutationError))
    },
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!id) {
      setError('Missing lobby id in URL.')
      return
    }

    setError(null)
    setSuccess(false)

    joinLobbyMutation.mutate({
      lobbyId: id,
      lobbyName,
      userName,
    })
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl items-center p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Join lobby</CardTitle>
          <CardDescription>Enter the lobby details to join.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-zinc-600">
            Lobby ID from link: <span className="font-medium">{id ?? 'unknown'}</span>
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="lobbyName">Lobby name</Label>
              <Input
                id="lobbyName"
                value={lobbyName}
                onChange={(event) => setLobbyName(event.target.value)}
                placeholder="Friday planning"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userName">Your name</Label>
              <Input
                id="userName"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                placeholder="Sebas"
                required
              />
            </div>

            <Button disabled={joinLobbyMutation.isPending} type="submit">
              {joinLobbyMutation.isPending ? 'Joining...' : 'Join lobby'}
            </Button>
          </form>

          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              Failed to join lobby: {error}
            </p>
          )}

          {success && (
            <p className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
              Joined successfully.
            </p>
          )}

          <Link className="inline-block text-sm text-zinc-600 underline" to="/">
            Back to home
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}
