import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import {
  cretEventEndPoint,
  deleteEventEndPoint,
  ICalendar,
  IEditingEvent,
  updateEventEndPoint,
} from "./backend";
import { useEffect, useState, useRef } from "react";

interface IEventFormDialog {
  event: IEditingEvent | null;
  calendars: ICalendar[];
  onCancel: () => void;
  onSave: () => void;
}
interface IvalidationErrors {
  [field: string]: string;
}

export function EventFormDialog(props: IEventFormDialog) {
  const [event, setEvent] = useState<IEditingEvent | null>(props.event);
  const [errors, setErrors] = useState<IvalidationErrors | null>({});

  const inputData = useRef<HTMLInputElement | null>();
  const inputDesc = useRef<HTMLInputElement | null>();

  useEffect(() => {
    setEvent(props.event);
    setErrors({});
  }, [props.event]);

  const isNew = !event?.id;

  function validate(): boolean {
    if (event) {
      const currentErros: IvalidationErrors = {};
      if (!event.date) {
        currentErros["date"] = "A data deve ser preenchido";
        inputData.current?.focus();
      }
      if (!event.desc) {
        currentErros["desc"] = "A descrição deve ser preenchido";
        inputDesc.current?.focus();
      }
      //retorna uma quantidade de chaves e retorna a quantidade
      setErrors(currentErros);
      return Object.keys(currentErros).length === 0;
    }
    return false;
  }

  function save(evt: React.FormEvent) {
    evt.preventDefault();

    if (event) {
      if (validate()) {
        if (isNew) {
          cretEventEndPoint(event).then(props.onSave);
        } else {
          updateEventEndPoint(event).then(props.onSave);
        }
      }
    }
  }
  function deleteEvent(evt: React.FormEvent) {
    if (event) {
      deleteEventEndPoint(event.id!).then(props.onSave);
    }
  }
  return (
    <div>
      <Dialog
        open={!!event}
        onClose={props.onCancel}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={save}>
          <DialogTitle id="form-dialog-title">
            {isNew ? "Criar Evento" : "Editar evento"}
          </DialogTitle>
          <DialogContent>
            <TextField
              inputRef={inputData}
              type="date"
              margin="normal"
              label="Date"
              fullWidth
              value={event?.date}
              onChange={(evt) =>
                !(event && setEvent({ ...event, date: evt.target.value }))
              }
              error={!!errors?.date}
              helperText={errors?.date}
            />
            <TextField
              inputRef={inputDesc}
              autoFocus
              margin="normal"
              label="Descrição"
              fullWidth
              value={event?.desc}
              onChange={(evt) =>
                event && setEvent({ ...event, desc: evt.target.value })
              }
              error={!!errors?.desc}
              helperText={errors?.desc}
            />
            <TextField
              type="time"
              margin="normal"
              label="Hora"
              fullWidth
              value={event?.time ?? ""}
              onChange={(evt) =>
                event && setEvent({ ...event, time: evt.target.value })
              }
            />
            <FormControl margin="normal" fullWidth>
              <InputLabel id="select-calendar">Agenda</InputLabel>
              <Select
                labelId="select-calendar"
                value={event?.calendarId}
                onChange={(evt) =>
                  event &&
                  setEvent({
                    ...event,
                    calendarId: evt.target.value as number,
                  })
                }
              >
                {props.calendars.map((calendar) => (
                  <MenuItem key={calendar.id} value={calendar.id}>
                    {calendar.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            {!isNew && (
              <Button type="button" onClick={deleteEvent}>
                Excluir
              </Button>
            )}
            <Box flex="1"></Box>
            <Button type="button" onClick={props.onCancel}>
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
