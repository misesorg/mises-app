'use client';

import * as React from 'react';
import { CalendarIcon } from "@radix-ui/react-icons"
import { format, addMonths, startOfMonth, endOfMonth } from "date-fns"
import { DateRange } from "react-day-picker"

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function CalendarDateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const today = new Date();
  const nextMonth = addMonths(today, 1);

  const initialDateRange: DateRange = {
    from: startOfMonth(today),
    to: endOfMonth(nextMonth),
  };

  const [date, setDate] = React.useState<DateRange | undefined>(initialDateRange);

  return (
    <div className='grid gap-2'>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={`w-[260px] justify-start text-left font-normal ${!date ? 'text-muted-foreground' : ''}`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}