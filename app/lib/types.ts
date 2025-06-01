export type AccessToken = {
  id: string
  token: string
  status: 'active' | 'used' | 'expired'
  created_at: string
  used_at?: string
  expires_at?: string
  student_id?: string
  purchase_id?: string
}

export type Student = {
  id: string
  name: string
  access_token_id: string
  created_at: string
  last_active?: string
  parent_id: string
  preferences?: {
    work_duration: number // in minutes
    reward_duration: number // in minutes
    favorite_rewards: string[]
    referral_code?: string
  }
}

export type Purchase = {
  id: string
  user_id: string
  stripe_customer_id: string
  stripe_subscription_id: string
  plan: 'single' | 'small' | 'medium' | 'large' | 'custom'
  quantity: number
  status: 'active' | 'cancelled' | 'expired'
  created_at: string
  expires_at?: string
}

export type Task = {
  id: string
  student_id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: 'academic' | 'life_skills' | 'social' | 'behavior'
  status: 'pending' | 'in_progress' | 'completed'
  points: number
  created_at: string
  completed_at?: string
  parent_id: string
}

export type Reward = {
  id: string
  student_id: string
  name: string
  description: string
  points_required: number
  duration: number
  type: 'playtime' | 'activity' | 'item'
  status: 'active' | 'inactive'
  created_at: string
  used_at?: string
  parent_id: string
}

export type Session = {
  id: string
  student_id: string
  parent_id: string
  type: 'work' | 'reward'
  status: 'in_progress' | 'completed'
  duration: number
  start_time: string
  end_time?: string
  task_id?: string
  reward_id?: string
  created_at: string
}

export type Progress = {
  id: string
  student_id: string
  date: string
  tasks_completed: number
  points_earned: number
  work_time: number // in minutes
  reward_time: number // in minutes
  parent_id: string
}

export type Referral = {
  id: string
  referrer_id: string
  referred_email: string
  purchase_id: string
  status: 'pending' | 'completed' | 'expired'
  created_at: string
  completed_at?: string
  reward_claimed: boolean
  reward_type?: 'access_token' | 'subscription_discount'
  reward_value?: number
}

export type ReferralReward = {
  id: string
  referral_id: string
  type: 'access_token' | 'subscription_discount'
  value: number
  status: 'pending' | 'claimed' | 'expired'
  created_at: string
  claimed_at?: string
  expires_at?: string
} 