/** @format */
import { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {
  getCalendrsEndPoint,
  getEventEndPoint,
  ICalendar,
  IEvent,
} from "./backend";
import { useParams } from "react-router";
import CalendarsView from "./CalendarsView";
import CalenderHeader from "./CalendarHeader";
import Calendar, { ICalenderCell, IEventWithCalendar } from "./Calendar";
import { EventFormDialog, IEditingEvent } from "./EventFormDialog";
import { getToday } from "./getToday";

export default function CalenderScreen() {
  const { month } = useParams<{ month: string }>();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [editingEvent, setEditingEvent] = useState<IEditingEvent | null>(null);

  const [calendars, setCalenders] = useState<ICalendar[]>([]);
  const [calendersSelected, setCalendersSelected] = useState<boolean[]>([]);
  const weeks = generateCalender(
    month + "-01",
    events,
    calendars,
    calendersSelected
  );
  const firstDate = weeks[0][0].date;
  const lastDate = weeks[weeks.length - 1][6].date;

  useEffect(() => {
    Promise.all([
      getCalendrsEndPoint(),
      getEventEndPoint(firstDate, lastDate),
    ]).then(([calenders, events]) => {
      setCalendersSelected(calenders.map(() => true));
      setCalenders(calenders);
      setEvents(events);
    });
  }, [firstDate, lastDate]);

  function toggleCalendar(i: number) {
    const newValue = [...calendersSelected];
    newValue[i] = !newValue[i];
    setCalendersSelected(newValue);
  }
  function openNewEvent() {
    setEditingEvent({
      date: getToday(),
      desc: "",
      calendarId: calendars[0].id,
    });
  }

  return (
    <Box display="flex" height="100%" alignItems="stretch">
      <Box
        borderRight="1px solid rgb(224,224,224)"
        width="16em"
        padding="8px 16px"
      >
        <h2>Agenda React</h2>
        <Button variant="contained" color="primary" onClick={openNewEvent}>
          Novo evento
        </Button>
        <CalendarsView
          calendars={calendars}
          toggleCalendar={toggleCalendar}
          calendersSelected={calendersSelected}
        />
      </Box>

      <Box display="flex" flex="1" flexDirection="column">
        <CalenderHeader month={month} />
        <Calendar weeks={weeks} />
        <EventFormDialog
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          calendars={calendars}
        />
      </Box>
    </Box>
  );
}
function generateCalender(
  date: string,
  allEvents: IEvent[],
  calenders: ICalendar[],
  calendersSelected: boolean[]
): ICalenderCell[][] {
  const weeks: ICalenderCell[][] = [];
  const jsDate = new Date(date + "T12:00:00");
  const currentMonth = jsDate.getMonth();

  const currentDay = new Date(jsDate.valueOf());
  currentDay.setDate(1);
  const dayOfWeek = currentDay.getDay();
  currentDay.setDate(1 - dayOfWeek);

  do {
    const week: ICalenderCell[] = [];
    for (let i = 0; i < 7; i++) {
      const monthStr = (currentDay.getMonth() + 1).toString().padStart(2, "0");
      const dayStr = currentDay.getDate().toString().padStart(2, "0");
      const isoDate = `${currentDay.getFullYear()}-${monthStr}-${dayStr}`;

      const events: IEventWithCalendar[] = [];
      for (const event of allEvents) {
        if (event.date === isoDate) {
          const calIndex = calenders.findIndex(
            (cal) => cal.id === event.calendarId
          );
          if (calendersSelected[calIndex]) {
            events.push({ ...event, calendar: calenders[calIndex] });
          }
        }
      }
      week.push({
        dayOfManth: currentDay.getDate(),
        date: isoDate,
        events,
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(week);
  } while (currentDay.getMonth() === currentMonth);

  return weeks;
}
