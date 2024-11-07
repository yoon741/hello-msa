// 상품등록 버튼 이벤트 처리
const regbtn = document.querySelector('#regbtn');
const productfrm = document.productfrm;

regbtn.addEventListener('click', async () => {
    const formData = new FormData(productfrm);

    let jsondata = {};
    formData.forEach((val, key) => {
        jsondata[key] = val;
    });
    console.log(jsondata);

    const res = await fetch('http://${sessionStorage.getItem(\'prosuctsrvURL\')}:8050/product', // 서버가 다르기때문에 ip까지 작성
    {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(jsondata)
    })
    .then((resp)=> resp.json())
    .then((data) => {
        alert('상품등록 성공!!');
        console.log(data.pno, data.name, data.regdate);
    }).catch((error) => {
        alert('상품등록 실패!!');
        console.log(error);
    })
});
