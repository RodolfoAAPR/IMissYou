"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [hearts, setHearts] = useState<Array<{ id: number; x: number }>>([])
  const [timeData, setTimeData] = useState({
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const heartIdRef = useRef(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const images = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-10-23%20%C3%A0%28s%29%2020.26.49_ecf429cf-wfXnE9ossoN1tkyZdVkrMW5rrKdOT6.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-10-23%20%C3%A0%28s%29%2020.29.37_4c8fa57b-8xZNIKkxZoDMrlFX4iSheLoFPdQiq4.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-10-23%20%C3%A0%28s%29%2020.27.22_ca96b22e-Yr7vnyrdzcxd7e8ctATggm24cOrmQB.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-10-23%20%C3%A0%28s%29%2020.21.45_22dcbc63-OmHzFiSH2cqKMQcnbQLwKseM5F7hKi.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-10-23%20%C3%A0%28s%29%2020.22.10_07a6e9f0-9ajKI8G1fgnpnVfPv1LjRGVbQP2N06.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-10-23%20%C3%A0%28s%29%2020.27.39_06ec3e8f-rHiPfFjhBKuS1cuvzqKcDwGxWUnSAx.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-10-23%20%C3%A0%28s%29%2020.28.08_53b3ab28-kScPQtTZA5njDK5zrTsXk7r6YfAI8E.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-10-23%20%C3%A0%28s%29%2020.27.05_37dc8e6f-Szj8bZROx7Gbe6AC7ryQ47KDEGKFTz.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-10-23%20%C3%A0%28s%29%2020.27.16_193da423-m7d3JxOWjczVrXiQnOBmfgj6HVERLE.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/V%C3%ADdeo%20do%20WhatsApp%20de%202025-10-23%20%C3%A0%28s%29%2020.29.19_9808647c-YoidR1lDNeXgCks1MLW4QNyrAdr0Lg.mp4",
  ]

  const calculateTimeDifference = () => {
    const startDate = new Date("2023-07-21")
    const today = new Date()

    let years = today.getFullYear() - startDate.getFullYear()
    let months = today.getMonth() - startDate.getMonth()
    let days = today.getDate() - startDate.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      days += prevMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    const weeks = Math.floor(days / 7)
    const remainingDays = days % 7

    const hours = today.getHours()
    const minutes = today.getMinutes()
    const seconds = today.getSeconds()

    setTimeData({
      years,
      months,
      weeks,
      days: remainingDays,
      hours,
      minutes,
      seconds,
    })
  }

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.5
          await audioRef.current.play()
        } catch (error) {
          console.log("Audio autoplay prevented")
        }
      }
    }
    playAudio()
  }, [])

  useEffect(() => {
    calculateTimeDifference()
    const interval = setInterval(calculateTimeDifference, 1000)
    return () => clearInterval(interval)
  }, [])

  const createHeart = (e: React.MouseEvent) => {
    const newHeart = {
      id: heartIdRef.current++,
      x: e.clientX,
    }
    setHearts((prev) => [...prev, newHeart])
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
    }, 4000)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const isVideo = images[currentImageIndex]?.endsWith(".mp4")

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 flex flex-col items-center justify-center p-4 relative overflow-hidden"
      onClick={createHeart}
    >
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

      {hearts.map((heart) => (
        <div key={heart.id} className="floating-heart text-pink-400" style={{ left: `${heart.x}px` }}>
          ♥
        </div>
      ))}

      <audio
        ref={audioRef}
        loop
        crossOrigin="anonymous"
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      <div className="max-w-2xl w-full space-y-8 relative z-10">
        <div className="relative">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-pink-400">
            {isVideo ? (
              <video
                src={images[currentImageIndex]}
                className="w-full h-full object-cover"
                controls
                crossOrigin="anonymous"
              />
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
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-pink-400 hover:bg-pink-500 text-white p-3 rounded-full transition-all z-20 shadow-lg"
            aria-label="Foto anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-pink-400 hover:bg-pink-500 text-white p-3 rounded-full transition-all z-20 shadow-lg"
            aria-label="Próxima foto"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>

        <div className="text-center space-y-6">
          <p className="text-2xl text-pink-300 font-light">Te amando desde</p>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg p-4 shadow-lg">
                <p className="text-4xl font-black text-white time-number">{timeData.years}</p>
                <p className="text-pink-100 text-xs font-semibold mt-1">ANOS</p>
              </div>
              <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg p-4 shadow-lg">
                <p className="text-4xl font-black text-white time-number">{timeData.months}</p>
                <p className="text-rose-100 text-xs font-semibold mt-1">MESES</p>
              </div>
              <div className="bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 rounded-lg p-4 shadow-lg">
                <p className="text-4xl font-black text-white time-number">{timeData.weeks}</p>
                <p className="text-fuchsia-100 text-xs font-semibold mt-1">SEMANAS</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 shadow-lg">
                <p className="text-4xl font-black text-white time-number">{timeData.days}</p>
                <p className="text-purple-100 text-xs font-semibold mt-1">DIAS</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-4 shadow-lg">
                <p className="text-3xl font-black text-white time-number">{String(timeData.hours).padStart(2, "0")}</p>
                <p className="text-indigo-100 text-xs font-semibold mt-1">HORAS</p>
              </div>
              <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg p-4 shadow-lg">
                <p className="text-3xl font-black text-white time-number">
                  {String(timeData.minutes).padStart(2, "0")}
                </p>
                <p className="text-violet-100 text-xs font-semibold mt-1">MINUTOS</p>
              </div>
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg p-4 shadow-lg">
                <p className="text-3xl font-black text-white time-number">
                  {String(timeData.seconds).padStart(2, "0")}
                </p>
                <p className="text-pink-100 text-xs font-semibold mt-1">SEGUNDOS</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Link
            href="/sentimentos"
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 px-12 rounded-xl transition-all transform hover:scale-105 shadow-lg text-lg"
          >
            Ver mais
          </Link>
        </div>
      </div>

      <div className="absolute top-8 left-8 text-pink-400 text-4xl opacity-40">♥</div>
      <div className="absolute bottom-8 right-8 text-pink-400 text-4xl opacity-40">♥</div>
    </main>
  )
}
