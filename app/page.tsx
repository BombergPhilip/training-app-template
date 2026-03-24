"use client";
import * as React from "react";
//import { Calendar } from "@/components/ui/calendar";

function CalendarWeekNumbers() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 3),
  );

  return (
    <div className="grid min-h-screen grid-cols-[1fr_320px] gap-0">
      {/* Center content */}
      <section className="border-r border-zinc-300 bg-zinc-50 p-6">
        <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white">
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-semibold">Main content</h2>
            <p className="text-zinc-500">
              Her kan du vise dagens workout, programmer eller oversigt.
            </p>
          </div>
        </div>
      </section>

      {/* Right column */}
      <aside className="grid grid-rows-[140px_140px_1fr] gap-4 bg-white p-4">
        <div className="grid grid-cols-[1fr_110px] overflow-hidden rounded-2xl border border-zinc-300">
          <div className="p-4">
            <h3 className="mb-2 text-2xl font-semibold">Profile</h3>
            <p className="text-sm text-zinc-500">Din profil og hurtig info</p>
          </div>

          <div className="flex flex-col items-center justify-center border-l border-zinc-300 bg-zinc-50 p-2">
            <div className="mb-2 h-16 w-16 rounded-full bg-zinc-300" />
            <span className="text-xs font-medium">MOTFLS</span>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-300 p-4">
          <h3 className="mb-2 text-2xl font-semibold">Kalender</h3>
          <p className="text-sm text-zinc-500">
            Vis kommende træninger og aftaler
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-300 p-4">
          <h3 className="mb-4 text-2xl font-semibold">Progress chart</h3>

          <div className="flex h-[260px] items-end gap-3 rounded-xl bg-zinc-50 p-4">
            <div
              className="w-full rounded-t-md bg-zinc-300"
              style={{ height: "20%" }}
            />
            <div
              className="w-full rounded-t-md bg-zinc-400"
              style={{ height: "35%" }}
            />
            <div
              className="w-full rounded-t-md bg-zinc-300"
              style={{ height: "28%" }}
            />
            <div
              className="w-full rounded-t-md bg-zinc-400"
              style={{ height: "50%" }}
            />
            <div
              className="w-full rounded-t-md bg-zinc-300"
              style={{ height: "40%" }}
            />
            <div
              className="w-full rounded-t-md bg-zinc-400"
              style={{ height: "70%" }}
            />
            <div
              className="w-full rounded-t-md bg-zinc-500"
              style={{ height: "88%" }}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
