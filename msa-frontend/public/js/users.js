// 페이지 로드시 자동 실행
window.addEventListener('load', async () => {
    try {
        const users = await getUserList();  // 서버로부터 데이터만 입력받아옴
        displayUserList(users);             // 서버로부터 받아온 데이터를 걸러서 출력
    } catch (e) {
        console.log(e);
        alert('회원 목록 조회 실패!');
    }
});

// 회원 데이터 가져오기     await 사용시 async 넣어줘야 함
const getUserList = async () => {
    let url = `http://${sessionStorage.getItem('usersrvURL')}/users`
    const res = await fetch(url);
    if (res.ok) {   // 조회가 성공적으로 되었으면
        const data = await res.json();   // json으로 담기 그 정보를 users에 담김 (반드시 json형태로 보내야함)
        return data;
    } else {
        throw new Error('회원 목록 조회 실패!!');
    }
};


// 가져온 데이터 표시되게 하기
const displayUserList = (users) => {
    const userlist = document.querySelector('#user-list');
    console.log(users); // 데이터 베이스로 넘어온 코드를 json형식으로 콘솔에 출력

    let html = '<ul>';
    for (const user of users) {
        html += `<li>
            회원 번호 : ${user.mno},
            회원 아이디 : <a href="/user/${user.mno}">${user.userid}</a>,
            회원 이름 : ${user.name},
            회원 가입일 : ${user.regdate}
        </li>`
    }
    html += '</ul>';

    userlist.innerHTML = html; // 바로 위에서 정의된 html을 userlist가 가르키는 자리에 출력
};
