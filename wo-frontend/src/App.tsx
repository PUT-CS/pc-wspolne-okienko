import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { LobbyCreatePage } from './pages/LobbyCreatePage'
import { LobbyDetailsPage } from './pages/LobbyDetailsPage'
import { JoinLobbyPage } from './pages/JoinLobbyPage'

function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center p-6">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Wspolne Okienko</h1>
        <p className="text-sm text-zinc-500">Create and share your lobby in one click.</p>
        <Link className="text-sm font-medium text-zinc-900 underline" to="/lobby">
          Go to lobby form
        </Link>
      </div>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lobby" element={<LobbyCreatePage />} />
      <Route path="/lobby/:id" element={<LobbyDetailsPage />} />
      <Route path="/join/:id" element={<JoinLobbyPage />} />
      <Route path="*" element={<Navigate replace to="/lobby" />} />
    </Routes>
  )
}

export default App
