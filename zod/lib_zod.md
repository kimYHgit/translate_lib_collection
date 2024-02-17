# zod

스키마 선언 및 유효성 검사 라이브러리
- TypeScript의 한계점을 극복하기 위함.
  - 런타임 단계에서의 타입 에러 처리 지원

document : https://zod.dev/



### Table of contents
- [zod](#zod)
    - [Table of contents](#table-of-contents)
- [소개](#소개)
- [설치](#설치)
    - [요구사항](#요구사항)
    - [npm(노드/번)](#npm노드번)
    - [deno.land/x(deno)](#denolandxdeno)
  - [기본 사용법](#기본-사용법)
  - [원시 자료형](#원시-자료형)
  - [원시형 강제변환](#원시형-강제변환)
- [리터럴](#리터럴)
- [문자열](#문자열)
- [ISO datetimes](#iso-datetimes)
    - [IP 주소](#ip-주소)
- [숫자](#숫자)
- [BigInt](#bigint)
- [NaN](#nan)
- [Booleans](#booleans)
- [Dates](#dates)


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


# 소개
[Table of contents](#table-of-contents)

Zod는 TypeScript 스키마 선언 및 유효성 검사 라이브러리입니다.
단순한 문자열부터 복잡한 중첩 객체까지 모든 데이터 유형을 "스키마"라는 용어를 사용하여 광범위하게 지칭합니다.


Zod는 개발자 친화적으로 설계되었으며 중복된 타입 선언을 제거하는 것입니다. 
Zod를 사용하여 유효성 검사를 선언하면 자동으로 정적 TypeScript 유형을 추론합니다. 
복잡한 데이터 구조를 단순한 유형으로 쉽게 구성하게 합니다.

**특장점**

- 종속성 없음
- Node.js 및 모든 최신 브라우저에서 작동
- 매우 작음: 8kb minified + zipped
- 불변: 메소드(예: .optional())는 새 인스턴스를 반환합니다.
- 간결하고 연결 가능한 인터페이스
- 기능적 접근 방식: JavaScript로 유효성 검사하지 말고 구문 분석(parse)을 사용합시다. TypeScript를 사용할 필요가 없습니다.


# 설치

### 요구사항

- 타입스크립트 4.5 이상!
- tsconfig.json에서 strict 모드를 활성화해야 합니다.

// tsconfig.json
```ts
{
  // ...
  "compilerOptions": {
    // ...
    "strict": true
  }
}
```

### npm(노드/번)
```
npm install zod       # npm
yarn add zod          # yarn
bun add zod           # bun
pnpm add zod          # pnpm
```
Zod는 또한 커밋할 때마다 카나리아 버전(테스트버전)을 게시합니다. 카나리아를 설치하려면 다음 안내를 따르세요.

```
npm install zod@canary       # npm
yarn add zod@canary          # yarn
bun add zod@canary           # bun
pnpm add zod@canary          # pnpm
```

### deno.land/x(deno)

Node와 달리 Deno는 NPM과 같은 패키지 관리자 대신 직접 URL 가져오기를 사용합니다. 
Zod는 deno.land/x 에서 이용 가능합니다 . 최신 버전은 다음과 같이 가져올 수 있습니다.

```
import { z } from "https://deno.land/x/zod/mod.ts";
특정 버전을 지정할 수도 있습니다.

import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";
```


## 기본 사용법
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



# 리터럴
[Table of contents](#table-of-contents)

리터럴 스키마는 "hello world"또는 5 와 같은 리터럴 타입을 나타냅니다.
```ts
const tuna = z.literal("tuna");
const twelve = z.literal(12);
const twobig = z.literal(2n); // bigint literal
const tru = z.literal(true);

const terrificSymbol = Symbol("terrific");
const terrific = z.literal(terrificSymbol);

// retrieve literal value
tuna.value; // "tuna"
```

`현재 Zod에서는 날짜 리터럴이 지원되지 않습니다..`

- 참고 : https://typescript-kr.github.io/pages/literal-types.html


# 문자열
[Table of contents](#table-of-contents)

Zod에는 몇 가지 문자열 유효성 검사가 포함되어 있습니다.

```ts
// validations
z.string().max(5);
z.string().min(5);
z.string().length(5);
z.string().email();
z.string().url();
z.string().emoji();
z.string().uuid();
z.string().cuid();
z.string().cuid2();
z.string().ulid();
z.string().regex(regex);
z.string().includes(string);
z.string().startsWith(string);
z.string().endsWith(string);
z.string().datetime(); // ISO 8601; default is without UTC offset, see below for options
z.string().ip(); // defaults to IPv4 and IPv6, see below for options

// transformations
z.string().trim(); // trim whitespace
z.string().toLowerCase(); // toLowerCase
z.string().toUpperCase(); // toUpperCase
```
> Refinements 와 함께 사용할 수 있는 다른 유용한 문자열 유효성 검사 기능에 대해서는 validator.js를 확인하세요 .

문자열 스키마를 생성할 때 오류 메시지를 사용자 정의(커스터마이징)할 수 있습니다.

```ts
const name = z.string({
  required_error: "Name is required",
  invalid_type_error: "Name must be a string",
});
```

min()과 length() 같은 유효성 검사 메서드를 사용할 때 추가 인수를 전달하여 사용자 정의 오류 메시지를 제공할 수 있습니다.

```ts
z.string().min(5, { message: "Must be 5 or more characters long" });
z.string().max(5, { message: "Must be 5 or fewer characters long" });
z.string().length(5, { message: "Must be exactly 5 characters long" });
z.string().email({ message: "Invalid email address" });
z.string().url({ message: "Invalid url" });
z.string().emoji({ message: "Contains non-emoji characters" });
z.string().uuid({ message: "Invalid UUID" });
z.string().includes("tuna", { message: "Must include tuna" });
z.string().startsWith("https://", { message: "Must provide secure URL" });
z.string().endsWith(".com", { message: "Only .com domains allowed" });
z.string().datetime({ message: "Invalid datetime string! Must be UTC." });
z.string().ip({ message: "Invalid IP address" });
```

# ISO datetimes

`z.string().datetime()` 메서드는 ISO 8601을 강제합니다. 기본값은 시간대 오프셋이 없는 임의의 초 미만 소수점 이하 자릿수입니다.

```ts
const datetime = z.string().datetime();

datetime.parse("2020-01-01T00:00:00Z"); // pass
datetime.parse("2020-01-01T00:00:00.123Z"); // pass
datetime.parse("2020-01-01T00:00:00.123456Z"); // pass (arbitrary precision)
datetime.parse("2020-01-01T00:00:00+02:00"); // fail (no offsets allowed)
```

offset옵션을 true로 설정하면 **시간대 오프셋**을 허용할 수 있습니다.

```ts
const datetime = z.string().datetime({ offset: true });

datetime.parse("2020-01-01T00:00:00+02:00"); // pass
datetime.parse("2020-01-01T00:00:00.123+02:00"); // pass (millis optional)
datetime.parse("2020-01-01T00:00:00.123+0200"); // pass (millis optional)
datetime.parse("2020-01-01T00:00:00.123+02"); // pass (only offset hours)
datetime.parse("2020-01-01T00:00:00Z"); // pass (Z still supported)
```

**정밀도**를 추가로 제한할 수 있습니다 기본적으로 임의의 1초 미만 정밀도가 지원됩니다(선택 사항).

```ts
const datetime = z.string().datetime({ precision: 3 });

datetime.parse("2020-01-01T00:00:00.123Z"); // pass
datetime.parse("2020-01-01T00:00:00Z"); // fail
datetime.parse("2020-01-01T00:00:00.123456Z"); // fail
```

### IP 주소
z.string().ip()메서드는 기본적으로 IPv4 및 IPv6의 유효성을 검사합니다.

```ts
const ip = z.string().ip();

ip.parse("192.168.1.1"); // pass
ip.parse("84d5:51a0:9114:1855:4cfa:f2d7:1f12:7003"); // pass
ip.parse("84d5:51a0:9114:1855:4cfa:f2d7:1f12:192.168.1.1"); // pass

ip.parse("256.1.1.1"); // fail
ip.parse("84d5:51a0:9114:gggg:4cfa:f2d7:1f12:7003"); // fail
```

**IP version**을 설정할 수 있습니다.

```ts
const ipv4 = z.string().ip({ version: "v4" });
ipv4.parse("84d5:51a0:9114:1855:4cfa:f2d7:1f12:7003"); // fail

const ipv6 = z.string().ip({ version: "v6" });
ipv6.parse("192.168.1.1"); // fail
```

# 숫자
[Table of contents](#table-of-contents)

숫자 스키마를 생성할 때 특정 오류 메시지를 사용자 정의할 수 있습니다.

```ts
const age = z.number({
  required_error: "Age is required",
  invalid_type_error: "Age must be a number",
});
```

Zod에는 몇 가지 숫자 유효성 검사가 포함되어 있습니다.

```ts
z.number().gt(5);
z.number().gte(5); // alias .min(5)
z.number().lt(5);
z.number().lte(5); // alias .max(5)

z.number().int(); // value must be an integer

z.number().positive(); //     > 0
z.number().nonnegative(); //  >= 0
z.number().negative(); //     < 0
z.number().nonpositive(); //  <= 0

z.number().multipleOf(5); // Evenly divisible by 5. Alias .step(5)

z.number().finite(); // value must be finite, not Infinity or -Infinity
z.number().safe(); // value must be between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER
```

(Optional) 두 번째 인수를 전달하여 사용자 정의 오류 메시지를 제공할 수 있습니다.

```ts
z.number().lte(5, { message: "this👏is👏too👏big" });
```

# BigInt
[Table of contents](#table-of-contents)

Zod에는 bigint 유효성 검사가 포함되어 있습니다.

`대소 판별, 나머지 판별`

```ts
z.bigint().gt(5n);
z.bigint().gte(5n); // alias `.min(5n)`
z.bigint().lt(5n);
z.bigint().lte(5n); // alias `.max(5n)`

z.bigint().positive(); // > 0n
z.bigint().nonnegative(); // >= 0n
z.bigint().negative(); // < 0n
z.bigint().nonpositive(); // <= 0n

z.bigint().multipleOf(5n); // Evenly divisible by 5n.
```

# NaN
[Table of contents](#table-of-contents)

nan 스키마를 생성할 때 특정 오류 메시지를 사용자 정의할 수 있습니다.

```ts
const isNaN = z.nan({
  required_error: "isNaN is required",
  invalid_type_error: "isNaN must be 'not a number'",
});
```

# Booleans
[Table of contents](#table-of-contents)

Boolean 스키마를 생성할 때 특정 오류 메시지를 사용자 정의할 수 있습니다.

```ts
const isActive = z.boolean({
  required_error: "isActive is required",
  invalid_type_error: "isActive must be a boolean",
});
```

# Dates
[Table of contents](#table-of-contents)

Date 객체의 인스턴스 유효성을 검사하려면 z.date()를 사용하세요.

```ts
z.date().safeParse(new Date()); // success: true
z.date().safeParse("2022-01-12T00:00:00.000Z"); // success: false
```
- **notice : 입력값이 날짜 형태이더라도 `string` 타입이므로 에러 발생**

날짜 스키마를 생성할 때 특정 오류 메시지를 사용자 정의할 수 있습니다.

```ts
const myDateSchema = z.date({
  required_error: "Please select a date and time",
  invalid_type_error: "That's not a date!",
});
```

Zod는 몇 가지 날짜 유효성 검사를 제공합니다.

```ts
//z.date().methodType(기준 date 객체 , { message: "메시지 입력"})
z.date().min(new Date("1900-01-01"), { message: "Too old" }); //"1900-01-01" 보다 이전 날짜이면
z.date().max(new Date(), { message: "Too young!" }); //"현재" 보다 이후 날짜이면
```

**날짜 강제 변환(Coercion to Date)**

> 2024.02월 기준 zod 버전 : 3.22.4

zod 3.20부터 new Date(input)을 전달하려면 z.coerce.date()를 사용하여 입력을 전달합니다.

Since zod 3.20, use z.coerce.date() to pass the input through new Date(input).

```ts
const dateSchema = z.coerce.date(); //zod date 스키마 생성
type DateSchema = z.infer<typeof dateSchema>; //zod 객체에서 타입 추론
// type DateSchema = Date

/* valid dates */
console.log(dateSchema.safeParse("2023-01-10T00:00:00.000Z").success); // true
console.log(dateSchema.safeParse("2023-01-10").success); // true
console.log(dateSchema.safeParse("1/10/23").success); // true
console.log(dateSchema.safeParse(new Date("1/10/23")).success); // true

/* invalid dates */
console.log(dateSchema.safeParse("2023-13-10").success); // false , month 단위가 부적합.
console.log(dateSchema.safeParse("0000-00-00").success); // false , 올바른 날짜형식 아님.
```

이전 zod 버전의 경우 [이 스레드에 설명된](https://github.com/colinhacks/zod/discussions/879#discussioncomment-2036276) `z.preprocess` 대로 사용하세요 .





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



- 마크다운 문법 참고 - https://gist.github.com/ninanung/73addc0263b34da5f021d2f02a356b7f