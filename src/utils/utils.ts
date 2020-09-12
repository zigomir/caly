import { IDay, MonthNumber, Year } from 'cntdys'

const isCurrentMonth = (day: IDay, year: number, month: number) =>
  day.month.month === month && day.month.year === year

const isWeekend = (day: IDay) => day.dayInWeek === 6 || day.dayInWeek === 0

const isToday = (day: IDay, today: Date) =>
  day.dayInMonth === today.getDate() &&
  day.month.month === today.getMonth() + 1 &&
  day.month.year === today.getFullYear()

interface CalendarDay {
  day: number
  year: Year
  month: MonthNumber
}

const isSelected = (weekDay: IDay, { day, year, month }: CalendarDay) =>
  day === weekDay.dayInMonth &&
  month === weekDay.month.month &&
  year === weekDay.month.year

export const selectedDayToCalendarDay = (selectedDay?: string) => {
  if (!selectedDay) return

  const [year, month, day] = selectedDay
    .split('-')
    .map(piece => parseInt(piece, 10))
  return { day, month, year }
}

export const dayClass = ({
  weekDay,
  month,
  year,
  selectedDay,
  rangeStart,
  rangeEnd,
  hoverDay,
  disableOnDay,
}: {
  weekDay: IDay
  month: MonthNumber
  year: number
  selectedDay?: CalendarDay
  rangeStart?: CalendarDay
  rangeEnd?: CalendarDay
  hoverDay?: IDay,
  disableOnDay?: (timestamp: number) => boolean,
}) => {
  const classes = ['day']
  if (isWeekend(weekDay)) {
    classes.push('weekend')
  }
  if (isToday(weekDay, new Date())) {
    classes.push('today')
  }
  classes.push(
    isCurrentMonth(weekDay, year, month) ? 'current-month' : 'other-month'
  )
  if (selectedDay && isSelected(weekDay, selectedDay)) {
    classes.push('selected')
  }

  const thisDayTs = Date.UTC(
    weekDay.month.year,
    weekDay.month.month - 1,
    weekDay.dayInMonth
  )

  if (rangeStart && (hoverDay || rangeEnd)) {
    const rangeStartTs = Date.UTC(
      rangeStart.year,
      rangeStart.month - 1,
      rangeStart.day
    )
    const hoverOrRangeEndTs = rangeEnd
      ? Date.UTC(rangeEnd.year, rangeEnd.month - 1, rangeEnd.day)
      : hoverDay
      ? Date.UTC(
          hoverDay.month.year,
          hoverDay.month.month - 1,
          hoverDay.dayInMonth
        )
      : undefined

    if (
      rangeStartTs &&
      hoverOrRangeEndTs &&
      ((thisDayTs >= rangeStartTs && thisDayTs <= hoverOrRangeEndTs) ||
        (thisDayTs <= rangeStartTs && thisDayTs >= hoverOrRangeEndTs))
    ) {
      classes.push('in-range')
    }
  }

  if (rangeStart && !rangeEnd) {
    classes.push('range-select-in-progress')
  }

  if (disableOnDay && disableOnDay(thisDayTs)) {
    classes.push('disabled')
  }

  return classes.join(' ')
}

export const dayNames = (startOfTheWeek: number, locale = 'en-US') => {
  const days = [...Array(7).keys()].map(
    d =>
      new Date(2017, 9, d + 1) // must not use UTC here
        .toLocaleString(locale, { weekday: 'long' })
        .slice(0, 2) // TODO: think of exposing this
  )

  for (let i = 6; i > 6 - startOfTheWeek; i--) {
    const day = days.shift()
    if (day) {
      days.push(day)
    }
  }

  return days
}

export const monthName = (year: number, month: number, locale = 'en-US') =>
  new Date(year, month - 1).toLocaleString(locale, { month: 'long' }) // must not use UTC here

export const range = n => Array.from(Array(n).keys())
