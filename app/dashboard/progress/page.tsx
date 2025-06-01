'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Student, Task, Reward, Session } from '../../lib/types'
import { Star, Clock, CheckCircle, TrendingUp } from 'lucide-react'

interface StudentStats {
  totalTasks: number
  completedTasks: number
  totalPoints: number
  totalWorkTime: number
  totalRewardTime: number
  averageTaskCompletion: number
  recentSessions: Session[]
}

export default function ProgressPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<string>('')
  const [stats, setStats] = useState<StudentStats | null>(null)
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
    const fetchStats = async () => {
      if (!selectedStudent) return

      try {
        setLoading(true)
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return

        // Fetch tasks
        const { data: tasksData } = await supabase
          .from('tasks')
          .select('*')
          .eq('student_id', selectedStudent)

        // Fetch rewards
        const { data: rewardsData } = await supabase
          .from('rewards')
          .select('*')
          .eq('student_id', selectedStudent)

        // Fetch sessions
        const { data: sessionsData } = await supabase
          .from('sessions')
          .select('*')
          .eq('student_id', selectedStudent)
          .order('created_at', { ascending: false })
          .limit(10)

        if (tasksData && rewardsData && sessionsData) {
          const completedTasks = tasksData.filter((task: Task) => task.status === 'completed')
          const totalPoints = completedTasks.reduce((sum: number, task: Task) => sum + task.points, 0)
          const workSessions = sessionsData.filter((s: Session) => s.type === 'work')
          const rewardSessions = sessionsData.filter((s: Session) => s.type === 'reward')
          const totalWorkTime = workSessions.reduce((sum: number, session: Session) => sum + session.duration, 0)
          const totalRewardTime = rewardSessions.reduce((sum: number, session: Session) => sum + session.duration, 0)
          const averageTaskCompletion = tasksData.length > 0
            ? (completedTasks.length / tasksData.length) * 100
            : 0

          setStats({
            totalTasks: tasksData.length,
            completedTasks: completedTasks.length,
            totalPoints,
            totalWorkTime,
            totalRewardTime,
            averageTaskCompletion,
            recentSessions: sessionsData,
          })
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [selectedStudent])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Progress Tracking</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track your student's progress, achievements, and learning statistics.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {stats && (
        <>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Task Completion
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.completedTasks} / {stats.totalTasks}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          {stats.averageTaskCompletion.toFixed(1)}%
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
                    <Star className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Points Earned
                      </dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        {stats.totalPoints}
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
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Time Spent
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.totalWorkTime} min
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-500">
                          work
                        </div>
                      </dd>
                      <dd className="flex items-baseline mt-2">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.totalRewardTime} min
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-500">
                          reward
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Recent Sessions</h2>
            <div className="mt-4 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Type
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Duration
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Start Time
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            End Time
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {stats.recentSessions.map((session) => (
                          <tr key={session.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                session.type === 'work'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {session.type}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                                {session.duration} min
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {new Date(session.start_time).toLocaleString()}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {session.end_time ? new Date(session.end_time).toLocaleString() : '-'}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                session.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {session.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
} 