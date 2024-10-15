// 상품등록 버튼 이벤트 처리
const prdbtn = document.querySelector('#prdbtn');
const productfrm = document.productfrm;

prdbtn.addEventListener('click', async () => {
    const formData = new FormData(productfrm);

    let jsondata = {};
    formData.forEach((val, key) => {
        jsondata[key] = val;
    });
    console.log(jsondata);

    const res = await fetch('http://127.0.0.1:8050/product', // 서버가 다르기때문에 ip까지 작성
    {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(jsondata)
    })
    .then(res=> {
        alert('상품등록 성공!!');
    }).catch((error) => {
        alert('상품등록 실패!!');
        console.log(data.datail);
    })
});
