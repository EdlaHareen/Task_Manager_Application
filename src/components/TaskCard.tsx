import React from 'react';
import { Check, Clock, AlertCircle, CreditCard as Edit2, Trash2 } from 'lucide-react';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();
  
  const priorityColors = {
    high: 'border-red-200 bg-red-50',
    medium: 'border-amber-200 bg-amber-50',
    low: 'border-green-200 bg-green-50',
  };

  const priorityTextColors = {
    high: 'text-red-700',
    medium: 'text-amber-700',
    low: 'text-green-700',
  };

  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
        task.completed
          ? 'bg-gray-50 border-gray-200 opacity-75'
          : priorityColors[task.priority]
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
              task.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
            }`}
          >
            {task.completed && <Check size={14} />}
          </button>
          
          <div className="flex-1">
            <h3
              className={`font-medium ${
                task.completed
                  ? 'line-through text-gray-500'
                  : 'text-gray-900'
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={`text-sm mt-1 ${
                  task.completed ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {task.description}
              </p>
            )}
            
            <div className="flex items-center space-x-4 mt-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  task.completed ? 'bg-gray-200 text-gray-600' : priorityTextColors[task.priority]
                } bg-opacity-20`}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </span>
              
              <span className="text-xs text-gray-500">{task.category}</span>
              
              {task.dueDate && (
                <div className="flex items-center space-x-1">
                  {isOverdue ? (
                    <AlertCircle size={12} className="text-red-500" />
                  ) : (
                    <Clock size={12} className="text-gray-400" />
                  )}
                  <span
                    className={`text-xs ${
                      isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'
                    }`}
                  >
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-1 ml-2">
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};