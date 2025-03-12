export default function dateGap(dateString: string): string {
  // 입력된 날짜를 Date 객체로 변환
  const inputDate = new Date(dateString);
  const today = new Date(); // 오늘 날짜

  // 오늘 날짜를 YYYY-MM-DD 형식으로 변환
  today.setHours(0, 0, 0, 0); // 시간 부분을 0으로 설정하여 날짜만 비교

  // 날짜 차이 계산
  const timeDifference = today - inputDate; // 밀리초 차이
  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // 일 단위로 변환

  // 결과 반환
  if (dayDifference > 0) {
    return `D+${dayDifference}`; // 과거
  } else if (dayDifference < 0) {
    return `D-${Math.abs(dayDifference)}`; // 미래
  } else {
    return 'D-Day'; // 오늘
  }
}
