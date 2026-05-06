import { useMemo } from 'react';
import type { TimeSlot } from '../lib/mockData';
import {
  getRowForTime,
  getSpanForTimeSlot,
  minutesToTime,
} from '../lib/mockData';

interface WeeklyCalendarProps {
  userSchedules: Map<string, TimeSlot[]>;
  userColors: Map<string, string>;
}

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const START_HOUR = 8;
const END_HOUR = 18;
const TOTAL_ROWS = (END_HOUR - START_HOUR) * 12;

export function WeeklyCalendar({
  userSchedules,
  userColors,
}: WeeklyCalendarProps) {
  const blocks = useMemo(() => {
    const result: Array<{
      day: string;
      userId: string;
      startRow: number;
      rowSpan: number;
    }> = [];

    userSchedules.forEach((timeSlots, userId) => {
      timeSlots.forEach((slot) => {
        const startRow = getRowForTime(slot.startTime);
        const rowSpan = getSpanForTimeSlot(slot.startTime, slot.endTime);
        result.push({
          day: slot.day,
          userId,
          startRow,
          rowSpan,
        });
      });
    });

    return result;
  }, [userSchedules]);

  const timeLabels = useMemo(() => {
    const labels = [];
    for (let i = 0; i < TOTAL_ROWS; i += 12) {
      labels.push({
        row: i,
        time: minutesToTime(i * 5),
      });
    }
    return labels;
  }, []);

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-zinc-200 bg-white">
      <div className="inline-block min-w-full">
        <div className="flex">
          <div className="w-12 flex-shrink-0 border-r border-zinc-200 bg-zinc-50" />
          {DAYS.map((day) => (
            <div
              key={day}
              className="flex-1 border-r border-zinc-200 bg-zinc-50 px-2 py-3 text-center text-sm font-semibold text-zinc-700"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="flex">
          <div className="w-12 flex-shrink-0 border-r border-zinc-200 bg-zinc-50">
            {timeLabels.map((label) => (
              <div
                key={label.time}
                className="relative border-b border-zinc-100 text-xs text-zinc-500"
                style={{ height: `${12 * 3}px` }}
              >
                <span className="absolute right-1 top-0 translate-y-0">
                  {label.time}
                </span>
              </div>
            ))}
          </div>

          {DAYS.map((day) => (
            <div
              key={day}
              className="flex-1 border-r border-zinc-200 relative"
              style={{
                display: 'grid',
                gridTemplateRows: `repeat(${TOTAL_ROWS}, minmax(3px, 1fr))`,
              }}
            >
              {blocks
                .filter((block) => block.day === day)
                .map((block) => {
                  const color = userColors.get(block.userId);
                  return (
                    <div
                      key={`block-${day}-${block.userId}-${block.startRow}`}
                      className="border border-zinc-400 rounded-sm"
                      style={{
                        gridRow: `${block.startRow + 1} / span ${block.rowSpan}`,
                        backgroundColor: color,
                        opacity: 0.85,
                        zIndex: 10,
                      }}
                      title={`User: ${block.userId}`}
                    />
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
