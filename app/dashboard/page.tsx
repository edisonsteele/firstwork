'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Student, Task, Reward, Session, Progress } from '../lib/types'
import { Calendar, Clock, Award, Target } from 'lucide-react'

export default function DashboardPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<string>('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [rewards, setRewards] = useState<Reward[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [progress, setProgress] = useState<Progress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return

        // Fetch students
        const { data: studentsData } = await supabase
          .from('students')
          .select('*')
          .eq('parent_id', session.user.id)

        if (studentsData) {
          setStudents(studentsData)
          if (studentsData.length > 0) {
            setSelectedStudent(studentsData[0].id)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!selectedStudent) return

    const fetchStudentData = async () => {
      try {
        // Fetch tasks
        const { data: tasksData } = await supabase
          .from('tasks')
          .select('*')
          .eq('student_id', selectedStudent)
          .order('created_at', { ascending: false })

        // Fetch rewards
        const { data: rewardsData } = await supabase
          .from('rewards')
          .select('*')
          .eq('student_id', selectedStudent)
          .order('created_at', { ascending: false })

        // Fetch recent sessions
        const { data: sessionsData } = await supabase
          .from('sessions')
          .select('*')
          .eq('student_id', selectedStudent)
          .order('created_at', { ascending: false })
          .limit(5)

        // Fetch progress
        const { data: progressData } = await supabase
          .from('progress')
          .select('*')
          .eq('student_id', selectedStudent)
          .order('date', { ascending: false })
          .limit(7)

        if (tasksData) setTasks(tasksData)
        if (rewardsData) setRewards(rewardsData)
        if (sessionsData) setSessions(sessionsData)
        if (progressData) setProgress(progressData)
      } catch (error) {
        console.error('Error fetching student data:', error)
      }
    }

    fetchStudentData()
  }, [selectedStudent])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const selectedStudentData = students.find(s => s.id === selectedStudent)

  return (
    <div className="space-y-6">
      {/* Student Selector */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track progress and manage activities for your students.
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Target className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Tasks Completed
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {tasks.filter(t => t.status === 'completed').length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Award className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Points Earned
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {tasks
                        .filter(t => t.status === 'completed')
                        .reduce((sum, task) => sum + task.points, 0)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Work Time
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {sessions
                        .filter(s => s.type === 'work')
                        .reduce((sum, session) => sum + session.duration, 0)} min
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Days
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {new Set(progress.map(p => p.date)).size}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
          <div className="mt-5">
            <div className="flow-root">
              <ul role="list" className="-mb-8">
                {sessions.map((session, index) => (
                  <li key={session.id}>
                    <div className="relative pb-8">
                      {index !== sessions.length - 1 && (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                            session.type === 'work' ? 'bg-blue-500' : 'bg-green-500'
                          }`}>
                            {session.type === 'work' ? (
                              <Target className="h-5 w-5 text-white" />
                            ) : (
                              <Award className="h-5 w-5 text-white" />
                            )}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              {session.type === 'work' ? 'Work Session' : 'Reward Session'}{' '}
                              <span className="font-medium text-gray-900">
                                {session.duration} minutes
                              </span>
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time dateTime={session.created_at}>
                              {new Date(session.created_at).toLocaleDateString()}
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Student Preferences */}
      {selectedStudentData?.preferences && (
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Student Preferences</h3>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Work Duration</h4>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedStudentData.preferences.work_duration} minutes
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Reward Duration</h4>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedStudentData.preferences.reward_duration} minutes
                </p>
              </div>
              <div className="sm:col-span-2">
                <h4 className="text-sm font-medium text-gray-500">Favorite Rewards</h4>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedStudentData.preferences.favorite_rewards.map((reward, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                    >
                      {reward}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 