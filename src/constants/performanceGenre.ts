interface GenreType {
  genre: string;
  code: string;
}

export const genres: GenreType[] = [
  { genre: '연극', code: 'AAAA' },
  { genre: '무용(서양/한국무용)', code: 'BBBC' },
  { genre: '대중무용', code: 'BBBE' },
  { genre: '서양음악(클래식)', code: 'CCCA' },
  { genre: '한국음악(국악)', code: 'CCCC' },
  { genre: '대중음악', code: 'CCCD' },
  { genre: '복합', code: 'EEEA' },
  { genre: '서커스/마술', code: 'EEEB' },
  { genre: '뮤지컬', code: 'GGGA' },
];
