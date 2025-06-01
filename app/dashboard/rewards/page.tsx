'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Reward, Student } from '../../lib/types'
import { Plus, Clock, Star, Gift } from 'lucide-react'

type RewardType = 'playtime' | 'activity' | 'item'

interface NewReward {
  name: string
  description: string
  points_required: number
  duration: number
  type: RewardType
  student_id: string
}

export default function RewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewRewardForm, setShowNewRewardForm] = useState(false)
  const [newReward, setNewReward] = useState<NewReward>({
    name: '',
    description: '',
    points_required: 100,
    duration: 15,
    type: 'playtime',
    student_id: '',
  })

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
            setNewReward(prev => ({ ...prev, student_id: studentsData[0].id }))
          }
        }

        // Fetch rewards
        const { data: rewardsData } = await supabase
          .from('rewards')
          .select('*')
          .eq('parent_id', session.user.id)
          .order('created_at', { ascending: false })

        if (rewardsData) {
          setRewards(rewardsData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleCreateReward = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { data, error } = await supabase
        .from('rewards')
        .insert([
          {
            ...newReward,
            parent_id: session.user.id,
            status: 'active',
          }
        ])
        .select()

      if (error) throw error
      if (data) {
        setRewards([...data, ...rewards])
        setShowNewRewardForm(false)
        setNewReward({
          name: '',
          description: '',
          points_required: 100,
          duration: 15,
          type: 'playtime',
          student_id: students[0]?.id || '',
        })
      }
    } catch (error) {
      console.error('Error creating reward:', error)
    }
  }

  const handleToggleRewardStatus = async (rewardId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
      const { error } = await supabase
        .from('rewards')
        .update({ status: newStatus })
        .eq('id', rewardId)

      if (error) throw error
      setRewards(rewards.map(reward =>
        reward.id === rewardId
          ? { ...reward, status: newStatus }
          : reward
      ))
    } catch (error) {
      console.error('Error toggling reward status:', error)
    }
  }

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
          <h1 className="text-2xl font-semibold text-gray-900">Rewards</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create and manage rewards for your students. Set up different types of rewards and their point requirements.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowNewRewardForm(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Reward
          </button>
        </div>
      </div>

      {showNewRewardForm && (
        <div className="mt-8 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Create New Reward</h3>
            <form onSubmit={handleCreateReward} className="mt-5 space-y-4">
              <div>
                <label htmlFor="student" className="block text-sm font-medium text-gray-700">
                  Student
                </label>
                <select
                  id="student"
                  value={newReward.student_id}
                  onChange={(e) => setNewReward(prev => ({ ...prev, student_id: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newReward.name}
                  onChange={(e) => setNewReward(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newReward.description}
                  onChange={(e) => setNewReward(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    id="type"
                    value={newReward.type}
                    onChange={(e) => setNewReward(prev => ({ ...prev, type: e.target.value as RewardType }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  >
                    <option value="playtime">Playtime</option>
                    <option value="activity">Activity</option>
                    <option value="item">Item</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="points" className="block text-sm font-medium text-gray-700">
                    Points Required
                  </label>
                  <input
                    type="number"
                    id="points"
                    value={newReward.points_required}
                    onChange={(e) => setNewReward(prev => ({ ...prev, points_required: parseInt(e.target.value) }))}
                    min="1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    value={newReward.duration}
                    onChange={(e) => setNewReward(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    min="1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewRewardForm(false)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Create Reward
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Reward
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Student
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Type
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Points
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Duration
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {rewards.map((reward) => {
                    const student = students.find(s => s.id === reward.student_id)
                    return (
                      <tr key={reward.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="font-medium text-gray-900">{reward.name}</div>
                          <div className="text-gray-500">{reward.description}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {student?.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="capitalize">{reward.type}</span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            {reward.points_required}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            {reward.duration} min
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            reward.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {reward.status}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => handleToggleRewardStatus(reward.id, reward.status)}
                            className={`${
                              reward.status === 'active'
                                ? 'text-red-600 hover:text-red-900'
                                : 'text-green-600 hover:text-green-900'
                            }`}
                          >
                            {reward.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 