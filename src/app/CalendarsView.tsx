import { Box } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { ICalendar } from "./backend";

interface ICalendarsViewProps {
  calendars: ICalendar[];
  toggleCalendar: (i: number) => void;
  calendersSelected: boolean[];
}

export default function CalendarsView(props: ICalendarsViewProps) {
  const { calendars, calendersSelected, toggleCalendar } = props;
  return (
    <Box marginTop="64px">
      <h3>Agendas</h3>
      {calendars.map((calendar, i) => (
        <div key={calendar.id}>
          <FormControlLabel
            control={
              <Checkbox
                style={{ color: calendar.color }}
                checked={calendersSelected[i]}
                onClick={() => toggleCalendar(i)}
              />
            }
            label={calendar.name}
          />
        </div>
      ))}
    </Box>
  );
}
