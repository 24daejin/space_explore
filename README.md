# 우주탐사 프로젝트 안내 페이지

학생용 수행평가 안내 페이지(정적 사이트)입니다.

## 파일 구성
- index.html — 화면 내용(안내 · 캔바 로그인 · 1~4차시)
- assets/css/style.css — 디자인
- assets/js/app.js — 단계 버튼 전환
- assets/js/config.js — 링크 주소 모음 (**주소가 바뀌면 이 파일만 고치면 됨**)

## 링크 바꾸기
config.js에서 makeup(보충 일정 신청), canvaAssignment(1차시 캔바 과제) 주소를 넣으면
해당 버튼이 나타납니다. 빈 문자열이면 버튼이 숨겨집니다.

## 단계별 바로가기
주소 뒤에 붙이면 그 단계가 열립니다: #guide #login #l1 #l2 #l3 #l4
예) https://(배포주소)/#l2 → 2차시 화면

## 배포
- Netlify Drop: app.netlify.com/drop 에 이 폴더를 끌어다 놓기
- GitHub Pages: 저장소에 올린 뒤 Settings → Pages → main 브랜치 / root
