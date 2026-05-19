import { useState, useEffect, useMemo, useRef } from 'react';
import { CheckCircle, Search, Filter, Calendar } from "lucide-react";

const BADGE_STYLES: Record<string, string> = {
  'Present': 'badge-present',
  'Late': 'badge-late',
  'Absent': 'badge-absent',
  'On Leave': 'badge-leave',
  'No schedule': 'badge-none',
  '-': 'badge-none'
};

const OVERVIEW_CARDS = [
  { title: 'Present Today', key: 'present' },
  { title: 'Late Today', key: 'late' },
  { title: 'Absent Today', key: 'absent' },
  { title: 'On Leave Today', key: 'onLeave' }
] as const;

const FILTER_OPTIONS = [
  { label: 'Show All', value: 'All' },
  { label: 'Has Lates this Week', value: 'Late' },
  { label: 'Has Absences this Week', value: 'Absent' },
  { label: 'On Leave this Week', value: 'On Leave' }
];

export default function SuperadminReports() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState<any>({ 
    present: [], late: [], absent: [], onLeave: [], tableData: [] 
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All'); 

  const dateInputRef = useRef<HTMLInputElement>(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const getFormattedDateString = (dateObj: Date) => {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const weekDates = useMemo(() => {
    const current = new Date(selectedDate);
    const sunday = new Date(current);
    sunday.setDate(current.getDate() - current.getDay());

    return Array.from({ length: 7 }, (_, i) => {
      const nextDay = new Date(sunday);
      nextDay.setDate(sunday.getDate() + i);
      return nextDay;
    });
  }, [selectedDate]);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/reports?date=${getFormattedDateString(selectedDate)}`)
      .then(res => res.json())
      .then(fetchedData => {
        if (!fetchedData.error) setData(fetchedData);
        else console.error("Backend Error:", fetchedData.error);
      })
      .catch(err => console.error("Network Error:", err))
      .finally(() => setLoading(false));
  }, [selectedDate, API_URL]);

  const displayDJs = useMemo(() => {
    let result = data.tableData || [];

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter((dj: any) => 
        dj.stage_name?.toLowerCase().includes(lowerQuery) ||
        dj.real_name?.toLowerCase().includes(lowerQuery)
      );
    }

    if (activeFilter !== 'All') {
      result = result.filter((dj: any) => 
        dj.weekly_status && Object.values(dj.weekly_status).includes(activeFilter)
      );
    }

    return result;
  }, [data.tableData, searchQuery, activeFilter]);

  const handleOpenCalendar = () => {
    try {
      dateInputRef.current?.showPicker();
    } catch {
      dateInputRef.current?.focus(); 
    }
  };

  if (loading) {
    return <div className="loading-container"><h2>Loading reports...</h2></div>;
  }

  return (
    <div className="reports-container">
      <h1 className="page-title">Overview</h1>

      <div className="overview-cards">
        {OVERVIEW_CARDS.map(({ title, key }) => (
          <div key={key} className="status-card">
            <div className="card-header">
              <div className="icon-box"><CheckCircle size={16} /></div>
              <span className="status-text">{title}</span>
            </div>
            <div className="card-list-content">
              {data[key]?.length > 0 ? (
                data[key].map((dj: any, index: number) => (
                  <div key={index} className="list-item">{dj.stage_name}</div>
                ))
              ) : (
                <div className="list-item" style={{ color: '#999' }}>-</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="controls-row">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search employee..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="search-icon"><Search size={18} /></div>
        </div>
        
        <div className="filter-actions">
          <div style={{ position: 'relative' }}>
            <button 
              className="action-btn" 
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              style={{ backgroundColor: activeFilter !== 'All' ? '#DCE4EC' : '#EBEBEB' }}
            >
              <Filter size={16} /> Filter {activeFilter !== 'All' && `(${activeFilter})`}
            </button>
            
            {showFilterMenu && (
              <div className="filter-dropdown-menu">
                {FILTER_OPTIONS.map(({ label, value }) => (
                  <div key={value} onClick={() => { setActiveFilter(value); setShowFilterMenu(false); }}>
                    {label}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div style={{ position: 'relative', display: 'flex' }}>
            <button className="action-btn" onClick={handleOpenCalendar}>
              <Calendar size={16} /> {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </button>
            <input
              type="date"
              ref={dateInputRef}
              value={getFormattedDateString(selectedDate)}
              onChange={(e) => {
                if (e.target.value) {
                  const [y, m, d] = e.target.value.split('-');
                  setSelectedDate(new Date(Number(y), Number(m) - 1, Number(d)));
                }
              }}
              style={{ position: 'absolute', width: '0px', height: '0px', opacity: 0, pointerEvents: 'none' }}
            />
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Employee</th>
              {weekDates.map((date, index) => {
                const isSelected = getFormattedDateString(date) === getFormattedDateString(selectedDate);
                return (
                  <th key={index} className={isSelected ? 'current-day-header' : ''} style={{ whiteSpace: 'nowrap' }}>
                    {date.toLocaleDateString('en-US', { weekday: 'long' })} - {date.getDate()}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {displayDJs.length === 0 ? (
               <tr><td colSpan={8} style={{textAlign: 'center', padding: '20px'}}>No records found</td></tr>
            ) : (
              displayDJs.map((row: any, index: number) => (
                <tr key={index}>
                  <td className="employee-cell">
                    <div className="avatar"></div>
                    <div className="employee-details">
                      <span className="dj-name">{row.stage_name || "Unassigned"}</span>
                      <span className="real-name">{row.real_name}</span>
                    </div>
                  </td>
                  {weekDates.map((date, i) => {
                    const dateStr = getFormattedDateString(date);
                    const status = row.weekly_status?.[dateStr] || 'No schedule';
                    const isSelected = dateStr === getFormattedDateString(selectedDate);
                    const badgeClass = BADGE_STYLES[status] || 'badge-none';

                    return (
                      <td key={i} className={isSelected ? 'current-day-cell' : ''}>
                        <div className={`status-badge ${badgeClass}`}>
                          {status}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}