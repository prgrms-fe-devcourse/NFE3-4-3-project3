export function stayCategoryFormat(cat3: string) {
  switch (cat3) {
    case 'B02010500':
      return '콘도미니엄';
    case 'B02010600':
      return '유스호스텔';
    case 'B02010700':
      return '펜션';
    case 'B02010900':
      return '모텔';
    case 'B02011000':
      return '민박';
    case 'B02011100':
      return '게스트하우스';
    case 'B02011200':
      return '홈스테이';
    case 'B02011600':
      return '한옥';
  }
}
export function restaurantCategoryFormat(cat3: string) {
  switch (cat3) {
    case 'A05020100':
      return '한식';
    case 'A05020200':
      return '양식';
    case 'A05020300':
      return '일식';
    case 'A05020400':
      return '중식';
    case 'A05020700':
      return '이색';
    case 'A05020900':
      return '카페';
  }
}
export function shoppingCategoryFormat(cat3: string) {
  switch (cat3) {
    case 'A04010100':
      return '5일장';
    case 'A04010200':
      return '시장';
    case 'A04010300':
      return '백화점';
    case 'A04010400':
      return '면세점';
    case 'A04010500':
      return '대형마트';
    case 'A04010600':
      return '전문매장';
    case 'A04010700':
      return '공예 / 공방';
    case 'A04010900':
      return '특산물 판매점';
    case 'A04011000':
      return '사후 면세점';
  }
}
export function reportsCategoryFormat(cat2: string) {
  switch (cat2) {
    case 'A0302':
      return '육상';
    case 'A0303':
      return '수상';
    case 'A0304':
      return '항공';
  }
}
