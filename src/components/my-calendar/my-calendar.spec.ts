import { newSpecPage } from '@stencil/core/testing'
import { MyCalendar } from './my-calendar'

it('should render my calendar', async () => {
  const page = await newSpecPage({
    components: [MyCalendar],
    html: `<my-calendar year="2010" month="1" selected="01-01-2010"></my-calendar>`,
  })

  expect(page.root).toMatchSnapshot('render-01-01-2010')
})
