'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Student, Task, Reward, Session } from '../../lib/types'
import { Play, StopCircle, Clock } from 'lucide-react'

export default function SessionsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<string>('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [rewards, setRewards] = useState<Reward[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSession, setActiveSession] = useState<Session | null>(null)
  const [sessionTimer, setSessionTimer] = useState<number>(0)
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null)

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
          .eq('status', 'pending')

        // Fetch rewards
        const { data: rewardsData } = await supabase
          .from('rewards')
          .select('*')
          .eq('student_id', selectedStudent)
          .eq('status', 'active')

        // Fetch active session
        const { data: activeSessionData } = await supabase
          .from('sessions')
          .select('*')
          .eq('student_id', selectedStudent)
          .eq('status', 'in_progress')
          .single()

        if (tasksData) setTasks(tasksData)
        if (rewardsData) setRewards(rewardsData)
        if (activeSessionData) {
          setActiveSession(activeSessionData)
          const elapsedTime = Math.floor((Date.now() - new Date(activeSessionData.start_time).getTime()) / 1000 / 60)
          setSessionTimer(elapsedTime)
          startTimer()
        }
      } catch (error) {
        console.error('Error fetching student data:', error)
      }
    }

    fetchStudentData()
  }, [selectedStudent])

  const startTimer = () => {
    if (timerInterval) clearInterval(timerInterval)
    const interval = setInterval(() => {
      setSessionTimer(prev => prev + 1)
    }, 60000) // Update every minute
    setTimerInterval(interval)
  }

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
      setTimerInterval(null)
    }
  }

  const handleStartSession = async (type: 'work' | 'reward', taskId?: string, rewardId?: string) => {
    try {
      const student = students.find(s => s.id === selectedStudent)
      if (!student) return

      const duration = type === 'work' 
        ? student.preferences?.work_duration || 15
        : student.preferences?.reward_duration || 10

      const { data: session, error } = await supabase
        .from('sessions')
        .insert([
          {
            student_id: selectedStudent,
            parent_id: student.parent_id,
            type,
            status: 'in_progress',
            duration,
            start_time: new Date().toISOString(),
            task_id: taskId,
            reward_id: rewardId,
          }
        ])
        .select()
        .single()

      if (error) throw error

      setActiveSession(session)
      setSessionTimer(0)
      startTimer()

      // If it's a work session, update task status
      if (type === 'work' && taskId) {
        await supabase
          .from('tasks')
          .update({ status: 'in_progress' })
          .eq('id', taskId)
      }
    } catch (error) {
      console.error('Error starting session:', error)
    }
  }

  const handleCompleteSession = async () => {
    if (!activeSession) return

    try {
      const { error } = await supabase
        .from('sessions')
        .update({
          status: 'completed',
          end_time: new Date().toISOString(),
        })
        .eq('id', activeSession.id)

      if (error) throw error

      // If it's a work session, update task status and create progress record
      if (activeSession.type === 'work' && activeSession.task_id) {
        const task = tasks.find(t => t.id === activeSession.task_id)
        if (task) {
          await supabase
            .from('tasks')
            .update({ 
              status: 'completed',
              completed_at: new Date().toISOString(),
            })
            .eq('id', task.id)

          // Create progress record
          await supabase
            .from('progress')
            .insert([
              {
                student_id: selectedStudent,
                parent_id: activeSession.parent_id,
                date: new Date().toISOString().split('T')[0],
                tasks_completed: 1,
                points_earned: task.points,
                work_time: sessionTimer,
                reward_time: 0,
              }
            ])
        }
      }

      setActiveSession(null)
      stopTimer()
      setSessionTimer(0)
    } catch (error) {
      console.error('Error completing session:', error)
    }
  }

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
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Sessions</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage work and reward sessions for your students.
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

      {/* Active Session */}
      {activeSession && (
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Active {activeSession.type === 'work' ? 'Work' : 'Reward'} Session
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    Duration: {activeSession.duration} minutes
                  </p>
                  <p>
                    Elapsed: {sessionTimer} minutes
                  </p>
                </div>
              </div>
              <div className="mt-5 sm:mt-0 sm:ml-4">
                <button
                  type="button"
                  onClick={handleCompleteSession}
                  className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  <StopCircle className="h-4 w-4 mr-2" />
                  End Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Work Tasks */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Work Tasks</h3>
          <div className="mt-5">
            <div className="flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {tasks.map((task) => (
                  <li key={task.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {task.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {task.description}
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => handleStartSession('work', task.id)}
                          disabled={!!activeSession}
                          className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start Work
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Rewards</h3>
          <div className="mt-5">
            <div className="flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {rewards.map((reward) => (
                  <li key={reward.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {reward.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {reward.description}
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => handleStartSession('reward', undefined, reward.id)}
                          disabled={!!activeSession}
                          className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start Reward
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 