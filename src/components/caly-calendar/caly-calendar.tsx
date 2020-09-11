import { Component, Prop, Event, EventEmitter, h, State } from '@stencil/core'
import {
  dayClass,
  selectedDayToCalendarDay,
  dayNames,
  monthName,
  range,
} from '../../utils/utils'
import { calendarMonth, IDay, getPreviousMonth, getNextMonth } from 'cntdys'

const chromeBordersFix = (table: HTMLElement) => {
  table.style.borderSpacing = table.style.borderSpacing === '0px' ? '' : '0px'
}

interface IMonth {
  year: number
  month: number
  weeks: IDay[][]
}

/**
 * @slot back – Slot for the previous month button
 * @slot forward – Slot for the next month button
 */
@Component({
  tag: 'caly-calendar',
  styleUrl: 'caly-calendar.css',
  shadow: true,
})
export class CalyCalendar {
  private tables: HTMLElement[] = []

  @State() hoverDay: IDay

  /** (required) Year (YYYY) */
  @Prop({ mutable: true, reflect: true }) year: number = new Date().getFullYear()
  /** (required) Month (1-12) */
  @Prop({ mutable: true, reflect: true }) month: number = new Date().getMonth() + 1
  /** (optional) Selected day (dd-mm-yyyy) */
  @Prop({ mutable: true, reflect: true }) selected: string
  /** (optional) Locale */
  @Prop() locale: string = 'en-US'
  /** (optional) Start of the week. 0 for Sunday, 1 for Monday, etc. */
  @Prop() startOfTheWeek: number = 0
  /** (optional) Number of months rendered */
  @Prop() numberOfMonths: number = 1
  /** (optional) Show previous number of months */
  @Prop() showPreviousNumberOfMonths: boolean = false
  /** (optional) Disabled days */
  @Prop() disableOnDay?: (timestamp: number) => boolean

  /** (optional) Range */
  @Prop() range: boolean = false
  /** (optional) Range start (dd-mm-yyyy) */
  @Prop({ mutable: true, reflect: true }) rangeStart: string
  /** (optional) Range end (dd-mm-yyyy) */
  @Prop({ mutable: true, reflect: true }) rangeEnd: string

  /** (optional) Event to listen for when new day is selected. */
  @Event({ eventName: 'daySelected' }) daySelected: EventEmitter
  /** (optional) Event to listen for when range start day is selected. */
  @Event({ eventName: 'rangeStartSelected' }) rangeStartSelected: EventEmitter
  /** (optional) Event to listen for when range end day is selected. */
  @Event({ eventName: 'rangeEndSelected' }) rangeEndSelected: EventEmitter

  private handleDayClick(day: IDay) {
    const dayInMonth = day.dayInMonth.toString().padStart(2, '0')
    const month = day.month.month.toString().padStart(2, '0')
    const selectedDay = `${day.month.year}-${month}-${dayInMonth}`

    if (this.range) {
      if (!this.rangeStart) {
        this.rangeStart = selectedDay
        this.rangeStartSelected.emit(selectedDay)
      } else if (!this.rangeEnd) {
        this.rangeEnd = selectedDay
        this.rangeEndSelected.emit(selectedDay)
      } else {
        this.rangeStart = selectedDay
        this.rangeEnd = null
        this.rangeStartSelected.emit(selectedDay)
      }
    } else {
      this.selected = selectedDay
      this.daySelected.emit(selectedDay)
    }
  }

  private handleMouseOver(day: IDay) {
    if (this.range) {
      this.hoverDay = day
    }
  }

  private back() {
    const { month, year } = getPreviousMonth(this.year, this.month)
    this.month = month
    this.year = year
    this.tables.forEach(table => chromeBordersFix(table))
  }

  private forward() {
    const { month, year } = getNextMonth(this.year, this.month)
    this.month = month
    this.year = year
    this.tables.forEach(table => chromeBordersFix(table))
  }

  render() {
    let month = { month: this.month, year: this.year }
    let months: IMonth[] = []

    for (let _i of range(this.numberOfMonths)) {
      let otherMonth = {
        year: month.year,
        month: month.month,
        weeks: calendarMonth(month.year, month.month, this.startOfTheWeek),
      }

      if (this.showPreviousNumberOfMonths) {
        months.unshift(otherMonth)
        month = getPreviousMonth(month.year, month.month) // going back
      } else {
        months.push(otherMonth)
        month = getNextMonth(month.year, month.month) // mutates month variable to progress it into next month
      }
    }

    return (
      <div class="grid">
        <section class="navigation">
          <div onClick={() => this.back()} class="button">
            <slot name="back">&lt;</slot>
          </div>
          <div onClick={() => this.forward()} class="button">
            <slot name="forward">&gt;</slot>
          </div>
        </section>

        {months.map(month => (
          <div class="inline-flex">
            <div class="flex justify-center">
              {monthName(month.year, month.month, this.locale)} {month.year}
            </div>
            <table
              ref={el => (this.tables.includes(el) ? {} : this.tables.push(el))}
            >
              <tr>
                {dayNames(this.startOfTheWeek, this.locale).map(dayName => (
                  <td class="borderless day-name">{dayName}</td>
                ))}
              </tr>
              {month.weeks.map(week => (
                <tr>
                  {week.map(day => (
                    <td
                      class={dayClass({
                        weekDay: day,
                        month: month.month,
                        year: month.year,
                        selectedDay: selectedDayToCalendarDay(this.selected),
                        rangeStart: selectedDayToCalendarDay(this.rangeStart),
                        rangeEnd: selectedDayToCalendarDay(this.rangeEnd),
                        hoverDay: this.hoverDay,
                        disableOnDay: this.disableOnDay,
                      })}
                      onClick={() => this.handleDayClick(day)}
                      onMouseOver={() => this.handleMouseOver(day)}
                    >
                      {day.dayInMonth}
                    </td>
                  ))}
                </tr>
              ))}
            </table>
          </div>
        ))}
      </div>
    )
  }
}
