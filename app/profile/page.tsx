"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Image from "next/image";

import ProfileName from "@/components/profile/ProfileName";
import WeightCard from "@/components/profile/WeightCard";
import HeightCard from "@/components/profile/HeightCard";
import WeightChart from "@/components/profile/WeightChart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BecomeCoach } from "./components/become-coach";

type WeightLog = {
  timestamp: string;
  weight: number;
};

type ChartPoint = {
  date: string;
  weight: number;
};

export default function ProfileDashboard() {
  const [currentWeight, setCurrentWeight] = useState<number | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchWeightData = async () => {
    try {
      const res = await fetch("/api/auth/weight", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        const text = await res.text();
        console.log("GET status:", res.status);
        console.log("GET body:", text);
        throw new Error("Kunne ikke hente vægtdata");
      }

      const data: { currentWeight: number | null; logs: WeightLog[] } =
        await res.json();
      setCurrentWeight(data.currentWeight);
      setChartData(
        data.logs.map((log) => ({
          date: new Date(log.timestamp).toLocaleDateString("da-DK"),
          weight: log.weight,
        })),
      );
      console.log("GET data:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeightData();
  }, []);

  const handleSaveWeight = async (newWeight: number) => {
    try {
      setSaving(true);

      const res = await fetch("/api/auth/weight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ weight: newWeight }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.log("POST status:", res.status);
        console.log("POST body:", text);
        throw new Error(
          `Kunne ikke gemme vægt (status ${res.status}): ${text}`,
        );
      }

      await fetchWeightData();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="flex flex-1 min-w-0 flex-col">
        <div className="flex justify-end">
          <Button variant="destructive">Log out</Button>
        </div>

        <Image
          src="/avatar.jpg"
          alt="Profil"
          width={200}
          height={200}
          className="mx-auto mt-10 rounded-full"
        />

        <ProfileName />

        <main className="flex flex-1 flex-col gap-6 overflow-auto bg-gray-100 px-10 pt-10">
          <div className="grid grid-cols-2 gap-6">
            <WeightCard
              currentWeight={currentWeight}
              onSave={handleSaveWeight}
              saving={saving}
            />

            <div className="row-span-2">
              <WeightChart data={chartData} loading={loading} />
            </div>

            <HeightCard />
          </div>
        </main>
        <div className="flex justify-center p-10">
            <BecomeCoach />
        </div>
      </div>
    </div>
  );
}
