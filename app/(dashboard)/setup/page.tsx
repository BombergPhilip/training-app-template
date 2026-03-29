"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DatePickerSimple() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [preview, setPreview] = React.useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[lab(96_-0.06_-1.09)] p-4">
      <div className="flex w-full max-w-md flex-col items-center">
        <div className="mb-7 flex w-full items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <img
            src="/logo.svg"
            alt="Training App logo"
            className="h-16 w-16 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm"
          />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>

        <form className="w-full space-y-5 rounded-2xl border bg-white p-8 shadow-lg">
          <Field>
            <div className="mt-3 flex justify-center">
              <label htmlFor="picture" className="cursor-pointer">
                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-100">
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-500">Upload</span>
                  )}
                </div>
              </label>
            </div>

            <Input
              id="picture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <FieldLabel className="block text-center">
              Profil Picture
            </FieldLabel>
          </Field>

          <Field>
            <FieldLabel htmlFor="date">Date of birth</FieldLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  id="date"
                  className="h-10 w-full justify-start text-left font-normal text-muted-foreground"
                >
                  {date ? date.toLocaleDateString("da-DK") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  defaultMonth={date}
                  captionLayout="dropdown"
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </Field>

          <Field>
            <FieldLabel htmlFor="weight">Weight</FieldLabel>
            <Input
              id="weight"
              type="number"
              placeholder="Enter weight"
              min={30}
              max={300}
              step={0.1}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="height">Height</FieldLabel>
            <Input
              id="height"
              type="number"
              placeholder="Enter height"
              min={100}
              max={250}
              step={0.1}
            />
          </Field>

          <Field>
            <FieldLabel>Gender</FieldLabel>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="man">Man</SelectItem>
                  <SelectItem value="woman">Woman</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Button
            type="submit"
            className="w-full bg-[#155dfc] text-white hover:bg-[#0f4de0]"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
