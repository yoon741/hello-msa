// 페이지 로드시 자동 실행
document.addEventListener('DOMContentLoaded', async () => {
    let pno = location.pathname.split('/').pop();

    try {
        const product = await getProductOne(pno);  // 서버로부터 데이터만 입력받아옴
        displayProductOneForm(product);             // 서버로부터 받아온 데이터를 걸러서 출력
    } catch (e) {
        console.log(e);
    }
});


const getProductOne = async (pno) => {
    let url = `http://127.0.0.1:8050/product/${pno}`
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


// 서버로 부터 받아온 상품정보를 수정 폼에 출력
const displayProductOneForm = (product) => {
    const frm = document.productfrm;

    frm.name.value = `${product.name}`;
    frm.desc.value = `${product.desc}`;
    frm.price.value = `${product.price}`;
    frm.maker.value = `${product.maker}`;
    frm.regdate.value = `${product.regdate}`;
    frm.pno.value = `${product.pno}`;
};

// 수정하기 버튼 클릭 처리
const modifybtn =document.querySelector('#modifybtn');

modifybtn.addEventListener('click', () => {
    const productfrm = document.productfrm;
    const formData = new FormData(productfrm);

    if (!confirm('정말로 수정하시겠습니까?')) return;

    let jsondata = {};
    formData.forEach((val, key) => {
        jsondata[key] = val;
    });
    console.log(jsondata);

    const res = fetch(`http://127.0.0.1:8050/product`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsondata)
    }).then((res) => {
        if (res.status === 404) {
            location.href='/notfound';
        } else if (res.status === 200) {
            location.href='/products';
        }
    })
    .catch((error) => { console.log(error) });
});