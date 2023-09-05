2. Kết quả của đoạn code là gì? Giải thích

```jsx
function f() {
  let b = 9;
  return ++b < 10 ? b : "Yah";
}
let a = f();
console.log(a);

// trong function f
// gán b = 9
// ++b => b = 10
// 10 < 10 = false
// function f return 'Yah'
// thoát khỏi function f
// gán a = f() => a = 'Yah'
// console.log(a) => console.log('Yah')
```
