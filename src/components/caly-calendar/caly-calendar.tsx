import { Component, Prop, Event, EventEmitter, h } from '@stencil/core'
import {
  dayClass,
  selectedDayToCalendarDay,
  dayNames,
  monthName,
} from '../../utils/utils'
import { calendarMonth, IDay, getPreviousMonth, getNextMonth } from 'cntdys'

const chromeBordersFix = (table: HTMLElement) => {
  table.style.borderSpacing = table.style.borderSpacing === '0px' ? '' : '0px'
}

/**
 * @slot back – Slot for the previous month button
 * @slot forward – Slot for the next month button
 */
@Component({
  tag: 'caly-calendar', // TODO: better tag (and component!) name
  styleUrl: 'caly-calendar.css',
  shadow: true,
})
export class CalyCalendar {
  private table: HTMLElement

  /** (required) Year (YYY) */
  @Prop({ mutable: true, reflect: true }) year!: number
  /** (required) Month (1-12) */
  @Prop({ mutable: true, reflect: true }) month!: number
  /** (optional) Selected day (dd-mm-yyyy) */
  @Prop({ mutable: true, reflect: true }) selected: string
  /** (optional) Locale */
  @Prop() locale: string = 'en-US'
  /** (optional) Start of the week. 0 for Sunday, 1 for Monday, etc. */
  @Prop() startOfTheWeek: number = 0

  /** (optional) Event to listen for when new day is selected. */
  @Event({ eventName: 'daySelected' }) daySelected: EventEmitter

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
                    year: this.year,
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
