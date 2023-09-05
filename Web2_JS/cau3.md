Giải pháp: thay thế if else bằng
1 switch case

```jsx
switch (decimal_number) {
  case 1: {
    roman_number = "I"
    break;
  }
  case 2: {
    roman_number = "II  "
    break;
  }
  ...
  default: {
    roman_number = "?"
    break;
  }
}
```

2 object

```jsx
function roman_unit(decimal_number) {
  const romanMatcher = {
    1: "I",
    2: "II",
		...
  }
  return romanMatcher[decimal_number] || "?"
}
```
