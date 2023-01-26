# Interview Scheduler

App built on React that allows users to book, edit and cancel interviews. Tested with Storybook, Jest, and Cypress.

## Setup

Install dependencies with `npm install`.

#### Dependencies:
- axios
- classnames
- normalize.css
- react
- react-dom
- react-hooks-testing-library
- react-scripts

## Run The API Server

App requires the Scheduler-API to also be running. Please follow instructions here:

https://github.com/lighthouse-labs/scheduler-api

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Final Product

#### Switching Between Days
!["Switching between days brings up the interviews and empty slots for that day."](https://github.com/adbwu/scheduler/blob/master/docs/SwitchingDays.gif?raw=true)

#### Booking an Appointment
!["Clicking the + buttons leads one to a form that books directly in that appointment slot, and displays it upon saving."](https://github.com/adbwu/scheduler/blob/master/docs/CreateAppointment.gif?raw=true)

#### Deleting an Interview Appointment
!["Deleting interview brings up an informative confirmation box.](https://github.com/adbwu/scheduler/blob/master/docs/DeleteInterview.gif?raw=true)

#### Editing an Appointment
!["Editing an appoint brings up the same form but maintains the original choices."](https://github.com/adbwu/scheduler/blob/master/docs/EditAppointment.gif?raw=true)

#### Tests
!["Tests passing in Jest."](https://github.com/adbwu/scheduler/blob/master/docs/Tests.gif?raw=true)