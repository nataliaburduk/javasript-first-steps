const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });

  return await res.json(); // здесь возвращается промис, мы должны дождаться, пока выполнится первая функция внутри await, а потом дождаться, когда вернутся промис с await
};

async function getResource(url) {
  let res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json(); // здесь возвращается промис, мы должны дождаться, пока выполнится первая функция внутри await, а потом дождаться, когда вернутся промис с await
}

export {postData};
export {getResource};