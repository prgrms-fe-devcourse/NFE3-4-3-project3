// NOTICE : 날짜 포맷을 변경하는 함수를 모아둔 파일

// 20250203 -> 2025-02-03
export function dateAddBarFormatter(dateString: string): string {
  // 문자열을 연도, 월, 일로 나누기
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);

  // 원하는 형식으로 조합하여 반환
  return `${year}-${month}-${day}`;
}
