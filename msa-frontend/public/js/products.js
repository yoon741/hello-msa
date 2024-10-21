// 페이지 로드시 자동 실행
window.addEventListener('load', async () => {
    try {
        const products = await getProductList();  // 서버로부터 데이터만 입력받아옴
        // const products = null;   // 테스트용 /테스트 성공 후 위에 주석친거 풀고 다시 이걸 주석 처리
        displayProductList(products);             // 서버로부터 받아온 데이터를 걸러서 출력
    } catch (e) {
        console.log(e);
        alert('상품 목록 fetch 실패!');
    }
});

// 상품 데이터 가져오기     await 사용시 async 넣어줘야 함
const getProductList = async () => {
    let url = 'http://127.0.0.1:8050/products'
    const res = await fetch(url);
    if (res.ok) {   // 조회가 성공적으로 되었으면  (res.ok = true > bull값이기 때문에 정해져있는 속성임)
        const data = await res.json();   // json으로 담기 (그 정보를 products에 담김)
        return data;
    } else {
        throw new Error('상품 목록 조회 실패!!');
    }
};


// 가져온 데이터 표시되게 하기
const displayProductList = (products) => {
    // products = [{'name':'테스트하기', 'price':99999, 'regdate':'2024-09-45'}];
                                                // 내부적 테스트 할 수 있는 테스트용 데이터
    const productlist = document.querySelector('#product-list');
    console.log(products);

    let html = '<ul>';
    for (const p of products) {   // product > p로 줄임
        html += `<li>
            상품번호 : ${p.pno},
            상품명 : <a href="/product/${p.pno}">${p.name}</a>,
            상품가격: ${p.price},
            상품등록일 : ${p.regdate},
             [<a href="javascript:pmodify('${p.pno}')">수정</a>],
             [<a href="javascript:premove('${p.pno}')">삭제</a>]
        </li>`
    }
    html += '</ul>';    // < 이부분이 클라이언트 사이드 랜더링 형식임

    productlist.innerHTML = html; // 바로 위에서 정의된 html을 productlist가 가르키는 자리에 출력되라
};

const pmodify = (pno) => {

    let url = `http://127.0.0.1:3000/product_put/${pno}`;
    location.href=url;
}

const premove = async (pno) => {
    if (!confirm('정말로 삭제하시겠습니까?')) return;

    let url = `http://127.0.0.1:8050/product/${pno}`;
    const res = await fetch(url, { method: 'delete' });  // http 메서드 delete 사용
    if (res.ok) {
        console.log(res);
        location.href = '/products';  // 클라이언트측 코드 사용시 location.href (서버측 코드 사용 시 수정할땐 리다이렉션 사용)
    }
};
