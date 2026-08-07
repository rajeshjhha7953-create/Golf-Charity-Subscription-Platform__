import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  Check,
  Globe,
  Eye,
  EyeOff,
  GitBranch,
  Lock,
  Loader2,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { user, signIn, signUp } = useAuth()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (isLogin) {
        await signIn(email, password)
      } else {
        await signUp(email, password)
        setError("Check your email for confirmation link")
      }
      router.push("/dashboard")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthClick = (provider) => {
    setError("")
    setLoading(true)

    window.setTimeout(() => {
      setLoading(false)
      setError(`${provider} OAuth is not yet connected to this Supabase flow.`)
    }, 450)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-emerald-500/30 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-teal-600/30 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[1fr_420px]">
          <section className="hidden px-4 lg:block">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
                <Sparkles className="h-6 w-6 text-emerald-300" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/90">
                  CourseIQ
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  Golf Intelligence
                </h1>
              </div>
            </div>

            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                <Sparkles className="h-4 w-4" />
                Club Platform
              </div>

              <h2 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-white">
                Turn performance into your next advantage.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">
                Access your club intelligence dashboard, competition activity,
                and performance analytics from one secure workspace.
              </p>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Live
                    </span>
                  </div>
                  <p className="mt-4 text-2xl font-bold text-white">24/7</p>
                  <p className="text-xs text-slate-400">Insights</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Secure
                    </span>
                  </div>
                  <p className="mt-4 text-2xl font-bold text-white">01</p>
                  <p className="text-xs text-slate-400">Workspace</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Score
                    </span>
                  </div>
                  <p className="mt-4 text-2xl font-bold text-white">+12%</p>
                  <p className="text-xs text-slate-400">Growth</p>
                </div>
              </div>
            </div>
          </section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/12 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl md:p-8"
          >
            <div className="absolute -right-20 -top-14 h-40 w-40 rounded-full bg-emerald-300/30 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-blue-300/30 blur-2xl" />

            <div className="relative">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
                    <Sparkles className="h-4 w-4" />
                    Member Access
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    {isLogin ? "Welcome back" : "Create account"}
                  </h2>
                </div>

                <div className="rounded-full border border-white/20 bg-white/10 p-2">
                  <Sparkles className="h-6 w-6 text-emerald-300" />
                </div>
              </div>

              <div className="mb-6 grid grid-cols-2 rounded-2xl border border-white/10 bg-slate-950/40 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setError("")
                    setIsLogin(true)
                  }}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    isLogin
                      ? "bg-white text-slate-950 shadow-lg"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setError("")
                    setIsLogin(false)
                  }}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    !isLogin
                      ? "bg-white text-slate-950 shadow-lg"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {error && (
                <div className="mb-4 rounded-xl border border-red-300/30 bg-red-500/15 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleOAuthClick("Google")}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20 disabled:opacity-70"
                >
                  <Globe className="h-4 w-4" />
                  Continue with Google
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuthClick("GitHub")}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20 disabled:opacity-70"
                >
                  <GitBranch className="h-4 w-4" />
                  Continue with GitHub
                </button>
              </div>

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/15" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                  Or continue with email
                </span>
                <div className="h-px flex-1 bg-white/15" />
              </div>

              <AnimatePresence mode="wait">
                <motion.form
                  key={isLogin ? "login" : "signup"}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.20em] text-slate-300">
                      Email address
                    </span>
                    <div className="flex items-center rounded-2xl border border-white/10 bg-slate-950/50 px-4 transition focus-within:border-emerald-300/70 focus-within:ring-2 focus-within:ring-emerald-300/30">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                        required
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.20em] text-slate-300">
                      Password
                    </span>
                    <div className="flex items-center rounded-2xl border border-white/10 bg-slate-950/50 px-4 transition focus-within:border-emerald-300/70 focus-within:ring-2 focus-within:ring-emerald-300/30">
                      <Lock className="h-4 w-4 text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                        required
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-slate-400 transition hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </label>

                  <div className="flex items-center justify-between gap-4">
                    <label className="flex items-center gap-2 text-xs font-medium text-slate-300">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-slate-950/70 text-emerald-400 accent-emerald-500"
                      />
                      Remember me
                    </label>

                    <button
                      type="button"
                      className="text-xs font-semibold text-emerald-200 transition hover:text-white"
                      onClick={() => setError("Password reset is not available in this build.")}
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-3 font-bold text-slate-950 shadow-lg shadow-emerald-950/30 transition hover:from-emerald-300 hover:to-teal-400 disabled:cursor-not-allowed disabled:opacity-80"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {isLogin ? "Signing in" : "Creating"}
                      </>
                    ) : (
                      <>
                        {isLogin ? "Login to dashboard" : "Create account"}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center pt-2">
                    <span className="text-xs text-slate-400">
                      {isLogin ? "New to CourseIQ?" : "Already have an account?"}
                    </span>
                    <button
                      type="button"
                      className="ml-2 text-xs font-bold text-emerald-200 transition hover:text-white"
                      onClick={() => setIsLogin(!isLogin)}
                    >
                      {isLogin ? "Create account" : "Login"}
                    </button>
                  </div>
                </motion.form>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
                <ShieldCheck className="h-4 w-4" />
                Protected workspace
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  )
}
