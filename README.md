# [wanted-pre-onboarding-challenge-fe 1월 사전과제](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api) Repo

![react-icon](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![typescript-icon](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typeScript&logoColor=black)
![react-router-dom-icon](https://img.shields.io/badge/React%20Router%20Dom-CA4245?style=for-the-badge&logo=reactrouter&logoColor=black)
![recoil-icon](https://img.shields.io/badge/recoil-61DAFB?style=for-the-badge&logo=recoil&logoColor=black)
![tailwindcss-icon](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=black)
![axios-icon](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=black)

## 프로젝트 구현 과제

### Assignment 1 - Login / SignUp

- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
  - 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다
  - [x] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
- 이메일과 비밀번호의 유효성을 확인합니다
  - [x] 이메일 조건 : 최소 `@`, `.` 포함
  - [x] 비밀번호 조건 : 8자 이상 입력
  - [x] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [x] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
  - [x] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
  - [x] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요

### Assignment 2 - Todo List

- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
  - [x] 목록 / 상세 영역으로 나누어 구현해주세요
  - [x] Todo 목록을 볼 수 있습니다.
  - [x] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [x] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
  - [x] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.
  - [x] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [x] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요. ~~->_TodoForm 컴포넌트를 라우터 구조로 변경예정_~~
- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요

  - [x] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다

## 프로젝트 시연

<details>

<summary>SignUp</summary>

<br/>

![회원가입-1](https://user-images.githubusercontent.com/40691745/211149605-0f2b0d75-ba40-4979-8fac-3450c1a34f20.gif)

</details>
<details>

<summary>Todo - Create </summary>

<br/>

![Todo_Create](https://user-images.githubusercontent.com/40691745/211149879-ebe00832-f9ac-4177-92d6-4c25a152c6c7.gif)

</details>
<details>

<summary>Todo - Read ( Reload + ReLogin + Authorization ) </summary>

<br/>

![Todo_Reload](https://user-images.githubusercontent.com/40691745/211149954-4ac050ad-bfa5-459e-b95a-930357b6bbe4.gif)

</details>
<details>

<summary>Todo - Update </summary>

<br/>

![Todo_Udate](https://user-images.githubusercontent.com/40691745/211149986-da4017c7-942e-4c24-9e27-792d9692ce6f.gif)

</details>
<details>

<summary>Todo - Delete </summary>

<br/>

![Todo_Delete](https://user-images.githubusercontent.com/40691745/211150019-302b6f89-768c-4cec-a11a-6be9a1638680.gif)

</details>

<details>

<summary>History - Back</summary>

<br/>

![Todo_History](https://user-images.githubusercontent.com/40691745/211150092-634101fe-0c37-46b8-a97d-41d4bd2da9f7.gif)

</details>
<details>

<summary>Unverified Token</summary>

<br/>

![Unverified_Token](https://user-images.githubusercontent.com/40691745/211151521-1108c721-d6b9-402a-be96-a04a80bbabcd.gif)

</details>

<details>

<summary>

## 폴더 구조

</summary>

```shell
.
├── public
└── src
    ├── App.tsx
    ├── apis
    │   └── apis.ts
    ├── components
    │   ├── Layout
    │   │   ├── Form
    │   │   ├── Header.tsx
    │   │   ├── SignForm
    │   │   │   └── index.tsx
    │   │   └── index.tsx
    │   ├── Todo
    │   │   ├── TodoCard.tsx
    │   │   └── TodoForm.tsx
    │   └── common
    │       ├── Button.tsx
    │       └── Input.tsx
    ├── hooks
    │   ├── useAuth.ts
    │   └── useTodo.ts
    ├── index.css
    ├── index.tsx
    ├── pages
    │   ├── Index.tsx
    │   ├── auth
    │   │   ├── SignIn.tsx
    │   │   └── SignUp.tsx
    │   ├── pages.ts
    │   └── todo
    │       └── Todo_Type.tsx
    ├── react-app-env.d.ts
    ├── reportWebVitals.ts
    ├── router
    │   └── Router.tsx
    ├── setupTests.ts
    └── utils
        └── validate.ts
```

</details>
