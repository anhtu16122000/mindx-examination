có 3 cách viết vòng lặp for:

- Vòng lặp for truyền thống
- Vòng lặp for...in
- Vòng lặp for...of

Vòng lặp for truyền thống: phù hợp khi cần lặp với số vòng nhất định

```jsx
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

Vòng lặp for...in: sử dụng để duyệt qua các thuộc tính của một object

```jsx
// Vòng lặp lặp qua các thuộc tính của đối tượng person
const person = {
  name: "anh",
  age: 20,
  address: "123 Street"
};

for (const key in person) {
  console.log(key);
}
```

Vòng lặp for...of: để duyệt qua các phần tử của một iterable (Array, Set, Map)

```jsx
const array = [1, 2, 3, 4, 5];

for (const number of array) {
  console.log(number);
}
```
