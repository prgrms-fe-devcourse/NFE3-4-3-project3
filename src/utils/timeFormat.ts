// 시작 09:00 종료 18:00 시간 -> 오전 9시 ~오후 6시
export function formatOperatingHours(weekOprStime: string, weekOprEtime: string): string {
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour >= 12 ? '오후' : '오전';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // 0시를 12시로 변환
    return `${period} ${formattedHour}시`;
  };

  const startTime = formatTime(weekOprStime);
  const endTime = formatTime(weekOprEtime);

  return `${startTime} ~ ${endTime}`;
}
