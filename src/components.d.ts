/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface MyCalendar {
    /**
    * (optional) Locale
    */
    'locale': string;
    /**
    * (required) Month (1-12)
    */
    'month': number;
    /**
    * (optional) Selected day (dd-mm-yyyy)
    */
    'selected': string;
    /**
    * (optional) Start of the week. 0 for Sunday, 1 for Monday, etc.
    */
    'startOfTheWeek': number;
    /**
    * (required) Year (YYY)
    */
    'year': number;
  }
}

declare global {


  interface HTMLMyCalendarElement extends Components.MyCalendar, HTMLStencilElement {}
  var HTMLMyCalendarElement: {
    prototype: HTMLMyCalendarElement;
    new (): HTMLMyCalendarElement;
  };
  interface HTMLElementTagNameMap {
    'my-calendar': HTMLMyCalendarElement;
  }
}

declare namespace LocalJSX {
  interface MyCalendar {
    /**
    * (optional) Locale
    */
    'locale'?: string;
    /**
    * (required) Month (1-12)
    */
    'month': number;
    /**
    * (optional) Event to listen for when new day is selected.
    */
    'onDaySelected'?: (event: CustomEvent<any>) => void;
    /**
    * (optional) Selected day (dd-mm-yyyy)
    */
    'selected'?: string;
    /**
    * (optional) Start of the week. 0 for Sunday, 1 for Monday, etc.
    */
    'startOfTheWeek'?: number;
    /**
    * (required) Year (YYY)
    */
    'year': number;
  }

  interface IntrinsicElements {
    'my-calendar': MyCalendar;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'my-calendar': LocalJSX.MyCalendar & JSXBase.HTMLAttributes<HTMLMyCalendarElement>;
    }
  }
}


