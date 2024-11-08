// 상품등록 버튼 이벤트 처리
const regbtn = document.querySelector('#regbtn');
const productfrm = document.productfrm;

// 비동기 처리 구현 - async, await
regbtn.addEventListener('click', async () => {
    const formData = new FormData(productfrm);

    let jsondata = {};
    formData.forEach((val, key) => {
        jsondata[key] = val;
    });
    console.log(jsondata);

    const res = await fetch(`http://${sessionStorage.getItem('productsrvURL')}:8050/product`,
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsondata)
    })
    .then((resp) => resp.json()) // 서버로의 응답 처리
    .then((data) => {
        alert('상품 등록 성공!!');
        console.log(data.pno, data.name, data.regdate);
    }).catch((error) => {
        alert('상품 등록 실패!!');
        console.log(error);
    });

});


