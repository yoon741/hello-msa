// 페이지 완전하게 로드시 자동으로 실행
document.addEventListener('DOMContentLoaded', async () => {  // 좀더 세련되게 DOMContentLoaded로 사용
    let idx =location.href.lastIndexOf('/');
    let mno =location.href.substring(idx + 1);

    try {
        const user = await getUserOne(mno);
        displayUserOne(user);
    } catch (e) {
        console.log(e);
        alert('회원 상세 정보 조회 실패!');
    }
});

const getUserOne = async (mno) => {
    let url = `http://127.0.0.1:8000/user/${mno}`
    const res = await fetch(url);
    if (res.ok) {
        data = await res.json();
        return data;
    } else{
        throw new Error('회원 상세 조회 fetch 오류 발생!!');
    }
}

const displayUserOne = (user) => {
    const userone = document.querySelector('#userone');
    console.log(user); // 데이터 베이스로 넘어온 코드를 json형식으로 콘솔에 출력

    let html = '<ul>';
    html += `<li>
    회원번호 : ${user.mno},
    회원아이디 : ${user.userid},
    회원이름 : ${user.name},
    회원이메일 : ${user.email},
    회원가입일 : ${user.regdate}
    </li>`
    html += '</ul>';

    userone.innerHTML = html;
}