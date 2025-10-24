"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"

export default function SentimentosPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const images = [
    "/couple-memory-1.jpg",
    "/couple-memory-2.jpg",
    "/couple-memory-3.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-10-23%20%C3%A0%28s%29%2020.24.44_fea688c7-p3ArdYscV70mFbhfXuuhb4Bqx78eR6.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-10-23%20%C3%A0%28s%29%2020.24.02_e1cf8733-63kOQIpcwDKS7yi19jynZeQa5nsKXH.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-10-23%20%C3%A0%28s%29%2020.22.56_1287f599-oTSGWWqlydgfHtU5Xgcd0c5V8NrrFI.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/V%C3%ADdeo%20do%20WhatsApp%20de%202025-10-24%20%C3%A0%28s%29%2000.22.35_16db2437-vZ4EIZzqxBCudFcBG0zP9VSxcgbl5i.mp4",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-10-24%20%C3%A0%28s%29%2000.10.12_8551ca73-5369fVS8PO2MhlVY5bKASanWpUBb2k.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-10-23%20%C3%A0%28s%29%2020.25.20_6e910a38-5IiddESQ49NJmQyUO00xKXA53nIe5C.jpg",
  ]

  useEffect(() => {
    const calculateTime = () => {
      const startDate = new Date("2025-08-07")
      const now = new Date()

      let years = now.getFullYear() - startDate.getFullYear()
      let months = now.getMonth() - startDate.getMonth()
      let days = now.getDate() - startDate.getDate()

      if (days < 0) {
        months--
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
        days += prevMonth.getDate()
      }

      if (months < 0) {
        years--
        months += 12
      }

      const weeks = Math.floor(days / 7)
      const remainingDays = days % 7

      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()

      setTimeElapsed({
        years,
        months,
        weeks,
        days: remainingDays,
        hours,
        minutes,
        seconds,
      })
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const whatsappLink = `https://wa.me/5544997498466?text=${encodeURIComponent("também sinto sua falta, london")}`

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-400 opacity-20 text-6xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-hearts ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <div className="max-w-2xl w-full space-y-8 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors">
          <ArrowLeft size={20} />
          Voltar
        </Link>

        <div className="relative">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-pink-400">
            {images[currentImageIndex]?.endsWith(".mp4") ? (
              <video src={images[currentImageIndex]} controls className="w-full h-full object-cover" />
            ) : (
              <img
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={`Memória ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-pink-400 hover:bg-pink-500 text-white p-3 rounded-full transition-all z-20 shadow-lg"
            aria-label="Foto anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-pink-400 hover:bg-pink-500 text-white p-3 rounded-full transition-all z-20 shadow-lg"
            aria-label="Próxima foto"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>

        <div className="text-center">
          <p className="text-2xl text-pink-300 font-light">Sentindo sua falta em todos os lugares e momentos</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg p-4 shadow-lg">
              <p className="text-4xl font-black text-white time-number">{timeElapsed.years}</p>
              <p className="text-pink-100 text-xs font-semibold mt-1">ANOS</p>
            </div>
            <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg p-4 shadow-lg">
              <p className="text-4xl font-black text-white time-number">{timeElapsed.months}</p>
              <p className="text-rose-100 text-xs font-semibold mt-1">MESES</p>
            </div>
            <div className="bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 rounded-lg p-4 shadow-lg">
              <p className="text-4xl font-black text-white time-number">{timeElapsed.weeks}</p>
              <p className="text-fuchsia-100 text-xs font-semibold mt-1">SEMANAS</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 shadow-lg">
              <p className="text-4xl font-black text-white time-number">{timeElapsed.days}</p>
              <p className="text-purple-100 text-xs font-semibold mt-1">DIAS</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-4 shadow-lg">
              <p className="text-3xl font-black text-white time-number">{String(timeElapsed.hours).padStart(2, "0")}</p>
              <p className="text-indigo-100 text-xs font-semibold mt-1">HORAS</p>
            </div>
            <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg p-4 shadow-lg">
              <p className="text-3xl font-black text-white time-number">
                {String(timeElapsed.minutes).padStart(2, "0")}
              </p>
              <p className="text-violet-100 text-xs font-semibold mt-1">MINUTOS</p>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg p-4 shadow-lg">
              <p className="text-3xl font-black text-white time-number">
                {String(timeElapsed.seconds).padStart(2, "0")}
              </p>
              <p className="text-pink-100 text-xs font-semibold mt-1">SEGUNDOS</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 px-12 rounded-xl transition-all transform hover:scale-105 shadow-lg text-lg"
          >
            Clique aqui
          </a>
        </div>
      </div>

      <div className="absolute top-8 left-8 text-pink-400 text-4xl opacity-40">♥</div>
      <div className="absolute bottom-8 right-8 text-pink-400 text-4xl opacity-40">♥</div>
    </main>
  )
}
