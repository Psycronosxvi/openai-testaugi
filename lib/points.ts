export interface PointsTransaction {
  id: string;
  userId: string | null; // null for guest users
  points: number;
  reason: string;
  timestamp: Date;
  synced?: boolean;
}

export interface PointsState {
  totalPoints: number;
  transactions: PointsTransaction[];
  lastSyncedAt?: Date;
}

// Points awarded for different actions
export const POINTS_CONFIG = {
  CHAT_MESSAGE: 5,
  LONG_CONVERSATION: 20, // 10+ messages
  DAILY_LOGIN: 10,
  FEATURE_EXPLORATION: 15,
  VOICE_INTERACTION: 10,
  FILE_UPLOAD: 8,
  SCREEN_SHARE: 12,
  CAMERA_USE: 12,
  PROFILE_COMPLETE: 25,
  FIRST_CHAT: 30,
};

// Local storage keys
const POINTS_KEY = 'augi_points';
const TEMP_POINTS_KEY = 'augi_temp_points';
const SYNC_INTERVAL = 5 * 60 * 1000; // 5 minutes

// Sync points with Supabase
async function syncPoints(userId: string) {
  const { transactions, lastSyncedAt } = getPoints(userId);
  const unsyncedTransactions = transactions.filter(t => !t.synced);

  if (unsyncedTransactions.length === 0) return;

  try {
    for (const transaction of unsyncedTransactions) {
      await supabase.rpc('add_points', {
        p_user_id: userId,
        p_points: transaction.points,
        p_reason: transaction.reason
      });
      transaction.synced = true;
    }

    const newState = {
      totalPoints: transactions.reduce((sum, t) => sum + t.points, 0),
      transactions,
      lastSyncedAt: new Date()
    };

    localStorage.setItem(POINTS_KEY, JSON.stringify(newState));
  } catch (error) {
    console.error('Error syncing points:', error);
  }
}

// Get points for a user or guest
export function getPoints(userId: string | null = null): PointsState {
  const key = userId ? POINTS_KEY : TEMP_POINTS_KEY;
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const data = JSON.parse(stored);
      return {
        ...data,
        transactions: data.transactions.map((t: any) => ({
          ...t,
          timestamp: new Date(t.timestamp)
        }))
      };
    }
  } catch (error) {
    console.error('Error loading points:', error);
  }
  return { totalPoints: 0, transactions: [] };
}

// Add points for an action
export function addPoints(
  points: number,
  reason: string,
  userId: string | null = null
): PointsState {
  const key = userId ? POINTS_KEY : TEMP_POINTS_KEY;
  const currentState = getPoints(userId);
  
  const transaction: PointsTransaction = {
    id: Math.random().toString(36).slice(2),
    userId,
    points,
    reason,
    timestamp: new Date(),
    synced: false
  };

  const newState = {
    totalPoints: currentState.totalPoints + points,
    transactions: [...currentState.transactions, transaction],
    lastSyncedAt: currentState.lastSyncedAt
  };

  try {
    localStorage.setItem(key, JSON.stringify(newState));
    
    // Sync with Supabase if user is logged in
    if (userId) {
      const lastSync = currentState.lastSyncedAt?.getTime() || 0;
      const now = Date.now();
      
      if (now - lastSync >= SYNC_INTERVAL) {
        syncPoints(userId);
      }
    }
  } catch (error) {
    console.error('Error saving points:', error);
  }

  return newState;
}

// Transfer temporary points to user account
export function transferTempPoints(userId: string): PointsState {
  const tempPoints = getPoints(null);
  const userPoints = getPoints(userId);

  const newState = {
    totalPoints: userPoints.totalPoints + tempPoints.totalPoints,
    transactions: [
      ...userPoints.transactions,
      ...tempPoints.transactions.map(t => ({ ...t, userId }))
    ]
  };

  try {
    localStorage.setItem(POINTS_KEY, JSON.stringify(newState));
    localStorage.removeItem(TEMP_POINTS_KEY);
  } catch (error) {
    console.error('Error transferring points:', error);
  }

  return newState;
}