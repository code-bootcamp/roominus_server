
# 🌙 room:in us

## 1. 서비스 소개

> 
> ### [💻 roominus 바로가기](https://roominus.site/)
> ###  <a  href="https://www.notion.so/dingco/5-09de646b20204534b0012b0838aaabf7"> ![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)</a>
>
>💡 방탈출 카페를 영화처럼 쉽게 예약하고 즐길 순 없을까? 예약의 과정을 최대한 간소화하고 방탈출 카페를 즐기는 것에 집중할 수 있도록 만들기 위해서 room:in us가 탄생했습니다.
>
> 방탈출 카페는 쉽게 말해서 방탈출 게임의 오프라인 버전입니다. 추리/스릴러 위주였던 기존 방탈출 게임에 비해 방탈출 카페에선 누구나 즐길 수 있는 다양한 테마들을 선보이고 있습니다. 
> 이용자 또한 마치 또 다른 세상 속에 들어가 ‘주인공이 된 나’로서 방탈출 카페를 즐기고 있습니다. 
> 하지만 주인공이 되는 방법은 쉽지 않습니다. 원하는 테마를 정하고, 그 테마가 있는 홈페이지에 들어가서, 테마 예약이 열리는 시간을 확인 후, 예약할 때마다 정보를 입력해야 합니다. 
> 방탈출 카페입장에서도 단순히 이름과 번호만을 받는 예약방식으로 노쇼(No-Show)에 취약합니다.
>
> 🌟 이용자들에겐 매장과 테마별로 쉽게 정보를 파악할 수 있고, 그 정보를 바탕으로 쉽게 예약할 수 있는 통합 예약 페이지를 제공합니다.
>
> ⛄️ 방탈출 카페 운영자들에겐 좀 더 확실한 예약 서비스를 제공합니다.

## 2. 팀원 소개

