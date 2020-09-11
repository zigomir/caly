import { newSpecPage } from '@stencil/core/testing'
import { CalyCalendar } from './caly-calendar'

it('should render caly-calendar', async () => {
  const page = await newSpecPage({
    components: [CalyCalendar],
    html: `<caly-calendar year="2010" month="1" selected="2010-01-01"></caly-calendar>`,
  })

  expect(page.root).toMatchSnapshot('render-2010-01-01')
})
