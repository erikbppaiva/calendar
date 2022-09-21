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
export interface IUser extends IEditingEvent {
  name: string;
  email: string;
}
export function getCalendrsEndPoint(): Promise<ICalendar[]> {
  return fetch("http://localhost:8080/calendars", {
    credentials: "include",
  }).then(handleresponse);
}
export function getEventEndPoint(from: string, to: string): Promise<IEvent[]> {
  return fetch(
    `http://localhost:8080/events?date_gte=${from}&date_lte=${to}&_sort=date,time`,
    {
      credentials: "include",
    }
  ).then(handleresponse);
}
export function cretEventEndPoint(event: IEditingEvent): Promise<IEvent> {
  return fetch(`http://localhost:8080/events`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then(handleresponse);
}
export function updateEventEndPoint(event: IEditingEvent): Promise<IEvent> {
  return fetch(`http://localhost:8080/events/${event.id}`, {
    credentials: "include",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then(handleresponse);
}
export function deleteEventEndPoint(eventId: number): Promise<void> {
  return fetch(`http://localhost:8080/events/${eventId}`, {
    credentials: "include",
    method: "DELETE",
  }).then(handleresponse);
}
export function getUserEventEndPoint(): Promise<IUser> {
  return fetch(`http://localhost:8080/auth/user`, {
    credentials: "include",
  }).then(handleresponse);
}
export function sigIntEndPoint(
  email: string,
  password: string
): Promise<IUser> {
  return fetch(`http://localhost:8080/auth/login`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleresponse);
}
export function sigOuttEndPoint(): Promise<IUser> {
  return fetch(`http://localhost:8080/auth/logout`, {
    credentials: "include",
    method: "POST",
  }).then(handleresponse);
}
//tratando o STATUS
function handleresponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}
