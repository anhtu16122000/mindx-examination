a. Viết hàm `getPokemon` để chương trình chạy đúng, lấy dữ liệu thông endoints bằng `fetch()`, sau đó trả về mảng gồm tên của từng Pokemon. Viết bằng 2 cách (async - await & promise).

```jsx
async function getPokemon(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    const data = await response.json();
    return data.name;
  } catch (error) {
    console.error(error);
    return null;
  }
}
function getPokemonPromise(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.name;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}
```

b. Đoạn code ở trên có thời gian thực thi ước tính trên trình duyệt Brave (nhân Chrome) là khoảng 3500ms (Có thể sai số bởi vì tốc độ mạng, server,...). Có cách nào giảm thời gian thực thi xuống không? Nếu có thì hãy trình bày giải pháp và giải thích.

Trình bày:

```jsx
async function getPokemonNames(pokemonID) {
  const start_time = new Date().valueOf();
  const pokemonPromises = [];
  for (let i = 0; i < pokemonID.length; i++) {
    pokemonPromises.push(getPokemon(`${domain}/${endpoint}/${pokemonID[i]}`));
  }
  try {
    const pokemonNames = await Promise.all(pokemonPromises);
    return pokemonNames;
  } catch (error) {
    console.log("Error has occured: " + error);
    return [];
  }
}
```

Giải thích:
Trong hàm getPokemonNames cũ

```jsx
for (let i = 0; i < pokemonID.length; i++) {
  pokemonName.push(await getPokemon(`${domain}/${endpoint}/${pokemonID[i]}`));
}
```

Đoạn code trên biến pokemonName được push vào các giá trị sau khi nhận được response từ hàm call API getPokemon một các tuần tự tức là việc get API pokemon 1 được hoàn tất sau đó mới tới get API pokemon 2 pokemon 2 hoàn tất thì tới get API pokemon 3 ….
Giải pháp là: từ call API tuần tự thành call API song song

```jsx
for (let i = 0; i < pokemonID.length; i++) {
  pokemonPromises.push(getPokemon(`${domain}/${endpoint}/${pokemonID[i]}`));
}
try {
  const pokemonNames = await Promise.all(pokemonPromises);
  return pokemonNames;
} catch (error) {
  console.log("Error has occured: " + error);
  return [];
}
```

Đoạn code được chỉnh sửa từ tuần tự sang call API song song giúp tất cả các request được gửi đi 1 lần

c. Cập nhật hàm ở `main` để có thể kết thúc hàm công việc đang chạy (lấy dữ liệu) nếu thời gian chạy quá chậm (> 2000ms) Hàm main có thể dùng được viết lại như sau.

```jsx
function main() {
  const pokemonId = [];
  for (let i = 0; i < 10; i++) {
    pokemonId.push(Math.floor(Math.random() * 600));
  }
  // create a timeout request promise
  const timeoutRequest = new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject(new Error("Cancel request: Operation took outweigh 2000ms"));
    }, 2000);
  });
  console.time("Operation");
  const fetchPokemonNames = getPokemonNames(pokemonId);
  Promise.race([fetchPokemonNames, timeoutRequest]).then((res) => {
    console.log("pokemon names", res);
  });
}
```
