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

export function LobbyCreatePage() {
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError(null)
    setIsLoading(true)

    try {
      const lobby = await createLobby(name)
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
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
    } finally {
      setIsLoading(false)
    }
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
            <Button disabled={isLoading} type="submit">
              {isLoading ? 'Creating...' : 'Create lobby'}
            </Button>
          </form>

          {error && (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              Failed to create lobby: {error}
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
