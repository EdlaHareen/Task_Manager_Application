import React from 'react';
import { CheckCircle, Clock, AlertCircle, List } from 'lucide-react';
import { TaskStats as TaskStatsType } from '../types/task';
import { ProgressRing } from './ProgressRing';

interface TaskStatsProps {
  stats: TaskStatsType;
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Progress Overview</h2>
        <ProgressRing progress={stats.completionRate} size={80} strokeWidth={6} />
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <List className="text-blue-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
          <p className="text-sm text-blue-700">Total Tasks</p>
        </div>
        
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="text-green-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          <p className="text-sm text-green-700">Completed</p>
        </div>
        
        <div className="text-center p-3 bg-amber-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Clock className="text-amber-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
          <p className="text-sm text-amber-700">Pending</p>
        </div>
        
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <AlertCircle className="text-red-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
          <p className="text-sm text-red-700">Overdue</p>
        </div>
      </div>
    </div>
  );
};