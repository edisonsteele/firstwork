'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { AccessToken, Student } from '../../lib/types'
import { Copy, RefreshCw, Trash2 } from 'lucide-react'

export default function StudentsPage() {
  const [tokens, setTokens] = useState<AccessToken[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user role
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return

        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (profile) {
          setUserRole(profile.role)
        }

        // Fetch access tokens
        const { data: tokensData } = await supabase
          .from('access_tokens')
          .select('*')
          .order('created_at', { ascending: false })

        if (tokensData) {
          setTokens(tokensData)
        }

        // Fetch students
        const { data: studentsData } = await supabase
          .from('students')
          .select('*')
          .order('created_at', { ascending: false })

        if (studentsData) {
          setStudents(studentsData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleCopyToken = async (token: string) => {
    try {
      await navigator.clipboard.writeText(token)
      // You could add a toast notification here
    } catch (error) {
      console.error('Error copying token:', error)
    }
  }

  const handleGenerateToken = async () => {
    try {
      const { data, error } = await supabase
        .from('access_tokens')
        .insert([
          {
            token: generateToken(),
            status: 'active',
          }
        ])
        .select()

      if (error) throw error
      if (data) {
        setTokens([...data, ...tokens])
      }
    } catch (error) {
      console.error('Error generating token:', error)
    }
  }

  const handleDeleteToken = async (tokenId: string) => {
    try {
      const { error } = await supabase
        .from('access_tokens')
        .delete()
        .eq('id', tokenId)

      if (error) throw error
      setTokens(tokens.filter(token => token.id !== tokenId))
    } catch (error) {
      console.error('Error deleting token:', error)
    }
  }

  const generateToken = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15)
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
          <h1 className="text-2xl font-semibold text-gray-900">Access Tokens</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage access tokens for student devices. Tokens are automatically generated when purchasing a subscription.
          </p>
        </div>
        {userRole === 'admin' && (
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={handleGenerateToken}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
            >
              Generate Token
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Token
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Created
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Used By
                    </th>
                    {userRole === 'admin' && (
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {tokens.map((token) => {
                    const student = students.find(s => s.access_token_id === token.id)
                    return (
                      <tr key={token.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono">{token.token}</span>
                            <button
                              onClick={() => handleCopyToken(token.token)}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            token.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : token.status === 'used'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {token.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(token.created_at).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {student ? student.name : '-'}
                        </td>
                        {userRole === 'admin' && (
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              onClick={() => handleDeleteToken(token.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        )}
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