![팀원소개 001](https://user-images.githubusercontent.com/104378330/183790825-95a2426f-8ff9-47d1-9937-27c3cb64a3ac.jpeg)
![팀원소개 002](https://user-images.githubusercontent.com/104378330/183790844-9f620241-7921-4f78-aafa-c4fe0cb88a90.jpeg)

#### Backend 오세웅
- Works : `Git` `Cafe APIs` `Reservation APIs` `Theme APIs` `Payment API`
- Contact :
    - Email: osw991804@gmail.com
    - Github: [https://github.com/osw0124](https://github.com/osw0124)
    - Blog: [https://namu445.tistory.com/](https://namu445.tistory.com/)
    
#### Backend 정민준
- Works :  `General/Social Login APIs` `General/Social SignUp APIs` `Verification APIs` `Community APIs` 
- Contact :
    - Email: wcf941109@gmail.com
    - Github: [https://github.com/wcf941109](https://github.com/wcf941109)
    - Blog: [https://velog.io/@wcf941109](https://velog.io/@wcf941109)


## 3. 스택 소개

![기술스택](https://user-images.githubusercontent.com/104378330/183790974-80b2b24b-ed1a-47ca-bc5f-e32e702b1e8f.png)

#### **백엔드 주요 스택**

|   이름    |   버전  |
| :-------- | :------ |
| `NestJS`  | 8.0     |
| `MySQL`   | 2.3.3   |
| `GraphQL` | 10.0.13 |
| `Redis`   | 3.1.1   |
| `TypeORM` | 0.2.45  |
| `GCP`     |         |


## 4. 데이터 구상도 / API 문서 / ERD

#### **데이터 구상도**
![roominus](https://user-images.githubusercontent.com/48616771/181586325-b8531271-8bc7-4b34-8790-53713839207f.png)

#### **API 문서**
-   [API 문서](https://docs.google.com/spreadsheets/d/1QyY-q39eMwyrCITdwuoT3bvbpypDfJg215up55r1THM/edit#gid=267028980)

#### **ERD**
-   [ERD](https://www.erdcloud.com/d/upCrFp6bx5ro3b8LQ)
![roominus_ERD](https://user-images.githubusercontent.com/48616771/181717368-0d9636c9-d606-46ae-a4bd-1a286c50fa23.png)


## 5. 폴더 구조

``` 📦backend
 ┣ 📂dist
 ┃ ┣ 📂apis
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📜auth.controller.d.ts
 ┃ ┃ ┃ ┣ 📜auth.controller.js
 ┃ ┃ ┃ ┣ 📜auth.controller.js.map
 ┃ ┃ ┃ ┣ 📜auth.module.d.ts
 ┃ ┃ ┃ ┣ 📜auth.module.js
 ┃ ┃ ┃ ┣ 📜auth.module.js.map
 ┃ ┃ ┃ ┣ 📜auth.resolver.d.ts
 ┃ ┃ ┃ ┣ 📜auth.resolver.js
 ┃ ┃ ┃ ┣ 📜auth.resolver.js.map
 ┃ ┃ ┃ ┣ 📜auth.service.d.ts
 ┃ ┃ ┃ ┣ 📜auth.service.js
 ┃ ┃ ┃ ┗ 📜auth.service.js.map
 ┃ ┃ ┣ 📂board
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createBoard.input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜createBoard.input.js
 ┃ ┃ ┃ ┃ ┣ 📜createBoard.input.js.map
 ┃ ┃ ┃ ┃ ┣ 📜updateBoard.input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜updateBoard.input.js
 ┃ ┃ ┃ ┃ ┗ 📜updateBoard.input.js.map
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┣ 📜board.entity.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜board.entity.js
 ┃ ┃ ┃ ┃ ┣ 📜board.entity.js.map
 ┃ ┃ ┃ ┃ ┣ 📜boardLike.entity.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜boardLike.entity.js
 ┃ ┃ ┃ ┃ ┗ 📜boardLike.entity.js.map
 ┃ ┃ ┃ ┣ 📜board.module.d.ts
 ┃ ┃ ┃ ┣ 📜board.module.js
 ┃ ┃ ┃ ┣ 📜board.module.js.map
 ┃ ┃ ┃ ┣ 📜board.resolver.d.ts
 ┃ ┃ ┃ ┣ 📜board.resolver.js
 ┃ ┃ ┃ ┣ 📜board.resolver.js.map
 ┃ ┃ ┃ ┣ 📜board.service.d.ts
 ┃ ┃ ┃ ┣ 📜board.service.js
 ┃ ┃ ┃ ┗ 📜board.service.js.map
 ┃ ┃ ┣ 📂boardTag
 ┃ ┃ ┃ ┗ 📂entities
 ┃ ┃ ┃ ┃ ┣ 📜boardTag.entity.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜boardTag.entity.js
 ┃ ┃ ┃ ┃ ┗ 📜boardTag.entity.js.map
 ┃ ┃ ┣ 📂boardsecondreview
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createBoardsecondreview.input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜createBoardsecondreview.input.js
 ┃ ┃ ┃ ┃ ┣ 📜createBoardsecondreview.input.js.map
 ┃ ┃ ┃ ┃ ┣ 📜updateBoardsecondreview.input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜updateBoardsecondreview.input.js
 ┃ ┃ ┃ ┃ ┗ 📜updateBoardsecondreview.input.js.map
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┣ 📜boardsecondreview.entity.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜boardsecondreview.entity.js
 ┃ ┃ ┃ ┃ ┗ 📜boardsecondreview.entity.js.map
 ┃ ┃ ┃ ┣ 📜boardsecondreview.module.d.ts
 ┃ ┃ ┃ ┣ 📜boardsecondreview.module.js
 ┃ ┃ ┃ ┣ 📜boardsecondreview.module.js.map
 ┃ ┃ ┃ ┣ 📜boardsecondreview.resolver.d.ts
 ┃ ┃ ┃ ┣ 📜boardsecondreview.resolver.js
 ┃ ┃ ┃ ┣ 📜boardsecondreview.resolver.js.map
 ┃ ┃ ┃ ┣ 📜boardsecondreview.service.d.ts
 ┃ ┃ ┃ ┣ 📜boardsecondreview.service.js
 ┃ ┃ ┃ ┗ 📜boardsecondreview.service.js.map
 ┃ ┃ ┣ 📂boardsreview
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createBoardreview.input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜createBoardreview.input.js
 ┃ ┃ ┃ ┃ ┣ 📜createBoardreview.input.js.map
 ┃ ┃ ┃ ┃ ┣ 📜updateBoardreview.input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜updateBoardreview.input.js
 ┃ ┃ ┃ ┃ ┗ 📜updateBoardreview.input.js.map
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┣ 📜boardreview.entity.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜boardreview.entity.js
 ┃ ┃ ┃ ┃ ┗ 📜boardreview.entity.js.map
 ┃ ┃ ┃ ┣ 📜boardreview.module.d.ts
 ┃ ┃ ┃ ┣ 📜boardreview.module.js
 ┃ ┃ ┃ ┣ 📜boardreview.module.js.map
 ┃ ┃ ┃ ┣ 📜boardreview.resolver.d.ts
 ┃ ┃ ┃ ┣ 📜boardreview.resolver.js
 ┃ ┃ ┃ ┣ 📜boardreview.resolver.js.map
 ┃ ┃ ┃ ┣ 📜boardreview.service.d.ts
 ┃ ┃ ┃ ┣ 📜boardreview.service.js
 ┃ ┃ ┃ ┗ 📜boardreview.service.js.map
 ┃ ┃ ┣ 📂cafe
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createCafe.input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜createCafe.input.js
 ┃ ┃ ┃ ┃ ┣ 📜createCafe.input.js.map
 ┃ ┃ ┃ ┃ ┣ 📜updateCafe.input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜updateCafe.input.js
 ┃ ┃ ┃ ┃ ┗ 📜updateCafe.input.js.map
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┣ 📜cafe.entity.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜cafe.entity.js
 ┃ ┃ ┃ ┃ ┣ 📜cafe.entity.js.map
 ┃ ┃ ┃ ┃ ┣ 📜cafeImg.entity.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜cafeImg.entity.js
 ┃ ┃ ┃ ┃ ┗ 📜cafeImg.entity.js.map
 ┃ ┃ ┃ ┣ 📜cafe.module.d.ts
 ┃ ┃ ┃ ┣ 📜cafe.module.js
 ┃ ┃ ┃ ┣ 📜cafe.module.js.map
 ┃ ┃ ┃ ┣ 📜cafe.resolver.d.ts
 ┃ ┃ ┃ ┣ 📜cafe.resolver.js
 ┃ ┃ ┃ ┣ 📜cafe.resolver.js.map
 ┃ ┃ ┃ ┣ 📜cafe.service.d.ts
 ┃ ┃ ┃ ┣ 📜cafe.service.js
 ┃ ┃ ┃ ┗ 📜cafe.service.js.map
 ┃ ┃ ┣ 📂genre
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┣ 📜genre.entity.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜genre.entity.js
 ┃ ┃ ┃ ┃ ┗ 📜genre.entity.js.map
 ┃ ┃ ┃ ┣ 📜genre.module.d.ts
 ┃ ┃ ┃ ┣ 📜genre.module.js
 ┃ ┃ ┃ ┣ 📜genre.module.js.map
 ┃ ┃ ┃ ┣ 📜genre.resolver.d.ts
 ┃ ┃ ┃ ┣ 📜genre.resolver.js
 ┃ ┃ ┃ ┣ 📜genre.resolver.js.map
 ┃ ┃ ┃ ┣ 📜genre.service.d.ts
 ┃ ┃ ┃ ┣ 📜genre.service.js
 ┃ ┃ ┃ ┗ 📜genre.service.js.map
 ┃ ┃ ┣ 📂iamport
 ┃ ┃ ┃ ┣ 📜iamport.module.d.ts
 ┃ ┃ ┃ ┣ 📜iamport.module.js
 ┃ ┃ ┃ ┣ 📜iamport.module.js.map
 ┃ ┃ ┃ ┣ 📜iamport.service.d.ts
 ┃ ┃ ┃ ┣ 📜iamport.service.js
 ┃ ┃ ┃ ┗ 📜iamport.service.js.map
 ┃ ┃ ┣ 📂payment
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createPayment.input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜createPayment.input.js
 ┃ ┃ ┃ ┃ ┗ 📜createPayment.input.js.map
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┣ 📜payment.entity.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜payment.entity.js
 ┃ ┃ ┃ ┃ ┗ 📜payment.entity.js.map
 ┃ ┃ ┃ ┣ 📜payment.module.d.ts
 ┃ ┃ ┃ ┣ 📜payment.module.js
 ┃ ┃ ┃ ┣ 📜payment.module.js.map
 ┃ ┃ ┃ ┣ 📜payment.resolver.d.ts
 ┃ ┃ ┃ ┣ 📜payment.resolver.js
 ┃ ┃ ┃ ┣ 📜payment.resolver.js.map
 ┃ ┃ ┃ ┣ 📜payment.service.d.ts
 ┃ ┃ ┃ ┣ 📜payment.service.js
 ┃ ┃ ┃ ┗ 📜payment.service.js.map
 ┃ ┃ ┣ 📂phone
 ┃ ┃ ┃ ┣ 📜phone.module.d.ts
 ┃ ┃ ┃ ┣ 📜phone.module.js
 ┃ ┃ ┃ ┣ 📜phone.module.js.map
 ┃ ┃ ┃ ┣ 📜phone.resolver.d.ts
 ┃ ┃ ┃ ┣ 📜phone.resolver.js
 ┃ ┃ ┃ ┣ 📜phone.resolver.js.map
 ┃ ┃ ┃ ┣ 📜phone.service.d.ts
 ┃ ┃ ┃ ┣ 📜phone.service.js
 ┃ ┃ ┃ ┗ 📜phone.service.js.map
 ┃ ┃ ┣ 📂reservations
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createReservation.input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜createReservation.input.js
 ┃ ┃ ┃ ┃ ┗ 📜createReservation.input.js.map
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┣ 📜reservation.entity.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜reservation.entity.js
 ┃ ┃ ┃ ┃ ┗ 📜reservation.entity.js.map
 ┃ ┃ ┃ ┣ 📜reservation.module.d.ts
 ┃ ┃ ┃ ┣ 📜reservation.module.js
 ┃ ┃ ┃ ┣ 📜reservation.module.js.map
 ┃ ┃ ┃ ┣ 📜reservation.resolver.d.ts
 ┃ ┃ ┃ ┣ 📜reservation.resolver.js
 ┃ ┃ ┃ ┣ 📜reservation.resolver.js.map
 ┃ ┃ ┃ ┣ 📜reservation.service.d.ts
 ┃ ┃ ┃ ┣ 📜reservation.service.js
 ┃ ┃ ┃ ┗ 📜reservation.service.js.map
 ┃ ┃ ┣ 📂socialUser
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createsocialUser.input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜createsocialUser.input.js
 ┃ ┃ ┃ ┃ ┣ 📜createsocialUser.input.js.map
 ┃ ┃ ┃ ┃ ┣ 📜upadtesocialUser.input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜upadtesocialUser.input.js
 ┃ ┃ ┃ ┃ ┗ 📜upadtesocialUser.input.js.map
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┣ 📜socialUser.entity.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜socialUser.entity.js
 ┃ ┃ ┃ ┃ ┗ 📜socialUser.entity.js.map
 ┃ ┃ ┃ ┣ 📜socialUser.module.d.ts
 ┃ ┃ ┃ ┣ 📜socialUser.module.js
 ┃ ┃ ┃ ┣ 📜socialUser.module.js.map
 ┃ ┃ ┃ ┣ 📜socialUser.resolver.d.ts
 ┃ ┃ ┃ ┣ 📜socialUser.resolver.js
 ┃ ┃ ┃ ┣ 📜socialUser.resolver.js.map
 ┃ ┃ ┃ ┣ 📜socialUser.service.d.ts
 ┃ ┃ ┃ ┣ 📜socialUser.service.js
 ┃ ┃ ┃ ┗ 📜socialUser.service.js.map
 ┃ ┃ ┣ 📂theme
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createTheme.input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜createTheme.input.js
 ┃ ┃ ┃ ┃ ┣ 📜createTheme.input.js.map
 ┃ ┃ ┃ ┃ ┣ 📜updateTheme.input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜updateTheme.input.js
 ┃ ┃ ┃ ┃ ┗ 📜updateTheme.input.js.map
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┣ 📜theme.entity.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜theme.entity.js
 ┃ ┃ ┃ ┃ ┣ 📜theme.entity.js.map
 ┃ ┃ ┃ ┃ ┣ 📜themeImg.entity.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜themeImg.entity.js
 ┃ ┃ ┃ ┃ ┗ 📜themeImg.entity.js.map
 ┃ ┃ ┃ ┣ 📜theme.module.d.ts
 ┃ ┃ ┃ ┣ 📜theme.module.js
 ┃ ┃ ┃ ┣ 📜theme.module.js.map
 ┃ ┃ ┃ ┣ 📜theme.resolver.d.ts
 ┃ ┃ ┃ ┣ 📜theme.resolver.js
 ┃ ┃ ┃ ┣ 📜theme.resolver.js.map
 ┃ ┃ ┃ ┣ 📜theme.service.d.ts
 ┃ ┃ ┃ ┣ 📜theme.service.js
 ┃ ┃ ┃ ┗ 📜theme.service.js.map
 ┃ ┃ ┣ 📂themeMenu
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createThemeMenu.Input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜createThemeMenu.Input.js
 ┃ ┃ ┃ ┃ ┗ 📜createThemeMenu.Input.js.map
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┣ 📜themeMenu.entity.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜themeMenu.entity.js
 ┃ ┃ ┃ ┃ ┗ 📜themeMenu.entity.js.map
 ┃ ┃ ┃ ┣ 📜themeMenu.module.d.ts
 ┃ ┃ ┃ ┣ 📜themeMenu.module.js
 ┃ ┃ ┃ ┣ 📜themeMenu.module.js.map
 ┃ ┃ ┃ ┣ 📜themeMenu.resolver.d.ts
 ┃ ┃ ┃ ┣ 📜themeMenu.resolver.js
 ┃ ┃ ┃ ┣ 📜themeMenu.resolver.js.map
 ┃ ┃ ┃ ┣ 📜themeMenu.service.d.ts
 ┃ ┃ ┃ ┣ 📜themeMenu.service.js
 ┃ ┃ ┃ ┗ 📜themeMenu.service.js.map
 ┃ ┃ ┣ 📂themeReview
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createThemeReview.input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜createThemeReview.input.js
 ┃ ┃ ┃ ┃ ┣ 📜createThemeReview.input.js.map
 ┃ ┃ ┃ ┃ ┣ 📜updateThemeReview.input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜updateThemeReview.input.js
 ┃ ┃ ┃ ┃ ┗ 📜updateThemeReview.input.js.map
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┣ 📜themeReview.entity.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜themeReview.entity.js
 ┃ ┃ ┃ ┃ ┗ 📜themeReview.entity.js.map
 ┃ ┃ ┃ ┣ 📜themeReview.module.d.ts
 ┃ ┃ ┃ ┣ 📜themeReview.module.js
 ┃ ┃ ┃ ┣ 📜themeReview.module.js.map
 ┃ ┃ ┃ ┣ 📜themeReview.resolver.d.ts
 ┃ ┃ ┃ ┣ 📜themeReview.resolver.js
 ┃ ┃ ┃ ┣ 📜themeReview.resolver.js.map
 ┃ ┃ ┃ ┣ 📜themewReview.service.d.ts
 ┃ ┃ ┃ ┣ 📜themewReview.service.js
 ┃ ┃ ┃ ┗ 📜themewReview.service.js.map
 ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createUser.input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜createUser.input.js
 ┃ ┃ ┃ ┃ ┣ 📜createUser.input.js.map
 ┃ ┃ ┃ ┃ ┣ 📜updateUser.input.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜updateUser.input.js
 ┃ ┃ ┃ ┃ ┗ 📜updateUser.input.js.map
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┣ 📜like.entity.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜like.entity.js
 ┃ ┃ ┃ ┃ ┣ 📜like.entity.js.map
 ┃ ┃ ┃ ┃ ┣ 📜user.entity.d.ts
 ┃ ┃ ┃ ┃ ┣ 📜user.entity.js
 ┃ ┃ ┃ ┃ ┗ 📜user.entity.js.map
 ┃ ┃ ┃ ┣ 📜user.module.d.ts
 ┃ ┃ ┃ ┣ 📜user.module.js
 ┃ ┃ ┃ ┣ 📜user.module.js.map
 ┃ ┃ ┃ ┣ 📜user.resolver.d.ts
 ┃ ┃ ┃ ┣ 📜user.resolver.js
 ┃ ┃ ┃ ┣ 📜user.resolver.js.map
 ┃ ┃ ┃ ┣ 📜user.service.d.ts
 ┃ ┃ ┃ ┣ 📜user.service.js
 ┃ ┃ ┃ ┗ 📜user.service.js.map
 ┃ ┣ 📂commons
 ┃ ┃ ┗ 📂auth
 ┃ ┃ ┃ ┣ 📜gql-auth.guard.d.ts
 ┃ ┃ ┃ ┣ 📜gql-auth.guard.js
 ┃ ┃ ┃ ┣ 📜gql-auth.guard.js.map
 ┃ ┃ ┃ ┣ 📜gql-user.param.d.ts
 ┃ ┃ ┃ ┣ 📜gql-user.param.js
 ┃ ┃ ┃ ┣ 📜gql-user.param.js.map
 ┃ ┃ ┃ ┣ 📜jwt-access.strategy.d.ts
 ┃ ┃ ┃ ┣ 📜jwt-access.strategy.js
 ┃ ┃ ┃ ┣ 📜jwt-access.strategy.js.map
 ┃ ┃ ┃ ┣ 📜jwt-refresh.strategy.d.ts
 ┃ ┃ ┃ ┣ 📜jwt-refresh.strategy.js
 ┃ ┃ ┃ ┗ 📜jwt-refresh.strategy.js.map
 ┃ ┣ 📜app.controller.d.ts
 ┃ ┣ 📜app.controller.js
 ┃ ┣ 📜app.controller.js.map
 ┃ ┣ 📜app.module.d.ts
 ┃ ┣ 📜app.module.js
 ┃ ┣ 📜app.module.js.map
 ┃ ┣ 📜app.resolver.d.ts
 ┃ ┣ 📜app.resolver.js
 ┃ ┣ 📜app.resolver.js.map
 ┃ ┣ 📜main.d.ts
 ┃ ┣ 📜main.js
 ┃ ┣ 📜main.js.map
 ┃ ┗ 📜tsconfig.build.tsbuildinfo
 ┣ 📂elk
 ┃ ┗ 📂logstash
 ┃ ┃ ┣ 📜logstash.conf
 ┃ ┃ ┗ 📜mysql-connector-java-8.0.28.jar
 ┣ 📂src
 ┃ ┣ 📂apis
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📜auth.controller.ts
 ┃ ┃ ┃ ┣ 📜auth.module.ts
 ┃ ┃ ┃ ┣ 📜auth.resolver.ts
 ┃ ┃ ┃ ┗ 📜auth.service.ts
 ┃ ┃ ┣ 📂board
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createBoard.input.ts
 ┃ ┃ ┃ ┃ ┗ 📜updateBoard.input.ts
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┣ 📜board.entity.ts
 ┃ ┃ ┃ ┃ ┗ 📜boardLike.entity.ts
 ┃ ┃ ┃ ┣ 📜board.module.ts
 ┃ ┃ ┃ ┣ 📜board.resolver.ts
 ┃ ┃ ┃ ┗ 📜board.service.ts
 ┃ ┃ ┣ 📂boardTag
 ┃ ┃ ┃ ┗ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜boardTag.entity.ts
 ┃ ┃ ┣ 📂boardsecondreview
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createBoardsecondreview.input.ts
 ┃ ┃ ┃ ┃ ┗ 📜updateBoardsecondreview.input.ts
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜boardsecondreview.entity.ts
 ┃ ┃ ┃ ┣ 📜boardsecondreview.module.ts
 ┃ ┃ ┃ ┣ 📜boardsecondreview.resolver.ts
 ┃ ┃ ┃ ┗ 📜boardsecondreview.service.ts
 ┃ ┃ ┣ 📂boardsreview
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createBoardreview.input.ts
 ┃ ┃ ┃ ┃ ┗ 📜updateBoardreview.input.ts
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜boardreview.entity.ts
 ┃ ┃ ┃ ┣ 📜boardreview.module.ts
 ┃ ┃ ┃ ┣ 📜boardreview.resolver.ts
 ┃ ┃ ┃ ┗ 📜boardreview.service.ts
 ┃ ┃ ┣ 📂cafe
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createCafe.input.ts
 ┃ ┃ ┃ ┃ ┗ 📜updateCafe.input.ts
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┣ 📜cafe.entity.ts
 ┃ ┃ ┃ ┃ ┗ 📜cafeImg.entity.ts
 ┃ ┃ ┃ ┣ 📜cafe.module.ts
 ┃ ┃ ┃ ┣ 📜cafe.resolver.ts
 ┃ ┃ ┃ ┗ 📜cafe.service.ts
 ┃ ┃ ┣ 📂genre
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜genre.entity.ts
 ┃ ┃ ┃ ┣ 📜genre.module.ts
 ┃ ┃ ┃ ┣ 📜genre.resolver.ts
 ┃ ┃ ┃ ┗ 📜genre.service.ts
 ┃ ┃ ┣ 📂iamport
 ┃ ┃ ┃ ┣ 📜iamport.module.ts
 ┃ ┃ ┃ ┗ 📜iamport.service.ts
 ┃ ┃ ┣ 📂payment
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┗ 📜createPayment.input.ts
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜payment.entity.ts
 ┃ ┃ ┃ ┣ 📜payment.module.ts
 ┃ ┃ ┃ ┣ 📜payment.resolver.ts
 ┃ ┃ ┃ ┗ 📜payment.service.ts
 ┃ ┃ ┣ 📂phone
 ┃ ┃ ┃ ┣ 📜phone.module.ts
 ┃ ┃ ┃ ┣ 📜phone.resolver.ts
 ┃ ┃ ┃ ┗ 📜phone.service.ts
 ┃ ┃ ┣ 📂reservations
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┗ 📜createReservation.input.ts
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜reservation.entity.ts
 ┃ ┃ ┃ ┣ 📜reservation.module.ts
 ┃ ┃ ┃ ┣ 📜reservation.resolver.ts
 ┃ ┃ ┃ ┗ 📜reservation.service.ts
 ┃ ┃ ┣ 📂theme
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createTheme.input.ts
 ┃ ┃ ┃ ┃ ┗ 📜updateTheme.input.ts
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┣ 📜theme.entity.ts
 ┃ ┃ ┃ ┃ ┗ 📜themeImg.entity.ts
 ┃ ┃ ┃ ┣ 📜theme.module.ts
 ┃ ┃ ┃ ┣ 📜theme.resolver.ts
 ┃ ┃ ┃ ┗ 📜theme.service.ts
 ┃ ┃ ┣ 📂themeMenu
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┗ 📜createThemeMenu.Input.ts
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜themeMenu.entity.ts
 ┃ ┃ ┃ ┣ 📜themeMenu.module.ts
 ┃ ┃ ┃ ┣ 📜themeMenu.resolver.ts
 ┃ ┃ ┃ ┗ 📜themeMenu.service.ts
 ┃ ┃ ┣ 📂themeReview
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createThemeReview.input.ts
 ┃ ┃ ┃ ┃ ┗ 📜updateThemeReview.input.ts
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜themeReview.entity.ts
 ┃ ┃ ┃ ┣ 📜themeReview.module.ts
 ┃ ┃ ┃ ┣ 📜themeReview.resolver.ts
 ┃ ┃ ┃ ┗ 📜themewReview.service.ts
 ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜createUser.input.ts
 ┃ ┃ ┃ ┃ ┗ 📜updateUser.input.ts
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┣ 📜like.entity.ts
 ┃ ┃ ┃ ┃ ┗ 📜user.entity.ts
 ┃ ┃ ┃ ┣ 📜user.module.ts
 ┃ ┃ ┃ ┣ 📜user.resolver.ts
 ┃ ┃ ┃ ┗ 📜user.service.ts
 ┃ ┃ ┗ 📜.DS_Store
 ┃ ┣ 📂commons
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📜gql-auth.guard.ts
 ┃ ┃ ┃ ┣ 📜gql-user.param.ts
 ┃ ┃ ┃ ┣ 📜jwt-access.strategy.ts
 ┃ ┃ ┃ ┗ 📜jwt-refresh.strategy.ts
 ┃ ┃ ┗ 📂graphql
 ┃ ┃ ┃ ┗ 📜schema.gql
 ┃ ┣ 📜.DS_Store
 ┃ ┣ 📜app.controller.ts
 ┃ ┣ 📜app.module.ts
 ┃ ┣ 📜app.resolver.ts
 ┃ ┗ 📜main.ts
 ┣ 📂test
 ┃ ┣ 📜app.e2e-spec.ts
 ┃ ┗ 📜jest-e2e.json
 ┣ 📜.DS_Store
 ┣ 📜.dockerignore
 ┣ 📜.env
 ┣ 📜.eslintrc.js
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜Dockerfile
 ┣ 📜Dockerfile.logstash
 ┣ 📜README.md
 ┣ 📜docker-compose.yaml
 ┣ 📜nest-cli.json
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜tsconfig.build.json
 ┣ 📜tsconfig.json
 ┣ 📜yarn-error.log
 ┗ 📜yarn.lock
 ```
 
##  6. .env

MYSQL_HOST
MYSQL_USER
MYSQL_PASS
MYSQL_DATABASE

ACCESS_TOKEN_KEY
REFRESH_TOKEN_KEY

COOLSMS_CLIENT_API_ID
COOLSMS_CLIENT_API_SECRET
COOLSMS_CLIENT_SENDER

IMP_KEY
IMP_API_KEY
IMP_API_SECRET
```
