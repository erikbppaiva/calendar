/** @format */
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Box } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { ICalendar, IEvent } from "./backend";

const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

const useStyles = makeStyles({
  table: {
    minHeight: "100%",
    tableLayout: "fixed",
    "& td ~ td, & th ~ th ": {
      padding: "2px",
      borderLeft: "2px solid rgb(224,224,224)",
    },
    "& td": {
      verticalAlign: "top",
      overflow: "hidden",
      padding: "8px 4px",
    },
  },
  dayOfManth: {
    fontWeight: 500,
    marginBottom: "4px",
  },
  event: {
    display: "flex",
    //asd
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    whiteSpace: "nowrap",
    margin: "4px 0",
  },
  eventBacground: {
    display: "inline-block",
    color: "white",
    padding: "2px 4px",
    borderRadius: "5px",
  },
});

interface ICalendarProps {
  weeks: ICalenderCell[][];
}
export default function Calendar(props: ICalendarProps) {
  const { weeks } = props;
  const classes = useStyles();

  return (
    <TableContainer style={{ flex: "1" }} component={"div"}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {DAYS_OF_WEEK.map((day) => (
              <TableCell align="center" key={day}>
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {weeks.map((week, i) => (
            <TableRow key={i}>
              {week.map((cell) => (
                <TableCell align="center" key={cell.date}>
                  <div className={classes.dayOfManth}>{cell.dayOfManth}</div>
                  {cell.events.map((event) => {
                    const color = event.calendar.color;
                    return (
                      <button className={classes.event} key={event.id}>
                        {event.time && (
                          <>
                            <Icon style={{ color }} fontSize="inherit">
                              watch_later
                            </Icon>
                            <Box component="span" margin="0 4px">
                              {event.time}
                            </Box>
                          </>
                        )}
                        {event.time ? (
                          <span>{event.desc} </span>
                        ) : (
                          <div
                            className={classes.eventBacground}
                            style={{ backgroundColor: color }}
                          >
                            {event.desc}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export type IEventWithCalendar = IEvent & { calendar: ICalendar };

export interface ICalenderCell {
  date: string;
  dayOfManth: number;
  events: IEventWithCalendar[];
}
