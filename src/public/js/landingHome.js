

const payMethods =(price, title) => {

    window.location.href = `/checkout?price=${price}&title=${title}`;
};