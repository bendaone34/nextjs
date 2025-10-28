'use client';

import {
  Calendar,
  dateFnsLocalizer,
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enGB from 'date-fns/locale/en-GB';

const locales = { 'en-GB': enGB };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop(Calendar);

export default function DragCalendar({
  events,
  moveEvent,
  resizeEvent,
  onSelectEvent,
}: any) {
  return (
    <DnDCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      defaultView="week"
      views={['week', 'day', 'agenda']}
      resizable
      draggableAccessor={() => true}
      onEventDrop={moveEvent}
      onEventResize={resizeEvent}
      onSelectEvent={onSelectEvent}
      style={{ height: 'calc(100vh - 120px)', backgroundColor: 'white' }}
      messages={{
        week: 'Week',
        day: 'Day',
        agenda: 'Agenda',
        today: 'Today',
      }}
    />
  );
}
