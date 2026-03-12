import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListingModule from './pages/ListingModule';

function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Lucid Dashboard</h1>
      <p className="mt-2 text-gray-600">
        This is the new React app shell. Use the navigation above to open the Listing Module.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-gray-900">
        <header className="border-b bg-white">
          <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-[0.18em] uppercase text-slate-500">
                Lucid
              </span>
              <span className="text-sm text-slate-400">Prototype App</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link to="/" className="text-slate-600 hover:text-slate-900">
                Home
              </Link>
              <Link
                to="/listing"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700"
              >
                Listing Module
              </Link>
            </div>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listing" element={<ListingModule />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
