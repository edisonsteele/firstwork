'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Student } from '../../lib/types'
import { Plus, X } from 'lucide-react'

export default function PreferencesPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savingReferral, setSavingReferral] = useState(false)
  const [referralError, setReferralError] = useState<string | null>(null)
  const [newReward, setNewReward] = useState('')
  const [preferences, setPreferences] = useState({
    work_duration: 15,
    reward_duration: 10,
    favorite_rewards: [] as string[],
    referral_code: '',
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

    const student = students.find(s => s.id === selectedStudent)
    if (student?.preferences) {
      setPreferences({
        work_duration: student.preferences.work_duration || 15,
        reward_duration: student.preferences.reward_duration || 10,
        favorite_rewards: student.preferences.favorite_rewards || [],
        referral_code: student.preferences.referral_code || '',
      })
    }
  }, [selectedStudent, students])

  const handleSave = async () => {
    try {
      setSaving(true)

      const { error } = await supabase
        .from('students')
        .update({
          preferences: {
            work_duration: preferences.work_duration,
            reward_duration: preferences.reward_duration,
            favorite_rewards: preferences.favorite_rewards,
          },
        })
        .eq('id', selectedStudent)

      if (error) throw error

      // Update local state
      setStudents(students.map(student => 
        student.id === selectedStudent
          ? { 
              ...student, 
              preferences: {
                ...student.preferences,
                work_duration: preferences.work_duration,
                reward_duration: preferences.reward_duration,
                favorite_rewards: preferences.favorite_rewards,
              }
            }
          : student
      ))
    } catch (error) {
      console.error('Error saving preferences:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleReferralCodeSubmit = async () => {
    try {
      setSavingReferral(true)
      setReferralError(null)

      const response = await fetch('/api/referrals/apply-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: selectedStudent,
          referralCode: preferences.referral_code,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to apply referral code')
      }

      // Update local state
      setStudents(students.map(student => 
        student.id === selectedStudent
          ? { 
              ...student, 
              preferences: {
                ...student.preferences,
                work_duration: student.preferences?.work_duration || 15,
                reward_duration: student.preferences?.reward_duration || 10,
                favorite_rewards: student.preferences?.favorite_rewards || [],
                referral_code: preferences.referral_code,
              }
            }
          : student
      ))
    } catch (error) {
      setReferralError(error instanceof Error ? error.message : 'Failed to apply referral code')
    } finally {
      setSavingReferral(false)
    }
  }

  const handleAddReward = () => {
    if (newReward.trim() && !preferences.favorite_rewards.includes(newReward.trim())) {
      setPreferences({
        ...preferences,
        favorite_rewards: [...preferences.favorite_rewards, newReward.trim()],
      })
      setNewReward('')
    }
  }

  const handleRemoveReward = (reward: string) => {
    setPreferences({
      ...preferences,
      favorite_rewards: preferences.favorite_rewards.filter(r => r !== reward),
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Student Preferences</h1>
          <p className="mt-2 text-sm text-gray-700">
            Customize work and reward settings for each student.
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
            {/* Work Duration */}
            <div>
              <label htmlFor="work-duration" className="block text-sm font-medium text-gray-700">
                Work Duration (minutes)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="work-duration"
                  id="work-duration"
                  min="1"
                  max="60"
                  value={preferences.work_duration}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    work_duration: parseInt(e.target.value) || 15,
                  })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
            </div>

            {/* Reward Duration */}
            <div>
              <label htmlFor="reward-duration" className="block text-sm font-medium text-gray-700">
                Reward Duration (minutes)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="reward-duration"
                  id="reward-duration"
                  min="1"
                  max="60"
                  value={preferences.reward_duration}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    reward_duration: parseInt(e.target.value) || 10,
                  })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
            </div>

            {/* Favorite Rewards */}
            <div>
              <label htmlFor="favorite-rewards" className="block text-sm font-medium text-gray-700">
                Favorite Rewards
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="favorite-rewards"
                  id="favorite-rewards"
                  value={newReward}
                  onChange={(e) => setNewReward(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddReward()}
                  className="block w-full rounded-l-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="Add a favorite reward"
                />
                <button
                  type="button"
                  onClick={handleAddReward}
                  className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {preferences.favorite_rewards.map((reward, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                  >
                    {reward}
                    <button
                      type="button"
                      onClick={() => handleRemoveReward(reward)}
                      className="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:bg-blue-500 focus:text-white focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Referral Code */}
            <div>
              <label htmlFor="referral-code" className="block text-sm font-medium text-gray-700">
                Referral Code
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="referral-code"
                  id="referral-code"
                  value={preferences.referral_code}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    referral_code: e.target.value,
                  })}
                  className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="Enter referral code"
                />
                <button
                  type="button"
                  onClick={handleReferralCodeSubmit}
                  disabled={savingReferral || !preferences.referral_code}
                  className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {savingReferral ? 'Applying...' : 'Apply'}
                </button>
              </div>
              {referralError && (
                <p className="mt-2 text-sm text-red-600">
                  {referralError}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                If you have a referral code, enter it here to apply it to your account.
              </p>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {saving ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 