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

export const selectedDayToCalendarDay = (selectedDay: string) => {
  const [day, month, year] = selectedDay
    .split('-')
    .map(piece => parseInt(piece, 10))
  return { day, month, year }
}

export const dayClass = ({
  weekDay,
  month,
  year,
  selectedDay,
}: {
  weekDay: IDay
  month: MonthNumber
  year: number
  selectedDay?: CalendarDay
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
