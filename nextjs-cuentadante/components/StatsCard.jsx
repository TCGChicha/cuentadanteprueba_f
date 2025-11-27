'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const StatsCard = ({ icon, title, value, subtitle, color = 'blue', trend }) => {
  const colorClasses = {
    blue: 'stats-card-blue',
    green: 'stats-card-green',
    yellow: 'stats-card-yellow',
    red: 'stats-card-red',
    purple: 'stats-card-purple'
  }

  return (
    <div className={`stats-card ${colorClasses[color]}`}>
      <div className="stats-card-content">
        <div className="stats-icon">
          {icon}
        </div>
        <div className="stats-info">
          <h3 className="stats-title">{title}</h3>
          <div className="stats-value">{value}</div>
          {subtitle && <p className="stats-subtitle">{subtitle}</p>}
          {trend && (
            <div className={`stats-trend ${trend.type}`}>
              <span className="trend-icon">
                {trend.type === 'up' ? <TrendingUp size={14} /> : trend.type === 'down' ? <TrendingDown size={14} /> : <Minus size={14} />}
              </span>
              <span className="trend-text">{trend.text}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StatsCard

