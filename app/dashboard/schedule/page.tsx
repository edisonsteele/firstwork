'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Calendar, Clock, Plus } from 'lucide-react';

interface ScheduleItem {
  id: string;
  student_id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  day_of_week: number;
  created_at: string;
}

export default function SchedulePage() {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [students, setStudents] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: studentsData } = await supabase
        .from('students')
        .select('id, name')
        .eq('parent_id', session.user.id);

      if (studentsData) {
        setStudents(studentsData);
        if (studentsData.length > 0) {
          setSelectedStudent(studentsData[0].id);
        }
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    if (!selectedStudent) return;

    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const { data } = await supabase
          .from('schedule_items')
          .select('*')
          .eq('student_id', selectedStudent)
          .order('day_of_week', { ascending: true })
          .order('start_time', { ascending: true });

        if (data) {
          setScheduleItems(data);
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [selectedStudent]);

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Schedule</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your student's weekly schedule and activities.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0">
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            {daysOfWeek.map((day, index) => {
              const dayItems = scheduleItems.filter(
                (item) => item.day_of_week === index
              );

              return (
                <div key={day} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">{day}</h3>
                  {dayItems.length > 0 ? (
                    <div className="space-y-4">
                      {dayItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <Clock className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {item.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatTime(item.start_time)} - {formatTime(item.end_time)}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No scheduled activities</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 