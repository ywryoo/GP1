# GP1
시작!

##Usage
- 먼저 `npm install`로 디펜던시를 설치합니다.
- `gulp`: 로컬에서 웹 서버를 실행합니다. 파일이 변경되면 자동으로 재시작합니다.
- `gulp start`: deploy를 위해 빌드된 파일을 dist에 생성합니다.
- `gulp lint`: 소스코드 Lint 결과를 보여줍니다.
- `gulp test`: unit test를 실행합니다.
- `fly server`: dist에 있는 파일을 서버에 deploy합니다.
- `pm2 deploy ecosystem.json dev` git에 있는 프로젝트를 서버에서 빌드하여 deploy합니다.