import "./Calendar.css";

interface CalendarProps {
  weddingDate: Date;
  holidays?: number[];
  weekDays?: string[];
}

const DEFAULT_WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function Calendar({
  weddingDate,
  holidays = [],
  weekDays = DEFAULT_WEEK_DAYS,
}: CalendarProps) {
  const year = weddingDate.getFullYear();
  const month = weddingDate.getMonth();
  const weddingDay = weddingDate.getDate();

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">
        {year}. {month + 1}. {weddingDay}
      </h2>

      <div className="calendar-grid">
        {weekDays.map((day, i) => (
          <div
            key={day}
            className={`calendar-header ${i === 0 ? "holiday" : ""}`}
          >
            {day}
          </div>
        ))}

        {cells.map((day, index) => {
          if (day === null) {
            return (
              <div key={`empty-${index}`} className="calendar-day empty" />
            );
          }

          const isWeddingDay = day === weddingDay;
          const colIndex = index % 7;
          const isSunday = colIndex === 0;
          const isHoliday = isSunday || holidays.includes(day);

          return (
            <div
              key={day}
              className={`calendar-day ${isWeddingDay ? "wedding-day" : ""} ${
                isHoliday ? "holiday" : ""
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
