# Wedding Invitation

디지털 청첩장 웹사이트 템플릿입니다. 누구나 사진과 결혼식 정보를 채워서 바로 배포할 수 있도록 만들어졌습니다.

- 대상: 일반 사용자(코드 없이 수정 가능) + 개발자(커스터마이즈/배포 자동화 가능)
- 배포: GitHub Pages 또는 Vercel(무료)
- 특징: 모바일/PC 대응, 공유하기/지도(선택), 갤러리, 계좌/연락처 등 기본 섹션 포함

## 빠른 시작 (일반 사용자)

아래 순서로 진행하면 코드를 몰라도 배포할 수 있습니다.

1. `Fork`로 내 저장소 만들기
2. `setting.json` 수정
3. 이미지 업로드
4. Vercel 또는 GitHub Pages로 배포

## 프로젝트 구조 & 파일 위치

이 프로젝트는 대부분의 내용을 `setting.json` 한 파일로 제어합니다.  
이미지 파일은 경로에 맞게 업로드하고, **파일명은 `setting.json`에 적은 이름과 정확히 일치**해야 합니다.

- `setting.json`: 화면에 표시될 모든 텍스트/이미지/옵션
- `src/assets/gallery/`: 배너/갤러리 이미지
- `src/assets/`: 약도, 웨딩홀 로고, QR 등 기타 이미지
- `public/og.png`: 공유용 대표 이미지(링크 미리보기)

## 준비 사항

- GitHub 계정
- (선택) 카카오 지도/공유하기 기능을 쓰려면 Kakao Developers 계정

## 1. 내 저장소 만들기 (Fork)

1. GitHub 가입: https://github.com/signup
2. 이 저장소에서 `Fork` 버튼 클릭
3. 생성된 내 저장소로 이동

## 2. setting.json 수정

1. 내 저장소에서 `setting.json` 파일 열기
2. 연필 아이콘을 눌러 편집
3. 아래 표를 참고하여 내 정보로 변경
4. 참고: `setting.json`의 **최상위 필드 순서가 화면 섹션 순서에 반영**됩니다.  
   단, `banner`와 `title` 섹션은 항상 고정 위치로 표시됩니다.

### setting.json 필드 안내

| 구분 | 필수 | 설명 | 추가 작업 |
| --- | --- | --- | --- |
| `site` | O | 페이지 타이틀/대표 이미지(OG) 설정 | `public/og.png` 교체 |
| `banner` | O | 첫 화면 배너 이미지 파일명 | `src/assets/gallery`에 이미지 업로드 |
| `hero` | O | 신랑/신부 및 부모님 정보 | 부모님 없는 경우 `names` 생략 가능 |
| `wedding` | O | 결혼식 날짜/시간/장소 | 예시 형식 유지 권장 |
| `map` | X | 카카오 지도 설정 | 키/좌표/로고/약도 준비 필요 |
| `title` | X | 상단 안내 문구 | `showParent`로 부모님 표기 제어 |
| `effects` | X | 화면 효과 설정 (`sakura: true/false`) | 벚꽃 애니메이션 사용 여부 제어 |
| `countdown` | X | 카운트다운 표시 | `false` 또는 생략 시 비활성 |
| `story` | X | 감사 인사 | 이미지 사용 시 `src/assets` 업로드 |
| `calendar` | X | 달력 표시 | `false` 또는 생략 시 비활성 |
| `contact` | X | 연락처 정보(신랑/신부 및 부모님 등) | 숫자만/하이픈 포함 형식 유지 권장 |
| `notice` | X | 안내사항 (주차, 식장 안내 등) | 여러 줄 입력 가능 |
| `bus_notice` | X | 대절 버스 안내 | QR 이미지 있으면 `src/assets` 업로드 |
| `congratulations` | X | 축의금 계좌 안내 | 은행명/예금주/계좌번호 형식 유지 권장 |
| `share` | X | 카카오 공유하기 설정 | 템플릿 ID + JavaScript 키 필요 |

## 3. 이미지 업로드

이미지 파일은 GitHub에서 직접 업로드할 수 있습니다.  
어떤 이미지를 어디에 넣어야 하는지는 위의 **프로젝트 구조 & 파일 위치**를 참고하세요.

팁: 파일명이 `setting.json`과 다르면 화면에 표시되지 않습니다.

