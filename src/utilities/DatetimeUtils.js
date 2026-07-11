import { MONTHS, DAYS } from './DateConstants';

export function getWeekDays() {
  const currentDay = new Date().getDay();

  // Convert JavaScript day index
  // Sunday = 0, Monday = 1
  // to DAYS array index
  // Monday = 0, Sunday = 6
  const dayIndex = (currentDay + 6) % 7;

  return [
    ...DAYS.slice(dayIndex),
    ...DAYS.slice(0, dayIndex),
  ];
}

export function getDayMonthFromDate() {
  const date = new Date();

  const month = MONTHS[date.getMonth()].slice(0, 3);
  const day = date.getDate();

  return `${day} ${month}`;
}

export function transformDateFormat() {
  const date = new Date();

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function getUTCDatetime() {
  const date = new Date();

  return date.toISOString().replace('T', ' ').slice(0, 16);
}

export function getUTCTime() {
  const date = new Date();

  return date.toISOString().split('T')[1].slice(0, 8);
}