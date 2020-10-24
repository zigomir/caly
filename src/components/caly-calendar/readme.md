# caly-calendar



<!-- Auto Generated Below -->


## Usage

### Advanced

```html
<caly-calendar
  year="2020"
  month="1"
  selected="01-01-2020"
  locale="sl-SI"
  start-of-the-week="1"
>
  <!-- optional slots to change back and forward button style -->
  <div slot="back">
    <svg viewBox="0 0 1000 1000" style="width: 18px; height: 18px;">
      <path
        d="M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z"
      />
    </svg>
  </div>
  <div slot="forward">
    <svg viewBox="0 0 1000 1000" style="width: 18px; height: 18px;">
      <path
        d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z"
      />
    </svg>
  </div>
</caly-calendar>
```


### Simple

```html
<caly-calendar year="2020" month="1"></caly-calendar>
```



## Properties

| Property                     | Attribute                        | Description                                                    | Type                             | Default                     |
| ---------------------------- | -------------------------------- | -------------------------------------------------------------- | -------------------------------- | --------------------------- |
| `disableOnDay`               | --                               | (optional) Disabled days                                       | `(timestamp: number) => boolean` | `undefined`                 |
| `locale`                     | `locale`                         | (optional) Locale                                              | `string`                         | `'en-US'`                   |
| `month`                      | `month`                          | (required) Month (1-12)                                        | `number`                         | `new Date().getMonth() + 1` |
| `numberOfMonths`             | `number-of-months`               | (optional) Number of months rendered                           | `number`                         | `1`                         |
| `range`                      | `range`                          | (optional) Range                                               | `boolean`                        | `false`                     |
| `rangeEnd`                   | `range-end`                      | (optional) Range end (dd-mm-yyyy)                              | `string`                         | `undefined`                 |
| `rangeStart`                 | `range-start`                    | (optional) Range start (dd-mm-yyyy)                            | `string`                         | `undefined`                 |
| `selected`                   | `selected`                       | (optional) Selected day (dd-mm-yyyy)                           | `string`                         | `undefined`                 |
| `showPreviousNumberOfMonths` | `show-previous-number-of-months` | (optional) Show previous number of months                      | `boolean`                        | `false`                     |
| `startOfTheWeek`             | `start-of-the-week`              | (optional) Start of the week. 0 for Sunday, 1 for Monday, etc. | `number`                         | `0`                         |
| `year`                       | `year`                           | (required) Year (YYYY)                                         | `number`                         | `new Date().getFullYear()`  |


## Events

| Event                | Description                                                      | Type               |
| -------------------- | ---------------------------------------------------------------- | ------------------ |
| `daySelected`        | (optional) Event to listen for when new day is selected.         | `CustomEvent<any>` |
| `hoveredDay`         | (optional) Event to listen for what day is currently hovered.    | `CustomEvent<any>` |
| `rangeEndSelected`   | (optional) Event to listen for when range end day is selected.   | `CustomEvent<any>` |
| `rangeStartSelected` | (optional) Event to listen for when range start day is selected. | `CustomEvent<any>` |


## Slots

| Slot        | Description                                          |
| ----------- | ---------------------------------------------------- |
| `"back"`    | Slot for the previous month button                   |
| `"forward"` | Slot for the next month button                       |
| `"misc"`    | Slot for the miscellaneous, e.g. date preset buttons |


## CSS Custom Properties

| Name                       | Description                                         |
| -------------------------- | --------------------------------------------------- |
| `--cell-border-color`      | Color of the calendar cell border                   |
| `--cell-border-style`      | Style of the calendar cell border                   |
| `--cell-border-width`      | Width of the calendar cell border                   |
| `--cell-font-size`         | Font size of the calendar cell                      |
| `--cell-height`            | Height of the calendar cell                         |
| `--cell-text-align`        | Text alignment of the calendar cell                 |
| `--cell-width`             | Width of the calendar cell                          |
| `--day-cursor`             | Cursor on cell hover                                |
| `--day-name-font-size`     | Font size of day name                               |
| `--font`                   | Pass the font family you want the text to be in     |
| `--grid`                   | Specify grid template areas                         |
| `--grid-column-gap`        | Specify grid column gap                             |
| `--hover-bg-color`         | Cell background color on hover                      |
| `--hover-color`            | Cell text color on hover                            |
| `--in-range-bg-color`      | Background color of in-range cell                   |
| `--in-range-color`         | Color of in-range cell                              |
| `--navigation-height`      | Specify grid column gap                             |
| `--other-month-border`     | None by default                                     |
| `--other-month-visibility` | Hidden by default, can be set to visible            |
| `--out-of-range-color`     | Cell text color when day is out of range / disabled |
| `--selected-bg-color`      | Background color of selected day cell               |
| `--selected-color`         | Color of selected day cell                          |
| `--today-color`            | Font color of today's cell                          |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
