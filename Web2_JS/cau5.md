Thứ tự chạy như sau

==SEQUENTIAL START==
starting slow promise
slow promise is done
slow
starting fast promise
fast promise is done
fast
==CONCURRENT START with await==
starting slow promise
starting fast promise
fast promise is done
slow promise is done
slow
fast
==CONCURRENT START with Promise.all==
starting slow promise
starting fast promise
fast promise is done
slow promise is done
slow
fast
==PARALLEL with await Promise.all==
starting slow promise
starting fast promise
fast promise is done
fast
slow promise is done
slow
Giải thích

```jsx
 console.log(fast)// in ra kq  'fast'
  /**
   * thứ tự sẽ là
   * ==SEQUENTIAL START==
    starting slow promise
    slow promise is done
    slow
    starting fast promise
    fast promise is done
    fast
   */
}

async function concurrentStart() {
  console.log('==CONCURRENT START with await=='); // chạy đầu tiên
  const slow = resolveAfter2Seconds() // resolveAfter2Seconds &  resolveAfter1Second chạy đồng bộ
  const fast = resolveAfter1Second()
  console.log(await slow)
  console.log(await fast)
  /*
  Thứ tự sẽ là
  ==CONCURRENT START with await==
    starting slow promise
    starting fast promise
    fast promise is done
    slow promise is done
    slow
    fast
  */
}

function concurrentPromise() {
  console.log('==CONCURRENT START with Promise.all==') // chạy đầu tiên
  // resolveAfter2Seconds và resolveAfter1Second chạy đồng bộ
  // Promise.all chờ cả 2 hàm xong thì mới trả về biến messages
  return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
    console.log(messages[0])
    console.log(messages[1])
  })
  /*
  Thứ tự sẽ là
  ==CONCURRENT START with Promise.all==
  starting slow promise
  starting fast promise
  fast promise is done
  slow promise is done
  slow
  fast
  */
}

async function parallel() {
  console.log('==PARALLEL with await Promise.all==') // chạy đầu tiên
  // 2 hàm sẽ chạy đồng bộ, hàm nào xong thì console ra kết quả luôn
  await Promise.all([
    (async () => console.log(await resolveAfter2Seconds()))(),
    (async () => console.log(await resolveAfter1Second()))()
  ])
  /*
  Thứ tự sẽ là
 ==PARALLEL with await Promise.all==
  starting slow promise
  starting fast promise
  fast promise is done
  fast
  slow promise is done
  slow
  */
}
```
