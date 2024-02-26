# zod

스키마 선언 및 유효성 검사 라이브러리
- TypeScript의 한계점을 극복하기 위함.
  - 런타임 단계에서의 타입 에러 처리 지원

document : https://zod.dev/



# Table of contents
- [zod](#zod)
- [Table of contents](#table-of-contents)
- [소개](#소개)
- [설치](#설치)
    - [요구사항](#요구사항)
    - [npm(노드/번)](#npm노드번)
    - [deno.land/x(deno)](#denolandxdeno)
- [기본 사용법](#기본-사용법)
- [Primitives(원시 자료형)](#primitives원시-자료형)
- [Coercion for primitives(원시형 강제변환)](#coercion-for-primitives원시형-강제변환)
- [Literals(리터럴)](#literals리터럴)
- [Strings(문자열)](#strings문자열)
    - [ISO datetimes](#iso-datetimes)
    - [IP 주소](#ip-주소)
- [Numbers(숫자)](#numbers숫자)
- [BigInt](#bigint)
- [NaN](#nan)
- [Booleans(불리언)](#booleans불리언)
- [Dates(날짜형)](#dates날짜형)
- [Zod enums(zod 열거형)](#zod-enumszod-열거형)
- [Native enums(네이티브 열거형)](#native-enums네이티브-열거형)
- [Optionals(옵셔널)](#optionals옵셔널)
- [Nullables(null가능)](#nullablesnull가능)
- [Objects(객체)](#objects객체)
  - [.shape](#shape)
  - [.keyof](#keyof)
  - [.extend](#extend)
  - [.merge](#merge)
  - [.pick/.omit](#pickomit)
  - [.partial](#partial)
  - [.deepPartial](#deeppartial)
  - [.required](#required)
  - [.passthrough](#passthrough)
  - [.strict](#strict)
  - [.strip](#strip)
  - [.catchall](#catchall)
- Arrays
  - .element
  - .nonempty
  - .min/.max/.length
- Tuples
- Unions
- Discriminated unions(판별 유니언)
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

**Zod**는 TypeScript 스키마 선언 및 유효성 검사 라이브러리입니다.
단순한 문자열부터 복잡한 중첩 객체까지 모든 데이터 유형을 "**스키마**"라는 용어를 사용하여 광범위하게 지칭합니다.


Zod는 개발자 친화적으로 설계되었으며 중복된 타입 선언을 제거하는 것입니다.  
Zod를 사용하여 유효성 검사를 선언하면 자동으로 정적 TypeScript 유형을 추론합니다. 
복잡한 데이터 구조를 단순한 유형으로 쉽게 구성하게 합니다.

**특장점**

- 종속성 없음
- Node.js 및 모든 최신 브라우저에서 작동
- 매우 작음: 8kb minified + zipped
- 불변: 메소드는 새 인스턴스를 반환합니다. (예: `.optional()`)
- 간결하고 연결 가능한 인터페이스
- 함수형 접근 방식: 검증(validation)하지 말고 구문 분석(parse)합시다. [해당 글 참고](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/)  
- JavaScript만으로도 동작합니다. TypeScript를 사용할 필요가 없습니다. 
  

# 설치
[Table of contents](#table-of-contents)

### 요구사항

- 타입스크립트 4.5 이상!
- tsconfig.json에서 strict 모드를 활성화해야 합니다.

```ts
// tsconfig.json
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

Node와 달리 Deno는 NPM과 같은 패키지 관리자 대신 URL 가져오기를 사용합니다.  
Zod는 deno.land/x 에서 이용 가능합니다. 최신 버전은 다음과 같이 가져올 수 있습니다.

```ts
import { z } from "https://deno.land/x/zod/mod.ts";
특정 버전을 지정할 수도 있습니다.

import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";
```


# 기본 사용법
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
- **parse로 유효성 검사시 error 세부사항을 자세히 파악할수있음.**
- **trycatch로 에러처리 해야함.**

```   
{
    "code": "invalid_type",
    "expected": "string",
    "received": "number",
    "path": [],
    "message": "Expected string, received number"
}
```   

- **유효성 유무만 판정하려면 safeParse 추천.**

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

# Primitives(원시 자료형)
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
# Coercion for primitives(원시형 강제변환)
[Table of contents](#table-of-contents)

이제 Zod는 기본 값을 강제하는 보다 편리한 방법을 제공합니다.

```ts
const schema = z.coerce.string();
schema.parse("tuna"); // => "tuna"
schema.parse(12); // => "12"
```

구문 분석(parse) 단계에서, 입력값은 데이터를 문자열로 강제 변환하기 위해 내장된 String() 함수를 통해 전달됩니다.

반환된 스키마는 ZodString 인스턴스이므로 zod의 모든 문자열 메서드를 사용할 수 있습니다.

```ts
z.coerce.string().email().min(5);
```

**강제 변환(coercion) 작동방식**

모든 원시 자료형은 강제 변환을 지원합니다. 
Zod는 내장 생성자 `String(input), Number(input), new Date(input), etc.. ` 를 사용하여 모든 입력을 강제합니다.

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

강제 변환에 대한 Zod의 접근 방식은 매우 간단합니다! 값을 Boolean(value)함수에 전달하는 것이 전부입니다. 
truthy 값은 true로 변환되고 falsy인 값은 false로 변환됩니다.

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

# Literals(리터럴)
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


# Strings(문자열)
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

### ISO datetimes
[Table of contents](#table-of-contents)

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
[Table of contents](#table-of-contents)

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

# Numbers(숫자)
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

# Booleans(불리언)
[Table of contents](#table-of-contents)

Boolean 스키마를 생성할 때 특정 오류 메시지를 사용자 정의할 수 있습니다.

```ts
const isActive = z.boolean({
  required_error: "isActive is required",
  invalid_type_error: "isActive must be a boolean",
});
```

# Dates(날짜형)
[Table of contents](#table-of-contents)

Date 객체의 인스턴스 유효성을 검사하려면 `z.date()`를 사용하세요.

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

zod 3.20부터 new Date(input)을 전달하려면 `z.coerce.date()`를 사용하여 입력을 전달합니다.

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


# Zod enums(zod 열거형)
[Table of contents](#table-of-contents)

```ts
const FishEnum = z.enum(["Salmon", "Tuna", "Trout"]);
type FishEnum = z.infer<typeof FishEnum>;
// 'Salmon' | 'Tuna' | 'Trout'
```

`z.enum()` 메서드는 일련의 고정된(fixed) 허용 문자열 값 세트로 스키마를 선언하는 Zod 고유의 방법입니다. 
`z.enum()` 메서드 인수로 배열(array)을 전달합니다. 
혹은 대안적으로, enum 값을 문자열 튜플로 정의하기 위해  `as const`를 사용합니다. 
자세한 내용은 [const 어설션 문서](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)를 참조하세요.

```ts
const VALUES = ["Salmon", "Tuna", "Trout"] as const;
const FishEnum = z.enum(VALUES);
```

Zod는 각 배열 요소의 정확한 값을 추론할 수 없기 때문에 이 방식은 허용되지 않습니다.

```ts
const fish = ["Salmon", "Tuna", "Trout"];
const FishEnum = z.enum(fish);
```

> z.enum 인수로 배열이 바로 들어오는 것은 가능하지만, 배열이 할당된 식별자(변수)를 인수로 줄때는 배열에 `as const` 키워드 사용해야 한다. 


**.enum**

Zod 열거형으로 **자동 완성**(autocompletion)을 얻으려면, 해당 스키마의 **enum** 프로퍼티를 사용하십시오.

```ts
FishEnum.enum.Salmon; // => autocompletes

FishEnum.enum;   //해당 enum에 정의된 값들을 자동으로 보여줌.
/*
=> {
  Salmon: "Salmon",
  Tuna: "Tuna",
  Trout: "Trout",
}
*/
```
> `autocompletion` : IDE 기능, 코드를 작성하거나 편집할 때 일부 코드나 변수명, 메서드명 등을 자동으로 완성해주는 기능

**`.options`** 프로퍼티를 사용하여 옵션 목록을 **튜플**로 검색할 수도 있습니다.

```ts
FishEnum.options; // ["Salmon", "Tuna", "Trout"];
```

**.exclude/.extract()**

`.exclude()`와 `.extract()` 메소드를 사용하여 Zod 열거형의 하위 집합(subsets)을 만들 수 있습니다.

```ts
const FishEnum = z.enum(["Salmon", "Tuna", "Trout"]);
const SalmonAndTrout = FishEnum.extract(["Salmon", "Trout"]);   //enum 목록 중 "Salmon", "Trout" 추출  
const TunaOnly = FishEnum.exclude(["Salmon", "Trout"]); //enum 목록 중 "Salmon", "Trout" 제거
```

# Native enums(네이티브 열거형)
[Table of contents](#table-of-contents)

> zod로 정의되지 않은 타입스크립트 enum

Zod 열거형은 열거형을 정의하고 검증하는 데 권장되는 접근 방식입니다. 
그러나 타사 라이브러리의 열거형에 대해 유효성을 검사해야 하는 경우(또는 기존 열거형을 다시 작성하고 싶지 않은 경우)에 `z.nativeEnum()` 메서드를 사용할수 있습니다.

**Numeric enums(숫자 열거형)**

```ts
enum Fruits {
  Apple,
  Banana,
}

const FruitEnum = z.nativeEnum(Fruits);
type FruitEnum = z.infer<typeof FruitEnum>; // Fruits

FruitEnum.parse(Fruits.Apple); // passes
FruitEnum.parse(Fruits.Banana); // passes
FruitEnum.parse(0); // passes  , 인덱스로 구문분석 가능
FruitEnum.parse(1); // passes  , 인덱스로 구문분석 가능
FruitEnum.parse(3); // fails
```

**String enums(문자열 열거형)**

```ts
enum Fruits {
  Apple = "apple",
  Banana = "banana",
  Cantaloupe, // you can mix numerical and string enums
}

const FruitEnum = z.nativeEnum(Fruits);
type FruitEnum = z.infer<typeof FruitEnum>; // Fruits

FruitEnum.parse(Fruits.Apple); // passes
FruitEnum.parse(Fruits.Cantaloupe); // passes
FruitEnum.parse("apple"); // passes
FruitEnum.parse("banana"); // passes
FruitEnum.parse(0); // passes
FruitEnum.parse("Cantaloupe"); // fails
```

`🎃Notice`
> - Cantaloupe가 실패하는 이유는 TypeScript enum에서는 값이 지정되지 않은 경우, **앞선 값에 1을 더한 값으로 자동으로 설정되기 때문**입니다. 
> - 예를 들어, Apple에는 "apple"이 할당되어 있고, Banana에는 "banana"가 할당되어 있습니다. 그리고 Cantaloupe는 값을 직접 할당하지 않았기 때문에 **TypeScript는 Banana에 1을 더한 값으로 할당합니다.** 하지만 이 경우에는 숫자형 enum이 아니라 문자열 enum이므로, Cantaloupe에 숫자를 더하는 것은 의미가 없습니다.
> - 따라서 Cantaloupe가 "banana"에 1을 더한 "**banana1**" 이 되는 것이 아니라, 바로 "Cantaloupe"로 할당되어야 합니다. 하지만 TypeScript enum에서는 이러한 처리를 해주지 않습니다. 그래서 "Cantaloupe"를 parse하려고 할 때 실패하는 것입니다.
> - 이를 해결하기 위해서는 **Cantaloupe에 직접 값을 할당해주어야 합니다.** 

```ts
enum Fruits {
  Apple = "apple",
  Banana = "banana",
  Cantaloupe = "cantaloupe", // 직접 값을 할당해야함.
}
```

**Const enums(상수 열거형)**

`.nativeEnum()`기능은 `as const`가 적용된 객체(object)에도 적용됩니다. 
⚠️ `as const` 는 TypeScript 3.4 이상이 필요합니다!

```ts
const Fruits = {
  Apple: "apple",
  Banana: "banana",
  Cantaloupe: 3,
} as const;

const FruitEnum = z.nativeEnum(Fruits);
type FruitEnum = z.infer<typeof FruitEnum>; // "apple" | "banana" | 3

FruitEnum.parse("apple"); // passes
FruitEnum.parse("banana"); // passes
FruitEnum.parse(3); // passes
FruitEnum.parse("Cantaloupe"); // fails
```
`🎃Notice`
>  Cantaloupe가 실패하는 이유는 열거형의 값으로 "Cantaloupe"가 아닌 Cantaloupe의 **값**인 3이 설정되어 있기 때문입니다. 만약 FruitEnum.parse("Cantaloupe")를 성공시키려면, Cantaloupe의 값을 "Cantaloupe"로 설정해야 합니다.



`.enum` 프로퍼티를 사용하여 기본 개체에 액세스할 수 있습니다.

```ts
FruitEnum.enum.Apple; // "apple"
```

`🎃Notice`
> [enum관련 유용한 자료](https://xpectation.tistory.com/218) 


# Optionals(옵셔널)
[Table of contents](#table-of-contents)

`z.optional()` 메서드를 사용하면 모든 스키마를 선택사항(옵셔널)으로 만들 수 있습니다. 

- 스키마를 `ZodOptional` 인스턴스의 내부에 래핑하여  반환합니다.

```ts
const schema = z.optional(z.string());

schema.parse(undefined); // => returns undefined
type A = z.infer<typeof schema>; // string | undefined
```

- 편의를 위해 기존 스키마에서 `.optional()` 메서드를 호출할 수도 있습니다.

```ts
const user = z.object({
  username: z.string().optional(),
});
type C = z.infer<typeof user>; // { username?: string | undefined };
```

`.unwrap()` 메서드를 사용하여 `ZodOptional` 인스턴스에서 래핑된 스키마를 추출할 수 있습니다.

```ts
const stringSchema = z.string();
const optionalString = stringSchema.optional();
optionalString.unwrap() === stringSchema; // true
```

# Nullables(null가능)
[Table of contents](#table-of-contents)

위와 비슷한 방식으로, `z.nullable()`을 사용하여 null 허용 타입을 생성할 수 있습니다.

- `z.nullable()` 인스턴스에 래핑.
```ts
const nullableString = z.nullable(z.string());
nullableString.parse("asdf"); // => "asdf"
nullableString.parse(null); // => null
```
- `.nullable()` 메서드 사용

```ts
const E = z.string().nullable(); // equivalent to nullableString
type E = z.infer<typeof E>; // string | null
```

`.unwrap()` 을 사용하여 내부 스키마를 추출합니다.

```ts
const stringSchema = z.string();
const nullableString = stringSchema.nullable();
nullableString.unwrap() === stringSchema; // true
```

`🎃Notice`
> nullable로 속성을 래핑하거나, 객체 자체를 래핑할 수 있다. 

```ts
const test = z.object({
  props1 : z.string(),
  props2 : z.number()
})

const test2 = test.nullable()
type inferredType = z.infer<typeof test2>
// {
    // props1: string;
    // props2: number;
// } | null
```


# Objects(객체)
[Table of contents](#table-of-contents)

`🎃Notice`
> 기본적으로 프로퍼티는 **required(필수)** 이다.

```ts
// all properties are required by default
const Dog = z.object({
  name: z.string(),
  age: z.number(),
});

// extract the inferred type like this
type Dog = z.infer<typeof Dog>;

// equivalent to:
type Dog = {
  name: string;
  age: number;
};
```

## .shape
객체 스키마의 특정 키(key)에 액세스하는 데 사용됩니다.

```
Dog.shape.name; // => string schema
Dog.shape.age; // => number schema
```

## .keyof
객체 스키마의 모든 키를 ZodEnum으로 생성하는 데 사용됩니다.

```
const keySchema = Dog.keyof();
keySchema; // ZodEnum<["name", "age"]>
```

## .extend
스키마에 필드를 추가할 수 있습니다.

```
const DogWithBreed = Dog.extend({
  breed: z.string(),
});
```

`🎃Notice`
> 필드를 덮어쓰는 데 사용할 수 있습니다. **주의 필요.**

## .merge
`A.extend(B.shape)`와 동일합니다.

-> A 스키마에 B 스키마를 추가하여 확장.(extend.) 

```ts
const BaseTeacher = z.object({ students: z.array(z.string()) });
const HasID = z.object({ id: z.string() });

const Teacher = BaseTeacher.merge(HasID);
type Teacher = z.infer<typeof Teacher>; // => { students: string[], id: string }
```

> 두 스키마가 키를 공유하는 경우 B의 속성이 A의 속성을 재정의합니다. 

> 반환된 스키마는 또한 B의 "unknownKeys" 정책
> (strip/strict/passthrough) 및 포괄 스키마를 상속합니다.

## .pick/.omit
TypeScript의 유틸리티 타입인 Pick 과 Omit 에서 영감을 받아, 모든 Zod 객체 스키마에는 `.pick` 과 `.omit` 메서드가 있습니다.

예시는 다음과 같습니다.

```ts
const Recipe = z.object({
  id: z.string(),
  name: z.string(),
  ingredients: z.array(z.string()),
});
```

`.pick` : zod 객체에서 특정 키만 추출 합니다.

```ts
const JustTheName = Recipe.pick({ name: true });
type JustTheName = z.infer<typeof JustTheName>;
// => { name: string }
```

`.omit` : zod 객체에서 특정 키를 제거 합니다.

```ts
const NoIDRecipe = Recipe.omit({ id: true });

type NoIDRecipe = z.infer<typeof NoIDRecipe>;
// => { name: string, ingredients: string[] }
```

## .partial
TypeScript 유틸리티 타입 `Partial` 에서 영감을 받은 `.partial` 메서드는 모든 속성을 선택 사항(`optional`)으로 만듭니다.

예시는 다음과 같습니다.

```ts
const user = z.object({
  email: z.string(),
  username: z.string(),
});
// { email: string; username: string }
```

zod 객체의 모든 속성을 옵셔널로 만듭니다.

```ts
const partialUser = user.partial();
// { email?: string | undefined; username?: string | undefined }
```

특정 속성만 옵셔널로 지정할때 사용 할 수도 있습니다.

```ts
const optionalEmail = user.partial({
  email: true,
});
/*
{
  email?: string | undefined;
  username: string
}
*/
```

## .deepPartial
`.partial` 은 한 수준 깊이에만 적용되는 얕은(shallow) 방법입니다. 중첩 객체에 적용할 수 있는 "깊은(deep)"버전도 있습니다.

```ts
const user = z.object({
  username: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  strings: z.array(z.object({ value: z.string() })),
});

const deepPartialUser = user.deepPartial();

/*
{
  username?: string | undefined,
  location?: {
    latitude?: number | undefined;
    longitude?: number | undefined;
  } | undefined,
  strings?: { value?: string}[]
}
*/
```

> 중요한 제한 사항: `.deepPartial`은 객체, 배열 및 튜플의 계층 구조에서만 예상대로 작동합니다.

## .required
`.partial`메서드와 반대로, `.required` 메서드는 모든 속성을 필수로 만듭니다.

예를 들어 다음과 같습니다.

```ts
const user = z
  .object({
    email: z.string(),
    username: z.string(),
  })
  .partial();
// { email?: string | undefined; username?: string | undefined }
```

모든 속성이 필수인 스키마를 생성할 수 있습니다.

```ts
const requiredUser = user.required();
// { email: string; username: string }
```

필수로 설정할 속성을 지정할 수도 있습니다.

```ts
const requiredEmail = user.required({
  email: true,
});
/*
{
  email: string;
  username?: string | undefined;
}
*/
```

## .passthrough
기본적으로 Zod 객체 스키마는 구문 분석 중에 인식할 수 없는 키를 제거합니다.

```ts
const person = z.object({
  name: z.string(),
});

person.parse({
  name: "bob dylan",
  extraKey: 61,
});
// => { name: "bob dylan" }
// extraKey has been stripped
```

알 수 없는 키를 통과하려면 `.passthrough()`를 사용하세요.

```ts
person.passthrough().parse({
  name: "bob dylan",
  extraKey: 61,
});
// => { name: "bob dylan", extraKey: 61 }
```

## .strict
기본적으로 Zod 객체 스키마는 구문 분석 중에 인식할 수 없는 키를 제거합니다. `.strict()` 를 사용하면 알 수 없는 키를 허용하지 않을 수 있습니다.  
입력에 알 수 없는 키가 있으면 Zod는 오류를 발생시킵니다.

```ts
const person = z
  .object({
    name: z.string(),
  })
  .strict();

person.parse({
  name: "bob dylan",
  extraKey: 61,
});
// => throws ZodError
```

## .strip
`.strip` 메서드를 사용하면 객체 스키마를 기본 동작(인식할 수 없는 키 제거)으로 재설정할 수 있습니다.

## .catchall
`catchall` 스키마를 객체 스키마에 전달할 수 있습니다. 알려지지 않은 모든 키는 catchall 스키마를 기준으로 검증됩니다.

```ts
const person = z
  .object({
    name: z.string(),
  })
  .catchall(z.number());

person.parse({
  name: "bob dylan",
  validExtraKey: 61, // works fine
});

person.parse({
  name: "bob dylan",
  validExtraKey: false, // fails
});
// => throws ZodError
```

`.catchall()` 메서드를 사용하면 `.passthrough(), .strip()`또는 `.strict()` 가 제거됩니다.  
이제 모든 키는 "알려진" 것으로 간주됩니다.


# 배열
[Table of contents](#table-of-contents)

```ts
const stringArray = z.array(z.string());

// equivalent
const stringArray = z.string().array();
```

`.array()` 사용시 주의하세요. 새 ZodArray인스턴스를 반환합니다.  
이는 메소드를 호출하는 순서가 중요하다는 것을 의미합니다. 
예를 들어:
```ts
z.string().optional().array(); // (string | undefined)[]
z.string().array().optional(); // string[] | undefined
```
`🎃notice`
- `.array()` 이전에 호출된 스키마 타입의 종류로 배열 요소의 타입을 단일 타입 혹은 유니언 타입으로 설정할수 있다.
  
## .element
배열 요소의 스키마에 액세스하는 데 사용됩니다.

```ts
stringArray.element; // => string schema
```

## .nonempty
배열에 요소가 하나 이상 포함되어 있는지 확인하려면 `.nonempty()`를 사용하세요.

```ts
const nonEmptyStrings = z.string().array().nonempty();
// the inferred type is now
// [string, ...string[]]

nonEmptyStrings.parse([]); // throws: "Array cannot be empty"
nonEmptyStrings.parse(["Ariana Grande"]); // passes
```

선택적으로 사용자 정의 오류 메시지를 지정할 수 있습니다.

```ts
// optional custom error message
const nonEmptyStrings = z.string().array().nonempty({
  message: "Can't be empty!",
});
```
- nonempty 메서드에 객체 인수 지정한다. 
## .min/.max/.length
- 배열요소의 대소와 길이를 판별할 수 있습니다.
```ts
z.string().array().min(5); // must contain 5 or more items
z.string().array().max(5); // must contain 5 or fewer items
z.string().array().length(5); // must contain 5 items exactly
```
`🎃notice`
`.nonempty()`과 달리 추론 타입을 변경하지 않고 유효성만  검사합니다.

# 튜플
[Table of contents](#table-of-contents)

배열과 달리 튜플은 **고정 갯수의 요소**를 가지며 각 요소는 **서로 다른 타입**을 가질 수 있습니다.

`🎃notice`
배열 요소 인덱스에 따른 타입도 지정됩니다.

```ts
const athleteSchema = z.tuple([
  z.string(), // name
  z.number(), // jersey number
  z.object({
    pointsScored: z.number(),
  }), // statistics
]);

type Athlete = z.infer<typeof athleteSchema>;
// type Athlete = [string, number, { pointsScored: number }]
```

`.rest()` 메서드로 가변성("rest") 인수를 추가할 수 있습니다.
```ts
// 첫번째 요소가 string이면서, 나머지 요소 전체는 number 타입인 튜플
const variadicTuple = z.tuple([z.string()]).rest(z.number());
const result = variadicTuple.parse(["hello", 1, 2, 3]);
// => [string, ...number[]];
```

# 유니언(Unions)
[Table of contents](#table-of-contents)

Zod에는 "OR" 타입을 구성하기 위한 빌트인 `z.union()`메서드가 포함되어 있습니다.

```ts
const stringOrNumber = z.union([z.string(), z.number()]);

stringOrNumber.parse("foo"); // passes
stringOrNumber.parse(14); // passes
```

Zod는 각 "옵션"에 대해 입력을 순서대로 테스트하고, 성공적으로 검증된 첫 번째 값을 반환합니다.

편의를 위해 `.or()`메서드를 사용할 수도 있습니다.

```ts
const stringOrNumber = z.string().or(z.number());
```

`🎃notice`
- 세개 이상의 유니언도 가능하다.
- 타입 검증시 **union에서 정의된 타입 순서대로** 타입을 순회하면서 검증한다는 점 유의. 
  
```ts
// const stringOrNumberOrBoolean = z.union([z.string(),z.number(),z.boolean()])
const stringOrNumberOrBoolean = z.string().or(z.number()).or(z.boolean())


const testArray = ['string',1,true]
// const testArray = ['string',1,null] //Throw error
for (let index = 0; index < testArray.length; index++) {
console.log("🚀 ~ stringOrNumberOrBoolean:", stringOrNumberOrBoolean.parse(testArray[index]))
}
```
**선택적 문자열 검증**
선택적으로 form 입력의 유효성을 검사하려면 원하는 문자열 유효성 검사를 빈 문자열 리터럴과 통합해서 수행할 수 있습니다.

이 예에서는 문자열이 선택적으로 주어질때, 입력값이 유효한 URL을 포함하는지를 검사합니다.

```ts
//.nullish() : null + undefined
const optionalUrl = z.union([z.string().url().nullish(), z.literal("")]);  

console.log(optionalUrl.safeParse(undefined).success); // true
console.log(optionalUrl.safeParse(null).success); // true
console.log(optionalUrl.safeParse("").success); // true
console.log(optionalUrl.safeParse("https://zod.dev").success); // true
console.log(optionalUrl.safeParse("not a valid url").success); // false
```

# 판별 유니언(Discriminated unions)
[Table of contents](#table-of-contents)

판별 유니언은 **모든 객체가 특정 키(key)를 공유하는** 객체 스키마의 유니언(union)입니다.

```ts
type MyUnion =
  | { status: "success"; data: string }
  | { status: "failed"; error: Error };
```

이러한 유니언은 `z.discriminatedUnion()`메서드로 표현될 수 있으며, 메서드 적용시 Zod가 판별자 키(위 예제에서는 `status`)를 확인하여 입력 구문 분석에 사용할 스키마를 결정할 수 있으므로 구문 분석이 더 빨라지고 Zod가 더 친숙한 오류를 보고할 수 있기 때문에 평가 속도가 빨라집니다.

기본 유니언 방식에서는 제공된 각 "옵션"(유니언에 제공된 모든 타입들)에 대해 입력을 테스트하고 유효하지 않은 경우 모든 "옵션"에 대한 문제가 zod 오류에 표시됩니다. 반면에 판별 유니언에서는 '옵션' 중 하나만 선택하여 테스트하고 이 '옵션'과 관련된 문제만 표시할 수 있습니다.

```ts
// 일반적인 유니언 방식 파싱.
const stringOrNumber = z.union([z.string(), z.number()]);

stringOrNumber.parse("foo"); // passes
stringOrNumber.parse(14); // passes
```


```ts
// 판별 유니언 방식을 적용한 파싱.
const myUnion = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), data: z.string() }),
  z.object({ status: z.literal("failed"), error: z.instanceof(Error) }),
]);

myUnion.parse({ status: "success", data: "yippie ki yay" });
```






















---
이동할위치의 텍스트부분을 작성할 때 영어는 반드시 "소문자"만 가능하며 띄어쓰기는 - 로 구분해야한다.

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