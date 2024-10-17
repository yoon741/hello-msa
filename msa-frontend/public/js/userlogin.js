let loginbtn = document.querySelector('#loginbtn');

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


    const res = fetch('http://127.0.0.1:8000/userlogin',
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
            console.log(data.access_token);
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
