const LIBRARY_KEY = import.meta.env.VITE_API_LIBRARY_KEY
const KOPIS_KEY = import.meta.env.VITE_KOPIS_KEY

/**
# ======================#
|       LIBRARY    |
# ======================#
*/

export const LIBRARY_ENDPOINT = Object.freeze({
  bookList: `/srchBooks?authKey=${LIBRARY_KEY}`, // 도서 리스트
  bookDetail: `/srchDtlList?authKey=${LIBRARY_KEY}`, // 도서 상세
  libraryLoanPossible: `/libSrchByBook?authKey=${LIBRARY_KEY}`, // 도서관 대출 가능 여부
  libraryUsageAnalysis: `/usageAnalysisList?authKey=${LIBRARY_KEY}`, // 도서 별 이용 분석
  keyword: `/monthlyKeywords?authKey=${LIBRARY_KEY}`, // 이달의 키워드
  libraryDetail: `/extends/libSrch?authKey=${LIBRARY_KEY}`,
  libraryPopularBook: `/extends/loanItemSrchByLib?authKey=${LIBRARY_KEY}`,
  bookwormList: `/recommandList?authKey=${LIBRARY_KEY}`,
  bookRankList: `/loanItemSrch?authKey=${LIBRARY_KEY}`,
  readQuantityAnalysis: `/readQt?authKey=${LIBRARY_KEY}`,
})

/**
 # ======================#
 |       KOPIS    |
 # ======================#
 */

const today = new Date()
const firstDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}01`
const todayDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`

export const KOPIS_ENDPOINT = Object.freeze({
  awardList: `/prfawad?service=${KOPIS_KEY}&stdate=${firstDate}&eddate=${todayDate}&cpage=1&rows=5`,
  monthlyList: `/boxoffice?service=${KOPIS_KEY}&stdate=${firstDate}&eddate=${todayDate}&cpage=1&rows=5`,
  prfDetailList: `/pblprfr/ID?service=${KOPIS_KEY}`,
  prfDetailPlace: `/prfplc/ID?service=${KOPIS_KEY}`,
  prfSearch: `/pblprfr?service=${KOPIS_KEY}`,
})

/**
# ======================#
|       USER    |
# ======================#
*/

export const USER_ENDPOINT = Object.freeze({
  userInfo: `/users`, // 유저 정보 조회
  userInfoEdit: `/settings/update-user`, // 유저 정보 수정
  userImageUpload: `/users/upload-photo`, // 유저 이미지 업로드
  userGetMessage: `/messages/conversations`, // 유저 메세지 조회
  userUpdateMessage: `/messages/update-seen`, // 유저 메세지 읽음 처리
  userNotification: `/notifications`, // 유저 알림 조회
  userUpdateNotification: `/notifications/seen`, // 유저 알림 읽음 처리
  userFollow: `/follow/create`, // 유저 팔로우 생성
  userUnFollow: `/follow/delete`, // 유저 팔로우 삭제
})

/**
# ======================#
|       POST    |
# ======================#
*/

export const POST_ENDPOINT = Object.freeze({
  postLike: `/likes/create`, // 게시글 좋아요
  postUnLike: `/likes/delete`, // 게시글 좋아요 취소
})
