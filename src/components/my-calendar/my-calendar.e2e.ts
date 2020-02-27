import { newE2EPage } from '@stencil/core/testing'

describe('example', () => {
  it('should render and select new day on click', async () => {
    const page = await newE2EPage()
    await page.setContent(`<my-calendar year="2020" month="1" selected="01-01-2020" start-of-the-week="1"></my-calendar>`)
    const selectedEl = await page.find('my-calendar >>> .selected')
    expect(selectedEl.textContent).toBe('1')

    const days = await page.findAll('my-calendar >>> .day')
    expect(days.length).toBe(42) // 6 weeks, some hidden
    expect(days[41].textContent).toBe('9') // 9th february still on grid
    expect(days[41].classList.contains('other-month')).toBe(true) // but hidden because has `other-month` class

    const currentMonthDays = days.filter(d => d.classList.contains('current-month'))
    const lastDayInJanuary = currentMonthDays[currentMonthDays.length - 1]
    expect(lastDayInJanuary.textContent).toBe('31')
    expect(lastDayInJanuary.classList.contains('selected')).toBe(false)
    await lastDayInJanuary.click() // select last day in january
    expect(lastDayInJanuary.classList.contains('selected')).toBe(true)
  })
})
