import { Component, Prop, Event, EventEmitter, h } from '@stencil/core'
import { dayClass, selectedDayToCalendarDay } from '../../utils/utils'
import { calendarMonth, IDay, getPreviousMonth, getNextMonth } from 'cntdys'

const dayNames = (startOfTheWeek: number, locale = 'en-US') => {
  const days = [...Array(7).keys()].map(d =>
    new Date(2017, 9, d + 1) // must not use UTC here
      .toLocaleString(locale, { weekday: 'long' })
      .slice(0, 2)
  )

  for (let i = 6; i > 6 - startOfTheWeek; i--) {
    const day = days.shift()
    if (day) {
      days.push(day)
    }
  }

  return days
}

const monthName = (year: number, month: number, locale = 'en-US') =>
  new Date(year, month - 1).toLocaleString(locale, { month: 'long' }) // must not use UTC here

const chromeBordersFix = (table: HTMLElement) => {
  table.style.borderSpacing = table.style.borderSpacing === '0px' ? '' : '0px'
}

@Component({
  tag: 'my-calendar',
  styleUrl: 'my-calendar.css',
  shadow: true,
})
export class MyCalendar {
  @Prop({ mutable: true, reflect: true }) year: number
  @Prop({ mutable: true, reflect: true }) month: number
  @Prop({ mutable: true, reflect: true }) selected: string // mm-dd-yyyy
  @Prop() locale: string = 'en-US'
  @Prop() startOfTheWeek: number = 0

  @Event({ eventName: 'daySelected' }) daySelected: EventEmitter

  private table: HTMLElement

  private handleDayClick(day: IDay) {
    const dayInMonth = day.dayInMonth.toString().padStart(2, '0')
    const month = day.month.month.toString().padStart(2, '0')

    this.selected = `${dayInMonth}-${month}-${day.month.year}`
    this.daySelected.emit(this.selected) // or day
  }

  private back() {
    const { month, year } = getPreviousMonth(this.year, this.month)
    this.month = month
    this.year = year
    chromeBordersFix(this.table)
  }

  private forward() {
    const { month, year } = getNextMonth(this.year, this.month)
    this.month = month
    this.year = year
    chromeBordersFix(this.table)
  }

  render() {
    const month = calendarMonth(this.year, this.month, this.startOfTheWeek)

    return (
      <div class="calendar flex">
        <section>
          <div onClick={() => this.back()} class="button">
            <slot name="back">&lt;</slot>
          </div>
          <div>
            <span class="month-name">
              {monthName(this.year, this.month, this.locale)}
            </span>
            &nbsp;
            <span class="year">{this.year}</span>
          </div>
          <div onClick={() => this.forward()} class="button">
            <slot name="forward">&gt;</slot>
          </div>
        </section>
        <table ref={el => (this.table = el)}>
          <tr>
            {dayNames(this.startOfTheWeek, this.locale).map(dayName => (
              <td class="borderless day-name">{dayName}</td>
            ))}
          </tr>
          {month.map(week => (
            <tr>
              {week.map(day => (
                <td
                  class={dayClass({
                    weekDay: day,
                    month: this.month,
                    selectedDay: selectedDayToCalendarDay(this.selected),
                  })}
                  onClick={() => this.handleDayClick(day)}
                >
                  {day.dayInMonth}
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    )
  }
}
