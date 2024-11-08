// 페이지 로드시 자동으로 실행
window.addEventListener('load', async () => {
    try {
        const products = await getProductList();
        displayProducList(products);
    } catch (e) {
        console.log(e);
        alert('상품 목록 조회 실패!');
    }
});

const getProductList = async () => {
    let url = `http://${sessionStorage.getItem('productsrvURL')}:8050/products`;
    const res = await fetch(url);
    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        throw new Error('상품 목록 fetch 실패!');
    }
};

const displayProducList = (products) => {
    // 테스트용 데이터
    // products = [{'name': '테스트', 'price': 99999,
    //            'regdate': '2024-10-16'}];

    const productlist = document.querySelector('#product-list');
    console.log(products);

    let html = '<ul>';
    for (const p of products) {
        html += `<li>
            상품이름 : <a href="/product/${p.pno}">${p.name}</a>,
            상품가격 : ${p.price},
            상품등록일 : ${p.regdate},
            [<a href="javascript:pmodify('${p.pno}')">수정</a>],
            [<a href="javascript:premove('${p.pno}')">삭제</a>]
        </li>`
    }
    html += '</ul>';

    productlist.innerHTML = html;
};

const pmodify = (pno) => {
    let url = `http://127.0.0.1:3000/product_put/${pno}`;
    location.href=url;
};

const premove = async (pno) => {
    if (!confirm('정말로 삭제하시겠습니까?')) return;

    let url = `http://${sessionStorage.getItem('productsrvURL')}:8050/product/${pno}`;
    const res = await fetch(url, { method: 'delete' });
    if (res.ok) {
        console.log(res);
        location.href='/products';
    }
};

