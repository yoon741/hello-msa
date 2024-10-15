// 회원가입 버튼 이벤트 처리
const regbtn = document.querySelector('#regbtn');
const userfrm = document.userfrm;

// 비동기 처리 구현 - async(fetch 앞), await(함수 앞)
regbtn.addEventListener('click', async () => {
    const formData = new FormData(userfrm);

    let jsondata = {};
    formData.forEach((val, key) => {
        jsondata[key] = val;
    });
    console.log(jsondata);   // 버튼누르면 입력한 값이 json 형식으로 넘어오게

    const res = await fetch('http://127.0.0.1:8000/user',   // 마이크로 서비스 형식 (예전엔 모놀리틱 형식)
    {                                            // 사용할때마다 포트를 변경해 다중 서버로 사용
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(jsondata)
    })

    // 서버로의 응답 처리
    .then((resp)=> resp.json())
    .then((data) => {
        alert('회원가입 성공!!');
        console.log(data.mno, data.userid, data.regdate);
    }).catch((error) => {
        alert('회원가입 실패!!');
        console.log(error);
    });
});
