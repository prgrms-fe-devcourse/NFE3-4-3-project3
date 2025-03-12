import type { Org } from './korOrg';

type CityOrgKey = Org['orgdownNm'];
// 각 시도 별 하위 지역 코드
const CITY_ORG: Record<CityOrgKey, { uprCd: string; orgCd: string; orgdownNm: string }[]> = {
  서울특별시: [
    {
      uprCd: '6110000',
      orgCd: '3220000',
      orgdownNm: '강남구',
    },
    {
      uprCd: '6110000',
      orgCd: '3240000',
      orgdownNm: '강동구',
    },
    {
      uprCd: '6110000',
      orgCd: '3080000',
      orgdownNm: '강북구',
    },
    {
      uprCd: '6110000',
      orgCd: '3150000',
      orgdownNm: '강서구',
    },
    {
      uprCd: '6110000',
      orgCd: '3200000',
      orgdownNm: '관악구',
    },
    {
      uprCd: '6110000',
      orgCd: '3040000',
      orgdownNm: '광진구',
    },
    {
      uprCd: '6110000',
      orgCd: '3160000',
      orgdownNm: '구로구',
    },
    {
      uprCd: '6110000',
      orgCd: '3170000',
      orgdownNm: '금천구',
    },
    {
      uprCd: '6110000',
      orgCd: '3100000',
      orgdownNm: '노원구',
    },
    {
      uprCd: '6110000',
      orgCd: '3090000',
      orgdownNm: '도봉구',
    },
    {
      uprCd: '6110000',
      orgCd: '3050000',
      orgdownNm: '동대문구',
    },
    {
      uprCd: '6110000',
      orgCd: '3190000',
      orgdownNm: '동작구',
    },
    {
      uprCd: '6110000',
      orgCd: '3130000',
      orgdownNm: '마포구',
    },
    {
      uprCd: '6110000',
      orgCd: '3120000',
      orgdownNm: '서대문구',
    },
    {
      uprCd: '6110000',
      orgCd: '6119998',
      orgdownNm: '서울특별시',
    },
    {
      uprCd: '6110000',
      orgCd: '3210000',
      orgdownNm: '서초구',
    },
    {
      uprCd: '6110000',
      orgCd: '3030000',
      orgdownNm: '성동구',
    },
    {
      uprCd: '6110000',
      orgCd: '3070000',
      orgdownNm: '성북구',
    },
    {
      uprCd: '6110000',
      orgCd: '3230000',
      orgdownNm: '송파구',
    },
    {
      uprCd: '6110000',
      orgCd: '3140000',
      orgdownNm: '양천구',
    },
    {
      uprCd: '6110000',
      orgCd: '3180000',
      orgdownNm: '영등포구',
    },
    {
      uprCd: '6110000',
      orgCd: '3020000',
      orgdownNm: '용산구',
    },
    {
      uprCd: '6110000',
      orgCd: '3110000',
      orgdownNm: '은평구',
    },
    {
      uprCd: '6110000',
      orgCd: '3000000',
      orgdownNm: '종로구',
    },
    {
      uprCd: '6110000',
      orgCd: '3010000',
      orgdownNm: '중구',
    },
    {
      uprCd: '6110000',
      orgCd: '3060000',
      orgdownNm: '중랑구',
    },
  ],
  부산광역시: [
    {
      uprCd: '6260000',
      orgCd: '3360000',
      orgdownNm: '강서구',
    },
    {
      uprCd: '6260000',
      orgCd: '3350000',
      orgdownNm: '금정구',
    },
    {
      uprCd: '6260000',
      orgCd: '3400000',
      orgdownNm: '기장군',
    },
    {
      uprCd: '6260000',
      orgCd: '3310000',
      orgdownNm: '남구',
    },
    {
      uprCd: '6260000',
      orgCd: '3270000',
      orgdownNm: '동구',
    },
    {
      uprCd: '6260000',
      orgCd: '3300000',
      orgdownNm: '동래구',
    },
    {
      uprCd: '6260000',
      orgCd: '3290000',
      orgdownNm: '부산진구',
    },
    {
      uprCd: '6260000',
      orgCd: '3320000',
      orgdownNm: '북구',
    },
    {
      uprCd: '6260000',
      orgCd: '3390000',
      orgdownNm: '사상구',
    },
    {
      uprCd: '6260000',
      orgCd: '3340000',
      orgdownNm: '사하구',
    },
    {
      uprCd: '6260000',
      orgCd: '3260000',
      orgdownNm: '서구',
    },
    {
      uprCd: '6260000',
      orgCd: '3380000',
      orgdownNm: '수영구',
    },
    {
      uprCd: '6260000',
      orgCd: '3370000',
      orgdownNm: '연제구',
    },
    {
      uprCd: '6260000',
      orgCd: '3280000',
      orgdownNm: '영도구',
    },
    {
      uprCd: '6260000',
      orgCd: '3250000',
      orgdownNm: '중구',
    },
    {
      uprCd: '6260000',
      orgCd: '3330000',
      orgdownNm: '해운대구',
    },
  ],
  대구광역시: [
    {
      uprCd: '6270000',
      orgCd: '5141000',
      orgdownNm: '군위군',
    },
    {
      uprCd: '6270000',
      orgCd: '3440000',
      orgdownNm: '남구',
    },
    {
      uprCd: '6270000',
      orgCd: '3470000',
      orgdownNm: '달서구',
    },
    {
      uprCd: '6270000',
      orgCd: '3480000',
      orgdownNm: '달성군',
    },
    {
      uprCd: '6270000',
      orgCd: '3420000',
      orgdownNm: '동구',
    },
    {
      uprCd: '6270000',
      orgCd: '3450000',
      orgdownNm: '북구',
    },
    {
      uprCd: '6270000',
      orgCd: '3430000',
      orgdownNm: '서구',
    },
    {
      uprCd: '6270000',
      orgCd: '3460000',
      orgdownNm: '수성구',
    },
    {
      uprCd: '6270000',
      orgCd: '3410000',
      orgdownNm: '중구',
    },
  ],
  인천광역시: [
    {
      uprCd: '6280000',
      orgCd: '3570000',
      orgdownNm: '강화군',
    },
    {
      uprCd: '6280000',
      orgCd: '3550000',
      orgdownNm: '계양구',
    },
    {
      uprCd: '6280000',
      orgCd: '3530000',
      orgdownNm: '남동구',
    },
    {
      uprCd: '6280000',
      orgCd: '3500000',
      orgdownNm: '동구',
    },
    {
      uprCd: '6280000',
      orgCd: '3510500',
      orgdownNm: '미추홀구',
    },
    {
      uprCd: '6280000',
      orgCd: '3540000',
      orgdownNm: '부평구',
    },
    {
      uprCd: '6280000',
      orgCd: '3560000',
      orgdownNm: '서구',
    },
    {
      uprCd: '6280000',
      orgCd: '3520000',
      orgdownNm: '연수구',
    },
    {
      uprCd: '6280000',
      orgCd: '3580000',
      orgdownNm: '옹진군',
    },
    {
      uprCd: '6280000',
      orgCd: '3490000',
      orgdownNm: '중구',
    },
  ],
  광주광역시: [
    {
      uprCd: '6290000',
      orgCd: '3630000',
      orgdownNm: '광산구',
    },
    {
      uprCd: '6290000',
      orgCd: '6299998',
      orgdownNm: '광주광역시',
    },
    {
      uprCd: '6290000',
      orgCd: '3610000',
      orgdownNm: '남구',
    },
    {
      uprCd: '6290000',
      orgCd: '3590000',
      orgdownNm: '동구',
    },
    {
      uprCd: '6290000',
      orgCd: '3620000',
      orgdownNm: '북구',
    },
    {
      uprCd: '6290000',
      orgCd: '3600000',
      orgdownNm: '서구',
    },
  ],
  세종특별자치시: [
    {
      uprCd: '5690000',
      orgCd: '5690000',
      orgdownNm: '세종특별자치시',
    },
  ],
  대전광역시: [
    {
      uprCd: '6300000',
      orgCd: '3680000',
      orgdownNm: '대덕구',
    },
    {
      uprCd: '6300000',
      orgCd: '3640000',
      orgdownNm: '동구',
    },
    {
      uprCd: '6300000',
      orgCd: '3660000',
      orgdownNm: '서구',
    },
    {
      uprCd: '6300000',
      orgCd: '3670000',
      orgdownNm: '유성구',
    },
    {
      uprCd: '6300000',
      orgCd: '3650000',
      orgdownNm: '중구',
    },
  ],
  울산광역시: [
    {
      uprCd: '6310000',
      orgCd: '3700000',
      orgdownNm: '남구',
    },
    {
      uprCd: '6310000',
      orgCd: '3710000',
      orgdownNm: '동구',
    },
    {
      uprCd: '6310000',
      orgCd: '3720000',
      orgdownNm: '북구',
    },
    {
      uprCd: '6310000',
      orgCd: '3730000',
      orgdownNm: '울주군',
    },
    {
      uprCd: '6310000',
      orgCd: '3690000',
      orgdownNm: '중구',
    },
  ],
  강원특별자치도: [
    {
      uprCd: '6530000',
      orgCd: '4201000',
      orgdownNm: '강릉시',
    },
    {
      uprCd: '6530000',
      orgCd: '4341000',
      orgdownNm: '고성군',
    },
    {
      uprCd: '6530000',
      orgCd: '4211000',
      orgdownNm: '동해시',
    },
    {
      uprCd: '6530000',
      orgCd: '4241000',
      orgdownNm: '삼척시',
    },
    {
      uprCd: '6530000',
      orgCd: '4231000',
      orgdownNm: '속초시',
    },
    {
      uprCd: '6530000',
      orgCd: '4321000',
      orgdownNm: '양구군',
    },
    {
      uprCd: '6530000',
      orgCd: '4351000',
      orgdownNm: '양양군',
    },
    {
      uprCd: '6530000',
      orgCd: '4271000',
      orgdownNm: '영월군',
    },
    {
      uprCd: '6530000',
      orgCd: '4191000',
      orgdownNm: '원주시',
    },
    {
      uprCd: '6530000',
      orgCd: '4331000',
      orgdownNm: '인제군',
    },
    {
      uprCd: '6530000',
      orgCd: '4291000',
      orgdownNm: '정선군',
    },
    {
      uprCd: '6530000',
      orgCd: '4301000',
      orgdownNm: '철원군',
    },
    {
      uprCd: '6530000',
      orgCd: '4181000',
      orgdownNm: '춘천시',
    },
    {
      uprCd: '6530000',
      orgCd: '4221000',
      orgdownNm: '태백시',
    },
    {
      uprCd: '6530000',
      orgCd: '4281000',
      orgdownNm: '평창군',
    },
    {
      uprCd: '6530000',
      orgCd: '4251000',
      orgdownNm: '홍천군',
    },
    {
      uprCd: '6530000',
      orgCd: '4311000',
      orgdownNm: '화천군',
    },
    {
      uprCd: '6530000',
      orgCd: '4261000',
      orgdownNm: '횡성군',
    },
  ],
  경기도: [
    {
      uprCd: '6410000',
      orgCd: '4160000',
      orgdownNm: '가평군',
    },
    {
      uprCd: '6410000',
      orgCd: '6419998',
      orgdownNm: '경기도',
    },
    {
      uprCd: '6410000',
      orgCd: '3940000',
      orgdownNm: '고양시',
    },
    {
      uprCd: '6410000',
      orgCd: '3970000',
      orgdownNm: '과천시',
    },
    {
      uprCd: '6410000',
      orgCd: '3900000',
      orgdownNm: '광명시',
    },
    {
      uprCd: '6410000',
      orgCd: '5540000',
      orgdownNm: '광주시',
    },
    {
      uprCd: '6410000',
      orgCd: '3980000',
      orgdownNm: '구리시',
    },
    {
      uprCd: '6410000',
      orgCd: '4020000',
      orgdownNm: '군포시',
    },
    {
      uprCd: '6410000',
      orgCd: '4090000',
      orgdownNm: '김포시',
    },
    {
      uprCd: '6410000',
      orgCd: '3990000',
      orgdownNm: '남양주시',
    },
    {
      uprCd: '6410000',
      orgCd: '3920000',
      orgdownNm: '동두천시',
    },
    {
      uprCd: '6410000',
      orgCd: '3860000',
      orgdownNm: '부천시',
    },
    {
      uprCd: '6410000',
      orgCd: '3780000',
      orgdownNm: '성남시',
    },
    {
      uprCd: '6410000',
      orgCd: '3740000',
      orgdownNm: '수원시',
    },
    {
      uprCd: '6410000',
      orgCd: '4010000',
      orgdownNm: '시흥시',
    },
    {
      uprCd: '6410000',
      orgCd: '3930000',
      orgdownNm: '안산시',
    },
    {
      uprCd: '6410000',
      orgCd: '4080000',
      orgdownNm: '안성시',
    },
    {
      uprCd: '6410000',
      orgCd: '3830000',
      orgdownNm: '안양시',
    },
    {
      uprCd: '6410000',
      orgCd: '5590000',
      orgdownNm: '양주시',
    },
    {
      uprCd: '6410000',
      orgCd: '4170000',
      orgdownNm: '양평군',
    },
    {
      uprCd: '6410000',
      orgCd: '5700000',
      orgdownNm: '여주시',
    },
    {
      uprCd: '6410000',
      orgCd: '4140000',
      orgdownNm: '연천군',
    },
    {
      uprCd: '6410000',
      orgCd: '4000000',
      orgdownNm: '오산시',
    },
    {
      uprCd: '6410000',
      orgCd: '4050000',
      orgdownNm: '용인시',
    },
    {
      uprCd: '6410000',
      orgCd: '4030000',
      orgdownNm: '의왕시',
    },
    {
      uprCd: '6410000',
      orgCd: '3820000',
      orgdownNm: '의정부시',
    },
    {
      uprCd: '6410000',
      orgCd: '4070000',
      orgdownNm: '이천시',
    },
    {
      uprCd: '6410000',
      orgCd: '4060000',
      orgdownNm: '파주시',
    },
    {
      uprCd: '6410000',
      orgCd: '3910000',
      orgdownNm: '평택시',
    },
    {
      uprCd: '6410000',
      orgCd: '5600000',
      orgdownNm: '포천시',
    },
    {
      uprCd: '6410000',
      orgCd: '4040000',
      orgdownNm: '하남시',
    },
    {
      uprCd: '6410000',
      orgCd: '5530000',
      orgdownNm: '화성시',
    },
  ],
};

export default CITY_ORG;
