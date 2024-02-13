# zod
---
스키마 선언 및 유효성 검사 라이브러리
- TypeScript의 한계점을 극복하기 위함.
  - 런타임 단계에서의 타입 에러 처리 지원

document : https://zod.dev/


[보여지는 텍스트](#이동할위치의텍스트)
~생략~
~생략~
#이동할위치의텍스트

### Table of contents
- Introduction
- Ecosystem
  - Resources
  - API libraries
  - Form integrations
  - Zod to X
  - X to Zod
  - Mocking
  - Powered by Zod
  - Utilities for Zod
- Installation
  - Requirements
  - From npm (Node/Bun)
  - From deno.land/x (Deno)
- [Basic usage(기본 사용법)](#기본-사용법)
- [Primitives(원시 자료형)](#원시-자료형)
- [Coercion for primitives(원시형 강제변환)](#원시형-강제변환)
- 
Literals
Strings
ISO datetimes
IP addresses
Numbers
BigInts
NaNs
Booleans
Dates
Zod enums
Native enums
Optionals
Nullables
Objects
.shape
.keyof
.extend
.merge
.pick/.omit
.partial
.deepPartial
.required
.passthrough
.strict
.strip
.catchall
Arrays
.element
.nonempty
.min/.max/.length
Tuples
Unions
Discriminated unions
Records
Record key type
Maps
Sets
Intersections
Recursive types
ZodType with ZodEffects
JSON type
Cyclical objects
Promises
Instanceof
Functions
Preprocess
Custom schemas
Schema methods
.parse
.parseAsync
.safeParse
.safeParseAsync
.refine
Arguments
Customize error path
Asynchronous refinements
Relationship to transforms
.superRefine
Abort early
Type refinements
.transform
Chaining order
Validating during transform
Relationship to refinements
Async transforms
.default
.describe
.catch
.optional
.nullable
.nullish
.array
.promise
.or
.and
.brand
.readonly
.pipe
You can use .pipe() to fix common issues with z.coerce.
Guides and concepts
Type inference
Writing generic functions
Constraining allowable inputs
Error handling
Error formatting
Comparison
Joi
Yup
io-ts
Runtypes
Ow
Changelog


## 기본 사용법
---
[Table of contents](#table-of-contents)

**간단한 문자열 schema 생성**

```ts
import { z } from "zod";

// creating a schema for strings
const mySchema = z.string();

// parsing
mySchema.parse("tuna"); // => "tuna"
mySchema.parse(12); // => throws ZodError

// "safe" parsing (doesn't throw error if validation fails)
mySchema.safeParse("tuna"); // => { success: true; data: "tuna" }
mySchema.safeParse(12); // => { success: false; error: ZodError }
```
-> parse로 유효성 검사시 error 세부사항을 자세히 파악할수있음.
-> trycatch로 에러처리 해야함.
```   
{
    "code": "invalid_type",
    "expected": "string",
    "received": "number",
    "path": [],
    "message": "Expected string, received number"
}
```   

-> 유효성 유무만 판정하려면 safeParse 추천.

**객체 스키마 생성**

```ts
import { z } from "zod";

const User = z.object({
  username: z.string(),
});

User.parse({ username: "Ludwig" });

// extract the inferred type
type User = z.infer<typeof User>;
// { username: string }
```
## 원시 자료형
---
[Table of contents](#table-of-contents)

```ts
import { z } from "zod";

// primitive values
z.string();
z.number();
z.bigint();
z.boolean();
z.date();
z.symbol();

// empty types
z.undefined();
z.null();
z.void(); // accepts undefined

// catch-all types
// allows any value
z.any();
z.unknown();

// never type
// allows no values
z.never();
```
## 원시형 강제변환
---
[Table of contents](#table-of-contents)

이제 Zod는 기본 값을 강제하는 보다 편리한 방법을 제공합니다.

```ts
const schema = z.coerce.string();
schema.parse("tuna"); // => "tuna"
schema.parse(12); // => "12"
```

구문 분석 단계에서, 입력값은 데이터를 문자열로 강제 변환하기 위해 내장된 String() 함수를 통해 전달됩니다.

반환된 스키마는 일반 ZodString 인스턴스이므로 zod의 모든 문자열 메서드를 사용할 수 있습니다.


```ts
z.coerce.string().email().min(5);
```

**강제 변환(coercion) 작동방식**

모든 원시 자료형은 강제 변환을 지원합니다. Zod는 내장 생성자 `String(input), Number(input), new Date(input)등)` 를 사용하여 모든 입력을 강제합니다.

```ts
z.coerce.string(); // String(input)
z.coerce.number(); // Number(input)
z.coerce.boolean(); // Boolean(input)
z.coerce.bigint(); // BigInt(input)
z.coerce.date(); // new Date(input)
```

일부 동작은 예상한 것과 다를 수 있습니다.

```ts
schema.parse(true); // => "true"
schema.parse(undefined); // => "undefined"
schema.parse(null); // => "null"
```

강제 변환 로직을 더 효과적으로 제어하려면 `z.preprocess` 또는 `z.pipe()`사용을 고려하세요.


**Boolean 강제변환**

강제 변환에 대한 Zod의 접근 방식은 매우 간단합니다! 값을 Boolean(value)함수에 전달하는 것이 전부입니다. truthy 값은 true로 변환되고 falsy인 값은 false로 변환됩니다.

```ts
z.coerce.boolean().parse("tuna"); // => true
z.coerce.boolean().parse("true"); // => true
z.coerce.boolean().parse("false"); // => true
z.coerce.boolean().parse(1); // => true
z.coerce.boolean().parse([]); // => true

z.coerce.boolean().parse(0); // => false
z.coerce.boolean().parse(undefined); // => false
z.coerce.boolean().parse(null); // => false
```
[falsy 값 참고 - MDN](https://developer.mozilla.org/ko/docs/Glossary/Falsy)

```
false: 불리언 값 false 자체가 falsy입니다.
0: 숫자 0은 falsy입니다.
NaN: 숫자가 아닌 것(Not a Number)은 falsy입니다.
"": 빈 문자열은 falsy입니다.
null: null은 falsy입니다.
undefined: 변수가 초기화되지 않거나 값이 할당되지 않은 상태일 때의 기본 값입니다.
document.all: 이전에는 웹 브라우저의 모든 요소를 포함하는 컬렉션 객체였으나 현재는 사용되지 않으며 falsy입니다.
```


---
이동할위치의텍스트부분을 작성할 때 영어는 반드시 "소문자"만 가능하며 띄어쓰기는 - 로 구분해야한다.

[Stack](#stack-program)
~생략~
#Stack Program

[마크다운(MarkDown) 사용법 총정리] https://www.heropy.dev/p/B74sNE



**JS 문자열 메서드 참고**

1. `length`: 문자열의 길이를 반환합니다.

2. `charAt()`: 지정된 인덱스의 문자를 반환합니다.

3. `indexOf()`: 지정된 문자열이 처음으로 나타나는 인덱스를 반환하며, 없으면 -1을 반환합니다.

4. `substring()`: 시작 인덱스부터 끝 인덱스 직전까지의 부분 문자열을 반환합니다.

5. `slice()`: 시작 인덱스부터 끝 인덱스 직전까지의 부분 문자열을 반환합니다. 음수를 사용하여 끝에서부터 카운트할 수도 있습니다.

6. `replace()`: 지정된 패턴을 다른 문자열로 대체합니다.

7. `toUpperCase() / toLowerCase()`: 문자열을 대문자로 혹은 소문자로 변환합니다.

8. `concat()`: 문자열을 이어 붙입니다.