## 4. 배포 방법 선택

### A. Vercel 배포 (추천, 쉬움)

1. https://vercel.com/signup 에서 가입
2. `Add New` → `Project`
3. `Import Git Repository`에서 내 Fork 저장소 선택
4. `Deploy` 클릭
5. 배포 후 `Domains`에서 `myname.vercel.app` 형태로 도메인 설정

장점
- 설정이 쉽고 배포가 빠름
단점
- 트래픽이 많으면 무료 한도 제한

### B. GitHub Pages 배포 (개발자용)

로컬에서 빌드 후 Pages에 배포합니다.

1. Node.js 설치: https://nodejs.org/ko/download
2. 로컬에 저장소 복제
   ```bash
   git clone <내 저장소 주소>
   cd wedding
   npm install
   npm run build
   ```
3. GitHub Pages 설정 후 `dist/`를 배포 대상으로 지정

장점
- 완전 무료, GitHub만 있으면 가능
단점
- 로컬 환경 설정 필요

## 카카오 지도/공유하기 설정 (선택)

지도나 공유하기를 사용하려면 Kakao Developers 설정이 필요합니다.

### 1) 카카오 앱 생성

1. https://developers.kakao.com/console/app 접속
2. 앱 생성 후 아래 항목 입력

| 항목 | 예시 |
| --- | --- |
| 앱 이름 | 몽룡 ❤️ 춘향 모바일 청첩장 |
| 회사명 | 개인 이름 또는 닉네임 |
| 카테고리 | 행사/이벤트 |
| 앱 대표 도메인 | 비워도 됨 |

스크린샷 캡션: `내 애플리케이션` 페이지에서 `앱 만들기` 버튼 위치  
관련 문서: [카카오톡 메시지 개요](https://developers.kakao.com/docs/latest/ko/kakaotalk-message)

### 2) 공유 템플릿 만들기 (공유하기 기능 사용할 때)

1. 생성한 앱 선택
2. `제품 설정` → `카카오톡 메시지`
3. 템플릿 빌더에서 템플릿 생성
4. 저장 후 템플릿 ID를 `setting.json`의 `share`에 입력

스크린샷 캡션: 메시지 템플릿 빌더에서 `템플릿 추가` 버튼 위치  
관련 문서: [사용자 정의 템플릿](https://developers.kakao.com/docs/latest/ko/message-template/custom)

### 3) 웹 도메인 등록

1. 앱 설정 → `제품 링크 관리`
2. 배포된 도메인 추가 (예: `https://myname.vercel.app`)

스크린샷 캡션: `제품 링크 관리`에서 `웹 도메인` 추가 화면  
관련 문서: [링크 설정 이해하기](https://developers.kakao.com/docs/latest/ko/message-template/common)

## 커스터마이즈 (개발자용)

- UI/스타일: `src/components/` 내부 컴포넌트 수정
- 대표 섹션 컴포넌트: `Banner.tsx`, `Title.tsx`, `Story.tsx`, `Location.tsx`, `Gallery.tsx`, `Calendar.tsx`, `Contact.tsx`, `Notice.css`/`Notice.tsx`, `BusNotice.tsx`, `Congratulations.tsx`, `Share.tsx`, `Countdown.tsx`
- 공통 스타일: `src/App.css`, `src/index.css`
- 이미지/폰트: `src/assets/` 교체
- 빌드/배포: `vite.config.ts` 및 `package.json` 참고

## FAQ

**Q. 코드를 몰라도 가능하나요?**  
A. 가능합니다. `setting.json`과 이미지 업로드만으로 충분합니다.

**Q. 지도/공유하기를 빼도 되나요?**  
A. 네. `map`, `share` 항목을 비우거나 `false`로 두면 됩니다.

**Q. 내 정보가 공개되나요?**  
A. GitHub/Vercel에 배포하면 웹에 공개됩니다. 민감한 정보는 주의하세요.

## 라이선스

개인 사용은 자유롭게 가능합니다.
단, 유료 판매 또는 유료 상품에 포함하는 경우 사전 협의가 필요하며 원칙적으로 금지합니다.

## 맘에 들면 커피 한 잔 사기

[![Sponsor](https://img.shields.io/badge/Sponsor-GitHub-%23EA4AAA?logo=github)](https://github.com/sponsors/Sotaneum)
