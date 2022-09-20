/** @format */

export interface ICalendar {
  id: number;
  name: string;
  color: string;
}
export interface IEditingEvent {
  id?: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export interface IEvent extends IEditingEvent {
  id: number;
}

export function getCalendrsEndPoint(): Promise<ICalendar[]> {
  return fetch("http://localhost:8080/calendars").then(handleresponse);
}
export function getEventEndPoint(from: string, to: string): Promise<IEvent[]> {
  return fetch(
    `http://localhost:8080/events?date_gte=${from}&date_lte=${to}&_sort=date,time`
  ).then(handleresponse);
}
export function cretEventEndPoint(event: IEditingEvent): Promise<IEvent> {
  return fetch(`http://localhost:8080/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then(handleresponse);
}
export function updateEventEndPoint(event: IEditingEvent): Promise<IEvent> {
  return fetch(`http://localhost:8080/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then(handleresponse);
}
export function deleteEventEndPoint(eventId: number): Promise<void> {
  return fetch(`http://localhost:8080/events/${eventId}`, {
    method: "DELETE",
  }).then(handleresponse);
}
export function getUserEventEndPoint(): Promise<void> {
  return fetch(`http://localhost:8080/auth/user`, {}).then(handleresponse);
}
//tratando o STATUS
function handleresponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}
export function sigIntEndPoint(email: string, senha: string): Promise<void> {
  return fetch(`http://localhost:8080/auth/user`, {}).then(handleresponse);
}
