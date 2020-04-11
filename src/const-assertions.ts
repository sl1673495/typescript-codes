// STEP1
function fetchJSON(url: string, method: "GET" | "POST") {
  return fetch(url, { method }).then(response => response.json());
}

// OK
fetchJSON("https://example.com/", "POST").then(data => {
  // ...
});

// STEP2
const HTTPRequestMethod = {
  CONNECT: "CONNECT",
  DELETE: "DELETE",
  GET: "GET",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
  PATCH: "PATCH",
  POST: "POST",
  PUT: "PUT",
  TRACE: "TRACE"
};

// Oops! HTTPRequestMethod.GET被推断成了string类型
// 所以不能赋值给'GET'类型
fetchJSON("https://example.com/", HTTPRequestMethod.GET).then(data => {
  // ...
});

// SOLUTION
const HTTPRequestMethod2 = {
  CONNECT: "CONNECT",
  DELETE: "DELETE",
  GET: "GET",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
  PATCH: "PATCH",
  POST: "POST",
  PUT: "PUT",
  TRACE: "TRACE"
  // as const的用法 注意内部的属性全部变成了readonly的
} as const;
fetchJSON("https://example.com/", HTTPRequestMethod2.GET).then(data => {
  // ...
});
