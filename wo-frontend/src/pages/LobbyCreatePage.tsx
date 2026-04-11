import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { createLobby } from '../lib/api'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

type CopyStatus = 'copied' | 'failed'

async function copyJoinLink(joinUrl: string): Promise<CopyStatus> {
  if (!navigator.clipboard?.writeText) {
    return 'failed'
  }

  try {
    await navigator.clipboard.writeText(joinUrl)
    return 'copied'
  } catch {
    return 'failed'
  }
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unknown error'
}

export function LobbyCreatePage() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const createLobbyMutation = useMutation({
    mutationFn: createLobby,
    onSuccess: async (lobby) => {
      const joinUrl = `${window.location.origin}/join/${lobby.id}`
      const copyStatus = await copyJoinLink(joinUrl)

      setName('')
      navigate(`/lobby/${lobby.id}`, {
        state: {
          name: lobby.name,
          joinUrl,
          copyStatus,
        },
      })
    },
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    createLobbyMutation.mutate(name)
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl items-center p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create lobby</CardTitle>
          <CardDescription>Create a new lobby and store it in PostgreSQL.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Lobby name</Label>
              <Input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Friday planning"
                minLength={1}
                required
              />
            </div>
            <Button disabled={createLobbyMutation.isPending} type="submit">
              {createLobbyMutation.isPending ? 'Creating...' : 'Create lobby'}
            </Button>
          </form>

          {createLobbyMutation.error && (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              Failed to create lobby: {getErrorMessage(createLobbyMutation.error)}
            </p>
          )}

          <Link className="mt-4 inline-block text-sm text-zinc-600 underline" to="/">
            Back to home
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}
