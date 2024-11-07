// 페이지 로드시 자동 실행
document.addEventListener('DOMContentLoaded', async () => {
    // console.log(location.pathname);
    // console.log(location.pathname.split('/').pop()); //위치값 필요없이 더 세련되게 하는 방법


    let idx = location.href.lastIndexOf('/');
    let pno = location.href.substring(idx + 1);

    try {
        const product = await getProductOne(pno);  // 서버로부터 데이터만 입력받아옴
        displayProductOne(product);             // 서버로부터 받아온 데이터를 걸러서 출력
    } catch (e) {
        console.log(e);
        // alert('상품 상세 정보 조회 실패!');
    }
});

// 상품 데이터 가져오기     await 사용시 async 넣어줘야 함
const getProductOne = async (pno) => {
    let url = `http://${sessionStorage.getItem('prosuctsrvURL')}:8050/product/${pno}`
    const res = await fetch(url);
    if (res.status === 404) {   // res.ok와 동일한 내용
        location.href = '/notfound';
    } else if (res.ok) {   // 조회가 성공적으로 되었으면  (res.ok = true > bull값이기 때문에 정해져있는 속성임)
        data = await res.json();   // json으로 담기 (그 정보를 products에 담김)
        return data;
    } else {
        throw new Error('상품 상세 조회 fetch 오류 발생!!');
    }
};


// 가져온 데이터 표시되게 하기
const displayProductOne = (product) => {
    const productone = document.querySelector('#productone');
    console.log(product);

    let html = '<ul>';
    html += `<li>
    상품번호 : ${product.pno},
    상품명 : ${product.name},
    상품가격: ${product.price},
    상품제조원: ${product.maker},
    상품등록일 : ${product.regdate}
    </li>`
    html += '</ul>';    // < 이부분이 클라이언트 사이드 랜더링 형식임

    productone.innerHTML = html; // 바로 위에서 정의된 html을 productlist가 가르키는 자리에 출력되라
};
