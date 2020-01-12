import { Component, Prop, Event, EventEmitter, h } from '@stencil/core'
import { dayClass, selectedDayToCalendarDay } from '../../utils/utils'
import { calendarMonth, IDay } from 'cntdys'

@Component({
  tag: 'my-calendar',
  styleUrl: 'my-calendar.css',
  shadow: true,
})
export class MyCalendar {
  @Prop() year: number
  @Prop() month: number
  @Prop({ mutable: true, reflect: true }) selected: string // mm-dd-yyyy

  @Event({ eventName: 'daySelected' }) daySelected: EventEmitter

  private handleDayClick(day: IDay) {
    const dayInMonth = day.dayInMonth.toString().padStart(2, '0')
    const month = day.month.month.toString().padStart(2, '0')

    this.selected = `${dayInMonth}-${month}-${day.month.year}`
    this.daySelected.emit(this.selected) // or day
  }

  render() {
    const month = calendarMonth(this.year, this.month)

    return (
      <table>
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
    )
  }
}
