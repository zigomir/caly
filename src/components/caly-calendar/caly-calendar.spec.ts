import { newSpecPage } from '@stencil/core/testing'
import { CalyCalendar } from './caly-calendar'

it('should render caly-calendar', async () => {
  const page = await newSpecPage({
    components: [CalyCalendar],
    html: `<caly-calendar year="2010" month="1" selected="01-01-2010"></caly-calendar>`,
  })

  expect(page.root).toMatchSnapshot('render-01-01-2010')
})
