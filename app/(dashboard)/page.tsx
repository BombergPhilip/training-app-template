"use client";
import * as React from "react";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import WeightChart from "@/app/(dashboard)/profile/components/WeightChart";

function CalendarWeekNumbers() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 3)
  );

  return (
    <Card className="w-full border-0 bg-transparent shadow-none">
      <CardContent className="p-0">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={setDate}
            showWeekNumber
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="grid min-h-screen grid-cols-[1fr_340px] grid-rows-[90px_1fr]">
        <header className="col-span-2 flex items-center justify-between border-b border-zinc-300 bg-white px-6">
          <h1 className="text-3xl font-semibold tracking-wide">
            Welcome to Hopfit - Your First Steps Towards a Stronger You! 💪
          </h1>

          <Image
            src="/avatar.jpg"
            alt="Profil"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full"
          />
        </header>

        <section className="border-r border-zinc-300 bg-zinc-50 p-6">
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white">
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-semibold">Main content</h2>
              <p className="text-zinc-500">
                Here you can display today's workout, programs, or overview.
              </p>
            </div>
          </div>
        </section>

        <aside className="flex flex-col gap-4 border-l border-zinc-200 bg-zinc-50 p-4">
          <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Calender</h3>
              <p className="text-sm text-zinc-500">look at your upcoming events</p>
            </div>

            <CalendarWeekNumbers />
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">weight progression</h3>
              <p className="text-sm text-zinc-500">keep track of </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-3">
              <WeightChart data={[]} loading={false} />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}