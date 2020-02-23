```html
<my-calendar
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
</my-calendar>
```
