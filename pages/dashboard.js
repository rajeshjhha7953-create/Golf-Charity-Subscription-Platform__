// ==============================
// File: dashboard.js
// Purpose: Main user dashboard showing subscription status, scores, charity, and winnings
// ==============================

import { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import {
  Activity,
  BarChart3,
  Bell,
  ChevronDown,
  CreditCard,
  DollarSign,
  HandCoins,
  LayoutDashboard,
  Menu,
  Settings,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  Users,
  X,
} from "lucide-react"
import Navbar from "../components/Navbar"
import { useAuth } from "../contexts/AuthContext"
import { supabase } from "../lib/supabase"

export default function Dashboard() {
  // Store user's score history
  const [scores, setScores] = useState([])
  // Store selected charity
  const [charity, setCharity] = useState(null)
  // Store total winnings amount
  const [winnings, setWinnings] = useState(0)
  // Store subscription details
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  // Track if user has active subscription
  const [isSubscribed, setIsSubscribed] = useState(false)

  const router = useRouter()
  const { user } = useAuth()

  // List of available charities
  const charityList = [
    { id: 1, name: "Helping Hands" },
    { id: 2, name: "Green Earth" },
    { id: 3, name: "Health First" },
  ]

  // Check subscription status when user logs in
  useEffect(() => {
    if (user) {
      checkSubscription()
    }
  }, [user])

  // Function: checkSubscription
  // Purpose: Verify if user has active subscription
  const checkSubscription = async () => {
    // Fetch subscription from database
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle()

    // No subscription found
    if (!data) {
      setIsSubscribed(false)
      setSubscription(null)
      setLoading(false)
      return
    }

    // Check if subscription is active and not expired
    const isValid = data.status === "active" && new Date(data.end_date) > new Date()

    setSubscription(data)
    setIsSubscribed(isValid)
    setLoading(false)

    // Load user data if subscription is valid
    if (isValid) {
      fetchData()
    }
  }

  // Function: fetchData
  // Purpose: Load scores, charity, and winnings for the user
  const fetchData = async () => {
    try {
      // Fetch user's scores
      const { data: scoreData } = await supabase
        .from("scores")
        .select("score")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5)

      setScores(scoreData?.map(s => s.score) || [])

      // Fetch user's selected charity
      const { data: userCharity } = await supabase
        .from("user_charities")
        .select("charity_id")
        .eq("user_id", user.id)
        .maybeSingle()

      if (userCharity) {
        const found = charityList.find(c => c.id === userCharity.charity_id)
        setCharity(found || null)
      }

      // Fetch all winnings and calculate total
      const { data: winningsData } = await supabase
        .from("winnings")
        .select("amount")
        .eq("user_id", user.id)

      const total = winningsData?.reduce((sum, w) => sum + (w.amount || 0), 0) || 0
      setWinnings(total)
    } catch (err) {
      console.error("Fetch error:", err)
    }
  }

  // Reusable card component for dashboard sections
  const Card = ({ title, children }) => (
    <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
      <h3 className="text-gray-400 text-sm mb-3 tracking-wide">{title}</h3>
      {children}
    </div>
  )

  // Show loading while checking authentication
  if (!user || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <Navbar />
        <div className="p-6 flex items-center justify-center min-h-[calc(100vh-64px)]">
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect to subscription page if no active subscription
  if (!isSubscribed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <Navbar />
        <div className="p-6 flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-2xl p-8 shadow-lg max-w-md text-center hover:shadow-xl transition-all">
            <h2 className="text-2xl font-bold mb-4 tracking-wide">
              {subscription ? `Subscription: ${subscription.status}` : "No Subscription"}
            </h2>
            <p className="text-gray-400 mb-6">
              Subscribe to access all features.
            </p>
            {/* Navigate to subscription page */}
            <button
              onClick={() => router.push("/subscribe")}
              className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl px-5 py-2 hover:scale-105 transition-transform"
            >
              {subscription ? "Renew" : "Subscribe Now"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Main dashboard view for subscribed users
  return (
    <>
      <Head>
        <title>Golf Charity Subscription Platform</title>
        <meta name="description" content="Modern golf club management platform with subscriptions, tournaments, charity fundraising, leaderboards and analytics." />
      </Head>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-emerald-500/30 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-teal-600/30 blur-3xl" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
                  <Sparkles className="h-4 w-4" />
                  Golf Charity
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Dashboard
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-slate-300 transition hover:bg-white/20">
                  <Bell className="h-4 w-4" />
                </button>
                <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">
                  <UserRound className="h-4 w-4" />
                  <span>{user?.email || "Member"}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-[1.75rem] border border-white/15 bg-white/12 p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 p-2 text-emerald-300">
                    <Users className="h-5 w-5" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                    Members
                  </span>
                </div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                  Total Members
                </p>
                <div className="mt-4 flex items-end justify-between">
                  <span className="text-3xl font-bold tracking-tight text-white">24</span>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-200">
                    +12.8%
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="rounded-[1.75rem] border border-white/15 bg-white/12 p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 p-2 text-emerald-300">
                    <HandCoins className="h-5 w-5" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                    Charity
                  </span>
                </div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                  Charity Raised
                </p>
                <div className="mt-4 flex items-end justify-between">
                  <span className="text-3xl font-bold tracking-tight text-white">₹{(250000).toLocaleString()}</span>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-200">
                    Live
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="rounded-[1.75rem] border border-white/15 bg-white/12 p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 p-2 text-emerald-300">
                    <Target className="h-5 w-5" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                    Draws
                  </span>
                </div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                  Active Draws
                </p>
                <div className="mt-4 flex items-end justify-between">
                  <span className="text-3xl font-bold tracking-tight text-white">08</span>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-200">
                    Open
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="rounded-[1.75rem] border border-white/15 bg-white/12 p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 p-2 text-emerald-300">
                    <DollarSign className="h-5 w-5" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                    Revenue
                  </span>
                </div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                  Monthly Revenue
                </p>
                <div className="mt-4 flex items-end justify-between">
                  <span className="text-3xl font-bold tracking-tight text-white">₹{(72000).toLocaleString()}</span>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-200">
                    +8.1%
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
              <section className="rounded-[2rem] border border-white/15 bg-white/12 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
                      <BarChart3 className="h-4 w-4" />
                      Analytics
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-white">
                      Performance Overview
                    </h2>
                  </div>
                  <button className="rounded-2xl border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.20em] text-slate-300 transition hover:bg-white/10">
                    30 Days
                  </button>
                </div>

                <div className="grid min-h-[260px] grid-cols-12 items-end gap-2 rounded-[1.5rem] border border-white/10 bg-slate-950/30 px-4 py-6">
                  {[42, 70, 48, 88, 62, 94, 58, 78, 68, 90, 55, 72].map((height, idx) => (
                    <div key={idx} className="flex h-full flex-col justify-end">
                      <div
                        className="w-full rounded-t-xl bg-gradient-to-t from-emerald-500 to-teal-300/90"
                        style={{ height: `${height}px` }}
                      />
                    </div>
                  ))}
                </div>
              </section>

              <aside className="rounded-[2rem] border border-white/15 bg-white/12 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
                      <Activity className="h-4 w-4" />
                      Status
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-white">
                      Club Health
                    </h2>
                  </div>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-200">
                    Online
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.20em] text-slate-400">
                        Membership
                      </span>
                      <span className="text-sm font-bold text-white">82%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[82%] rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.20em] text-slate-400">
                        Draw Pool
                      </span>
                      <span className="text-sm font-bold text-white">₹26K</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[64%] rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.20em] text-slate-400">
                        Charity Balance
                      </span>
                      <span className="text-sm font-bold text-white">₹12K</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[46%] rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" />
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Card title="Your Subscription">
                {subscription && (
                  <div className="space-y-2">
                    <p className="text-gray-400">Plan: <span className="text-white font-semibold capitalize">{subscription.plan}</span></p>
                    <p className="text-gray-400">Status: <span className="text-green-400 font-semibold">{subscription.status}</span></p>
                    <p className="text-gray-400">Expires: {new Date(subscription.end_date).toLocaleDateString()}</p>
                  </div>
                )}
              </Card>

              <Card title="Last 5 Scores">
                <p className="text-xl font-semibold">
                  {scores.length > 0 ? scores.join(", ") : "No scores yet"}
                </p>
              </Card>

              <Card title="Selected Charity">
                <p className="text-xl font-semibold text-purple-400">
                  {charity ? charity.name : "Not selected"}
                </p>
              </Card>

              <Card title="Total Winnings">
                <p className="text-3xl font-bold text-green-400">₹{winnings.toLocaleString()}</p>
              </Card>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => router.push("/scores")}
                className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl px-5 py-2 hover:scale-105 transition-transform"
              >
                Add Scores
              </button>
              <button
                onClick={() => router.push("/charity")}
                className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl px-5 py-2 transition-all"
              >
                Select Charity
              </button>
              <button
                onClick={() => router.push("/draw")}
                className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl px-5 py-2 transition-all"
              >
                Run Draw
              </button>
              <button
                onClick={() => router.push("/profile")}
                className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl px-5 py-2 transition-all"
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}