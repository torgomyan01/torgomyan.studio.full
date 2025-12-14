'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  CalendarDate,
  getLocalTimeZone,
  today,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isToday,
  isSameMonth,
} from '@internationalized/date';
import './custom-calendar.scss';

interface CustomCalendarProps {
  value: CalendarDate | null;
  onChange: (date: CalendarDate) => void;
  minValue?: CalendarDate;
}

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export default function CustomCalendar({
  value,
  onChange,
  minValue,
}: CustomCalendarProps) {
  const todayDate = today(getLocalTimeZone());
  const minDate = minValue || todayDate;

  // Track the displayed month separately from the selected value
  const [displayedMonth, setDisplayedMonth] = useState<CalendarDate>(() => {
    if (value) {
      return startOfMonth(value);
    }
    return startOfMonth(todayDate);
  });

  // Update displayed month when value changes
  useEffect(() => {
    if (value) {
      setDisplayedMonth(startOfMonth(value));
    }
  }, [value]);

  const calendarDate = displayedMonth;

  const firstDayOfMonth = useMemo(() => {
    return startOfWeek(calendarDate, 'ru');
  }, [calendarDate]);

  const lastDayOfMonth = useMemo(() => {
    return endOfWeek(endOfMonth(calendarDate), 'ru');
  }, [calendarDate]);

  const handlePrevMonth = () => {
    const newMonth = calendarDate.subtract({ months: 1 });
    setDisplayedMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = calendarDate.add({ months: 1 });
    setDisplayedMonth(newMonth);
  };

  const handleDateClick = (date: CalendarDate) => {
    if (date.compare(minDate) < 0) {
      return;
    }
    onChange(date);
  };

  const renderCalendarDays = () => {
    const days: CalendarDate[] = [];
    let currentDay = firstDayOfMonth;

    while (currentDay.compare(lastDayOfMonth) <= 0) {
      days.push(currentDay);
      currentDay = currentDay.add({ days: 1 });
    }

    const weeks: CalendarDate[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks.map((week, weekIndex) => (
      <tr key={weekIndex}>
        {week.map((day, dayIndex) => {
          const isSelected = value && isSameDay(day, value);
          const isDisabled = day.compare(minDate) < 0;
          const isCurrentDay = isToday(day, getLocalTimeZone());
          const isOtherMonth = !isSameMonth(day, calendarDate);

          return (
            <td key={dayIndex} className="calendar-cell">
              <button
                type="button"
                className={`calendar-day-button ${
                  isSelected ? 'selected' : ''
                } ${isDisabled ? 'disabled' : ''} ${
                  isCurrentDay ? 'today' : ''
                } ${isOtherMonth ? 'other-month' : ''}`}
                onClick={() => handleDateClick(day)}
                disabled={isDisabled}
              >
                {day.day}
              </button>
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className="custom-calendar-wrapper">
      <div className="calendar-header">
        <button
          type="button"
          className="calendar-nav-button prev-button"
          onClick={handlePrevMonth}
          aria-label="Предыдущий месяц"
        >
          ‹
        </button>
        <div className="calendar-month-year">
          <span className="month-name">
            {MONTHS[calendarDate.month - 1]} {calendarDate.year}
          </span>
        </div>
        <button
          type="button"
          className="calendar-nav-button next-button"
          onClick={handleNextMonth}
          aria-label="Следующий месяц"
        >
          ›
        </button>
      </div>
      <table className="calendar-table">
        <thead>
          <tr>
            {WEEKDAYS.map((day, index) => (
              <th key={index} className="calendar-weekday">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderCalendarDays()}</tbody>
      </table>
    </div>
  );
}
