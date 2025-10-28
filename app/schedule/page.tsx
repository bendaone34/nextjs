'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Plus, X } from 'lucide-react';

const DragCalendar = dynamic(() => import('../components/DragCalendar'), {
  ssr: false,
});

export default function SchedulePage() {
  const [showModal, setShowModal] = useState(false);

  const clients = ['Brian Cranston', 'Amelia Carter', 'John Blake', 'Sophia Turner'];
  const carers = ['Sarah Collins', 'James Miller', 'Olivia Brown', 'Liam Evans'];

  const [events, setEvents] = useState([
    {
      title: 'Brian Cranston - Sarah Collins',
      client: 'Brian Cranston',
      carer: 'Sarah Collins',
      start: new Date(2025, 9, 24, 8, 0),
      end: new Date(2025, 9, 24, 12, 0),
    },
    {
      title: 'Amelia Carter - James Miller',
      client: 'Amelia Carter',
      carer: 'James Miller',
      start: new Date(2025, 9, 25, 16, 0),
      end: new Date(2025, 9, 25, 20, 0),
    },
  ]);

  const [newShift, setNewShift] = useState({
    client: '',
    carer: '',
    start: '',
    end: '',
  });

  const moveEvent = ({ event, start, end }: any) => {
    setEvents((prev) =>
      prev.map((e) => (e === event ? { ...e, start, end } : e))
    );
  };

  const resizeEvent = ({ event, start, end }: any) => {
    setEvents((prev) =>
      prev.map((e) => (e === event ? { ...e, start, end } : e))
    );
  };

  const handleDeleteEvent = (event: any) => {
    if (confirm(`Delete shift: ${event.title}?`)) {
      setEvents((prev) => prev.filter((e) => e !== event));
    }
  };

  const handleAddShift = () => {
    const { client, carer, start, end } = newShift;
    if (!client || !carer || !start || !end) {
      alert('Please fill all fields.');
      return;
    }

    const newEvent = {
      title: `${client} - ${carer}`,
      client,
      carer,
      start: new Date(start),
      end: new Date(end),
    };

    setEvents((prev) => [...prev, newEvent]);
    setShowModal(false);
    setNewShift({ client: '', carer: '', start: '', end: '' });
  };

  return (
    <main className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between bg-sky-900 text-white px-6 py-3">
        <h1 className="text-lg font-semibold">Shift Scheduling</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center bg-yellow-400 text-black font-semibold px-3 py-1 rounded shadow hover:bg-yellow-300"
        >
          <Plus size={16} className="mr-1" /> Add Shift
        </button>
      </header>

      {/* Calendar */}
      <div className="flex-1 p-4">
        <DragCalendar
          events={events}
          moveEvent={moveEvent}
          resizeEvent={resizeEvent}
          onSelectEvent={handleDeleteEvent}
        />
      </div>

      {/* Add Shift Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-[400px] relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center">
              Add New Shift
            </h2>

            {/* Client select */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client
            </label>
            <select
              value={newShift.client}
              onChange={(e) => setNewShift({ ...newShift, client: e.target.value })}
              className="w-full border px-3 py-2 rounded mb-3"
            >
              <option value="">Select Client</option>
              {clients.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Carer select */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Carer
            </label>
            <select
              value={newShift.carer}
              onChange={(e) => setNewShift({ ...newShift, carer: e.target.value })}
              className="w-full border px-3 py-2 rounded mb-3"
            >
              <option value="">Select Carer</option>
              {carers.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Start time */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="datetime-local"
              value={newShift.start}
              onChange={(e) => setNewShift({ ...newShift, start: e.target.value })}
              className="w-full border px-3 py-2 rounded mb-3"
            />

            {/* End time */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="datetime-local"
              value={newShift.end}
              onChange={(e) => setNewShift({ ...newShift, end: e.target.value })}
              className="w-full border px-3 py-2 rounded mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-2 border rounded text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddShift}
                className="px-3 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
