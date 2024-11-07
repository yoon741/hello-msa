let loginbtn = document.querySelector('#loginbtn');
let loginfrm = document.loginfrm;
let naver = document.querySelector('#naver');

// 로그인은 반드시 동기처리를 해야함 (보안상 중요한기능 동기처리)
// 비동기는 동시에 하는 것이기 때문에 로그인을 하고나서 해야하는 작업을 했을 경우
// 순차적으로 처리를 해야하므로 동기처리를 해야함
loginbtn.addEventListener('click', () => {
    const formData = new FormData(loginfrm);

    let jsondata = {};
    formData.forEach((val, key) => {
        jsondata[key] =val;
    });
    console.log(jsondata);


    const res = fetch(`http://${sessionStorage.getItem('usersrvURL')}/userlogin`,
    {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(jsondata)
    })
    // 서버로의 응답 처리
    .then(res => {
        if (res.status === 401) {
            alert('로그인 실패!!');
        } else if (res.status === 200) {
            return res.json();
        }  //return 에서 넘긴 것을 data로 받는다.
    }).then(data => {
        if(data) {
            // console.log(data.access_token);
            // localStorage.setItem('token', data.access_token);  // localStorage : 자바스크립트 내 특정 저장소에 저장됨
            sessionStorage.setItem('token', data.access_token);  // localStorage : 자바스크립트 내 특정 저장소에 저장됨
            alert('로그인 성공!!');
        } else {
            alert('로그인 토큰 확인 불가!');
        }
    }).catch((error) => {
        alert('로그인 오류 발생!!');
    });
});

// 네이버 로그인 버튼 표시
// 즉시 실행 함수 : 일반적인 함수 실행은 함수 정의 후 호출 시 이루어짐
// 하지만, 즉시 실행 함수는 함수 정의 후 바로 함수를 실행하게 함(호출없이)
// (함수명() { 함수몸체 })()   //이건 함수명 있게 실행하는 방법
// (() => { 함수몸체 })()     //이건 함수명 없이 화살표 함수로 실행하는 방법
(() => {
    // naver.innerHTML = "<p>Hello, World!!</p>";   // 확인용
    fetch('http://127.0.0.1:3000/api/naver2')
        // 서버로의 응답 처리
        .then(res => {
           if (res.status === 200) {
               return res.text();
           }
        }).then(data => {
            naver.innerHTML = data;
        })
})();
