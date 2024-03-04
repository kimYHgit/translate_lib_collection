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
- [배열](#배열)
  - [.element](#element)
  - [.nonempty](#nonempty)
  - [.min/.max/.length](#minmaxlength)
- [튜플](#튜플)
- [유니언(Unions)](#유니언unions)
- [판별 유니언(Discriminated unions)](#판별-유니언discriminated-unions)
- [레코드(Records)](#레코드records)
  - [레코드 키 유형(Record key type)](#레코드-키-유형record-key-type)
- [Maps](#maps)
- [Sets](#sets)
- [인터섹션(Intersections)](#인터섹션intersections)
- [재귀 유형(Recursive types)](#재귀-유형recursive-types)
  - [ZodEffect를 사용한 ZodType](#zodeffect를-사용한-zodtype)
  - [JSON 유형](#json-유형)
  - [순환 객체](#순환-객체)
- [프로미스(Promises)](#프로미스promises)
- [Instanceof](#instanceof)
- [함수(Functions)](#함수functions)
- [전처리(Preprocess)](#전처리preprocess)
- [커스텀 스키마](#커스텀-스키마)
- [스키마 메서드](#스키마-메서드)
  - [.parse](#parse)
  - [.parseAsync](#parseasync)
  - [.safeParse](#safeparse)
  - [.safeParseAsync](#safeparseasync)
  - [.refine](#refine)
  - [.superRefine](#superrefine)
  - [.transform](#transform)
  - [.default](#default)
  - [.describe](#describe)
  - [.catch](#catch)
  - [.optional](#optional)
  - [.nullable](#nullable)
  - [.nullish](#nullish)
  - [.array](#array)
  - [.promise](#promise)
  - [.or](#or)
  - [.and](#and)
  - [.brand](#brand)
  - [.readonly](#readonly)
  - [.pipe](#pipe)
  - [.pipe()를 사용하여 z.coerce의 일반적인 문제를 해결할 수 있습니다.](#pipe를-사용하여-zcoerce의-일반적인-문제를-해결할-수-있습니다)


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
- 함수형 접근 방식: [검증(validation)하지 말고 구문 분석(parse)합시다.](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/)  
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

- `🎃appendix - Discriminated unions`

**[example1]**
- 타입스크립트와 Zod를 사용하여 계좌 유형을 나타내는 판별 유니언을 구현.

먼저, Zod를 사용하여 각 계좌 유형에 대한 스키마를 정의합니다.

```typescript
import { z } from "zod";

// Checking Account Schema
const CheckingAccountSchema = z.object({
  type: z.literal("checking"),
  accountNumber: z.string(),
  balance: z.number(),
  overdraftLimit: z.number(),
});

// Savings Account Schema
const SavingsAccountSchema = z.object({
  type: z.literal("savings"),
  accountNumber: z.string(),
  balance: z.number(),
  interestRate: z.number(),
});

// Investment Account Schema
const InvestmentAccountSchema = z.object({
  type: z.literal("investment"),
  accountNumber: z.string(),
  balance: z.number(),
  investmentType: z.string(),
});

// Define Union Schema
const AccountSchema = CheckingAccountSchema.or(SavingsAccountSchema).or(
  InvestmentAccountSchema
);
```

이제 각 계좌 유형에 대한 데이터를 구성하고, 해당 데이터가 유효한지 검증할 수 있습니다.

```typescript
// 예시 데이터
const checkingAccountData = {
  type: "checking",
  accountNumber: "123456",
  balance: 1000,
  overdraftLimit: 500,
};

// 데이터 검증
const parsedData = AccountSchema.parse(checkingAccountData);
console.log(parsedData);
```


**[example2]**
- 물류 및 재고 관리 시스템에서 판별 유니언을 활용한 예시.
- 물류 항목은 제품(Product), 장비(Equipment), 및 자재(Material)으로 세 가지 유형이라고 가정해 보겠습니다.

먼저, Zod의 `z.discriminatedUnion()`을 사용하여 이러한 세 가지 유형을 정의합니다.

```typescript
import { z } from "zod";

// 제품 스키마
const ProductSchema = z.object({
  type: z.literal("product"),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});

// 장비 스키마
const EquipmentSchema = z.object({
  type: z.literal("equipment"),
  name: z.string(),
  serialNumber: z.string(),
  status: z.enum(["available", "inUse", "maintenance"]),
});

// 자재 스키마
const MaterialSchema = z.object({
  type: z.literal("material"),
  name: z.string(),
  quantity: z.number(),
  unit: z.string(),
});

// 판별 유니언을 생성
const LogisticsItemSchema = z.discriminatedUnion(
  "type",
  {
    product: ProductSchema,
    equipment: EquipmentSchema,
    material: MaterialSchema,
  }
);
```

이제 다양한 물류 항목을 생성하고 검증해 보겠습니다.

```typescript
// 제품 데이터
const productData = {
  type: "product",
  name: "휴대폰",
  price: 1000000,
  quantity: 10,
};

// 장비 데이터
const equipmentData = {
  type: "equipment",
  name: "포크레인",
  serialNumber: "CRN12345",
  status: "available",
};

// 자재 데이터
const materialData = {
  type: "material",
  name: "나무판자",
  quantity: 50,
  unit: "개",
};

// 데이터 검증
console.log(LogisticsItemSchema.parse(productData));
console.log(LogisticsItemSchema.parse(equipmentData));
console.log(LogisticsItemSchema.parse(materialData));
```

- 다양한 물류 항목을 효과적으로 모델링하고 검증할 수 있습니다. 
- 코드가 간결해지고 가독성이 향상됩니다.

# 레코드(Records)  
[Table of contents](#table-of-contents)

레코드 스키마는 `{ [k: string]: number }`와 같은 유형을 검증할때 사용합니다.

스키마에 대해 객체 값의 유효성을 검사하고 싶지만 키는 신경 쓰지 않는 경우 `z.record(valueType)`를 사용하세요.

```ts
const NumberCache = z.record(z.number()); //레코드 객체의 키값이 number.

type NumberCache = z.infer<typeof NumberCache>;
// => { [k: string]: number }
```

이는 ID별로 항목을 저장하거나 캐싱하는 데 특히 유용합니다.

```ts
const userSchema = z.object({ name: z.string() }); 
// 레코드 객체의 키 값이 object : { name: z.string() }
const userStoreSchema = z.record(userSchema);

type UserStore = z.infer<typeof userStoreSchema>;
// => type UserStore = { [ x: string ]: { name: string } }

const userStore: UserStore = {};

userStore["77d2586b-9e8e-4ecf-8b21-ea7e0530eadd"] = {
  name: "Carlotta",
}; // passes

userStore["77d2586b-9e8e-4ecf-8b21-ea7e0530eadd"] = {
  whatever: "Ice cream sundae",
}; // TypeError
```
`🎃notice`
- z.record(`레코드 객체의 값으로 지정될 스키마`)

## 레코드 키 유형(Record key type)
[Table of contents](#table-of-contents)

키와 값을 모두 확인하려면 `z.record(keyType, valueType)`을 사용하세요.

```ts
const NoEmptyKeysSchema = z.record(z.string().min(1), z.number());
NoEmptyKeysSchema.parse({ count: 1 }); // => { 'count': 1 }
NoEmptyKeysSchema.parse({ "": 1 }); // fails
```

**(두 개의 인수를 전달할 때 주의하세요. `valueType`가 두 번째 인수입니다.)**

**숫자 키에 대한 참고 사항**

- [맵드 타입(Mapped Type)이란?](https://joshua1988.github.io/ts/usage/mapped-type.html#%EB%A7%B5%EB%93%9C-%ED%83%80%EC%9E%85-mapped-type-%EC%9D%B4%EB%9E%80)
- [[Typescript] Record 타입 사용하기](https://cheeseb.github.io/typescript/typescript-record/)

`z.record(keyType, valueType)`는 숫자 키 유형을 받아들일 수 있고 TypeScript의 빌트인 Record 타입은 Record<KeyType, ValueType>이지만, Zod에서는 Record<number, any> 유형은 표현하기 어렵습니다.

결과적으로 `[k: 숫자]`를 둘러싼 TypeScript의 동작은 약간 직관적이지 않습니다:

```ts
const testMap: { [k: number]: string } = {
  1: "one",
};

for (const key in testMap) {
  console.log(`${key}: ${typeof key}`);
}
// prints: `1: string`
```

보시다시피 JavaScript는 자동으로 모든 객체 키를 **문자열**로 캐스팅합니다.  
Zod는 정적 타입과 런타임 타입 사이의 간극을 메우려는 것이므로 숫자 키로 레코드 스키마를 생성하는 방법을 제공하는 것은 의미가 없습니다.  
런타임 JavaScript에는 숫자 키와 같은 것이 없기 때문입니다.

# Maps
[Table of contents](#table-of-contents)

- [맵과 셋](https://ko.javascript.info/map-set)
- [자바스크립트 Map 자료구조 적극 이용하기](https://dev.gmarket.com/68)

```ts
const stringNumberMap = z.map(z.string(), z.number());

type StringNumberMap = z.infer<typeof stringNumberMap>;
// type StringNumberMap = Map<string, number>
```

# Sets
[Table of contents](#table-of-contents)

- [자바스크립트 set 관련 글](https://www.daleseo.com/js-set/#google_vignette)

```ts
const numberSet = z.set(z.number());
type NumberSet = z.infer<typeof numberSet>;
// type NumberSet = Set<number>
```

`set`스키마는 다음 유틸리티 메소드를 사용하여 제약을 추가할 수 있습니다.

```ts
z.set(z.string()).nonempty(); // must contain at least one item
z.set(z.string()).min(5); // must contain 5 or more items
z.set(z.string()).max(5); // must contain 5 or fewer items
z.set(z.string()).size(5); // must contain 5 items exactly
```

# 인터섹션(Intersections)
[Table of contents](#table-of-contents)

인터섹션은 "논리적 AND" 유형을 생성하는 데 유용합니다. 

- 두 객체 타입을 교차하는 데 유용합니다. 
```ts
const Person = z.object({
  name: z.string(),
});

const Employee = z.object({
  role: z.string(),
});

const EmployedPerson = z.intersection(Person, Employee);

// equivalent to:
const EmployedPerson = Person.and(Employee);
```

일반적으로 두 객체를 병합하는 데 `A.merge(B)`를 사용하는 것이 좋습니다.   
`.merge()` 메서드는 새로운 **ZodObject** 인스턴스를 반환하는 반면, `A.and(B)`는 `pick 및 omit`과 같은 일반적인 객체 메서드가 없는 덜 유용한 **ZodIntersection** 인스턴스를 반환합니다.

[.pick/.omit](##.pick/.omit)

```ts
const a = z.union([z.number(), z.string()]);
const b = z.union([z.number(), z.boolean()]);
const c = z.intersection(a, b);

type c = z.infer<typeof c>; // => number
```

`🎃notice`
- 세가지 객체 병합 방법 : `z.intersection()` , `A.and(B)` , `A.merge(B)`
- `A.merge(B)` : ZodObject 인스턴스 반환 
- `z.intersection()` , `A.and(B)` : ZodIntersection 인스턴스 반환
- `Zod object`의 메서드를 활용하여 후속 처리해야한다면 `A.merge(B)` 사용한다.

# 재귀 유형(Recursive types)
Zod에서 재귀 스키마를 정의할 수 있지만 TypeScript의 제한으로 인해 해당 유형을 정적으로 유추할 수 없습니다. 대신에 수동으로 타입을 정의하고 이를 **"유형 힌트"(type hint)** 로 Zod에 제공해야 합니다.

```ts
const baseCategorySchema = z.object({
  name: z.string(),
});

type Category = z.infer<typeof baseCategorySchema> & {
  subcategories: Category[];
};

const categorySchema: z.ZodType<Category> = baseCategorySchema.extend({
  subcategories: z.lazy(() => categorySchema.array()),
});

categorySchema.parse({
  name: "People",
  subcategories: [
    {
      name: "Politicians",
      subcategories: [
        {
          name: "Presidents",
          subcategories: [],
        },
      ],
    },
  ],
}); // passes
```

## ZodEffect를 사용한 ZodType
`z.ZodEffects`(예를 들어 `.refine`, `.transform`, `preproces`, `etc...` ) 와 함께 `z.ZodType`를 사용하는 경우 스키마의 입력 및 출력 유형을 정의해야 합니다.  

기본형태 : `z.ZodType<Output, z.ZodTypeDef, Input>`

```ts
const isValidId = (id: string): id is `${string}/${string}` =>
  id.split("/").length === 2;

const baseSchema = z.object({
  id: z.string().refine(isValidId),
});

type Input = z.input<typeof baseSchema> & {
  children: Input[];
};

type Output = z.output<typeof baseSchema> & {
  children: Output[];
};

const schema: z.ZodType<Output, z.ZodTypeDef, Input> = baseSchema.extend({
  children: z.lazy(() => schema.array()),
});
```

## JSON 유형
JSON 값의 유효성을 검사하려면 아래 스니펫을 사용하세요.

```ts
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
type Json = Literal | { [key: string]: Json } | Json[];
const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);

jsonSchema.parse(data);
```


## 순환 객체
zod는 재귀 스키마를 지원하지만, 순환 데이터를 Zod에 전달하면 무한 루프가 발생합니다.


# 프로미스(Promises)

```ts
const numberPromise = z.promise(z.number());
```
"구문 분석(Parsing)"은 프로미스 스키마에서 약간 다르게 동작합니다. 유효성 검사는 두 부분으로 이루어집니다.

1. Zod는 입력이 Promise의 인스턴스(즉, `.then`과 `.catch`메소드가 있는 객체)인지 동기적으로 확인합니다  

2. Zod는 기존 Promise에 추가 검증 단계를 추가하는 데 `.then` 을 사용합니다. 유효성 검사 실패를 처리하려면 반환된 Promise에 `.catch`를 사용해야 합니다.

```ts
numberPromise.parse("tuna");
// ZodError: Non-Promise type: string

numberPromise.parse(Promise.resolve("tuna"));
// => Promise<number>

const test = async () => {
  await numberPromise.parse(Promise.resolve("tuna"));
  // ZodError: Non-number type: string

  await numberPromise.parse(Promise.resolve(3.14));
  // => 3.14
};
```

# Instanceof
`z.instanceof` 메서드로 입력이 클래스의 인스턴스인지 확인하는 데 사용할 수 있습니다. 이는 서드파티 라이브러리에서 내보낸 클래스에 대해 입력의 유효성을 검사하는 데 유용합니다.

```ts
class Test {
  name: string;
}

const TestSchema = z.instanceof(Test);

const blob: any = "whatever";
TestSchema.parse(new Test()); // passes
TestSchema.parse(blob); // throws
```


# 함수(Functions)
Zod를 사용하면 "함수 스키마"를 정의할 수 있습니다.  
이를 통해 유효성 검사 코드와 "비즈니스 로직"을 혼합하지 않고도 함수의 **입력**과 **출력**을 쉽게 확인할 수 있습니다.

`z.function(args, returnType)`를 사용하여 함수 스키마를 생성할 수 있습니다.

```ts
const myFunction = z.function();

type myFunction = z.infer<typeof myFunction>;
// => ()=>unknown
```

입력과 출력을 정의합니다.

```ts
const myFunction = z
  .function()
  .args(z.string(), z.number()) // accepts an arbitrary number of arguments
  .returns(z.boolean());

type myFunction = z.infer<typeof myFunction>;
// => (arg0: string, arg1: number)=>boolean
```

함수 스키마에는 함수를 받아들이고 입력과 출력의 유효성을 자동으로 검사하는 새 함수를 반환하는 `.implement()` 메서드가 있습니다.
Function schemas have an .implement() method which accepts a function and returns a new function that automatically validates its inputs and outputs.

```ts
const trimmedLength = z
  .function()
  .args(z.string()) // accepts an arbitrary number of arguments
  .returns(z.number())
  .implement((x) => {
    // TypeScript knows x is a string!
    return x.trim().length;
  });

trimmedLength("sandwich"); // => 8
trimmedLength(" asdf "); // => 4
```

입력 유효성 검사에만 관심이 있다면 `.returns()`메서드를 호출하지 마세요. 출력 유형은 `implementation`에서 추론됩니다.

> 함수가 아무것도 반환하지 않는 경우 특수 옵션 `z.void()`을 사용할 수 있습니다. 이를 통해 Zod는 void 반환 함수의 유형을 적절하게 추론할 수 있습니다. (Void 반환 함수는 실제로는 `undefined`를 반환합니다.)

```ts
const myFunction = z
  .function()
  .args(z.string())
  .implement((arg) => {
    return [arg.length];
  });

myFunction; // (arg: string)=>number[]
```

함수 스키마에서 입력 및 출력 스키마를 추출할 수 있습니다.

```ts
myFunction.parameters();
// => ZodTuple<[ZodString, ZodNumber]>

myFunction.returnType();
// => ZodBoolean
```

# 전처리(Preprocess)
이제 Zod는 `.preprocess()`없이도 원시형 강제 변환(**primitive coercion**)을 지원합니다. 자세한 내용은 [Coercion for primitives](#coercion-for-primitives원시형-강제변환)를 참조하세요 .

일반적으로 Zod는 "파싱 후 변환"(`"parse then transform"`) 패러다임에 따라 작동합니다. Zod는 먼저 입력의 유효성을 검사한 다음 변환 함수 체인(`a chain of transformation functions`)을 통해 이를 전달합니다. (변환(transform)에 대한 자세한 내용은 .transform 문서를 참조하세요 .)

그러나 때로는 구문 분석(`parsing`)이 수행되기 전에 입력에 부분적으로 변환을 적용하고 싶을 수도 있습니다.  
A common use case: type coercion. Zod는 `z.preprocess()`를 통해 이를 가능하게 합니다.

```ts
const castToString = z.preprocess((val) => String(val), z.string());
```

전처리(Preprocess)는 **ZodEffects** 인스턴스를 반환합니다. `ZodEffects`는 `preprocessing, refinements, transforms`와 관련된 모든 논리를 포함하는 래퍼 클래스입니다.

# 커스텀 스키마

`z.custom()`를 사용하여 모든 TypeScript 유형에 대한 Zod 스키마를 생성할 수 있습니다. 이는 템플릿 문자열 리터럴과 같이 Zod에서 기본적으로 지원되지 않는 유형에 대한 스키마를 만드는 데 유용합니다.

```ts
const px = z.custom<`${number}px`>((val) => {
  return typeof val === "string" ? /^\d+px$/.test(val) : false;
});

type px = z.infer<typeof px>; // `${number}px`

px.parse("42px"); // "42px"
px.parse("42vw"); // throws;
```

`z.custom()`메서드에 유효성 검사 함수를 인수로 제공하지 않으면 Zod는 모든 값을 허용합니다. 주의하세요!

```ts
z.custom<{ arg: string }>(); // performs no validation
```

두 번째 인수를 전달하여 오류 메시지 및 기타 옵션을 사용자 정의할 수 있습니다. 이 매개변수는 `.refine`의 params  매개변수와 동일한 방식으로 작동합니다.

```ts
z.custom<...>((val) => ..., "custom error message");
```

# 스키마 메서드
모든 Zod 스키마에는 특정 메소드들이 포함되어 있습니다.

## .parse
`.parse(data: unknown): T`

Zod 스키마가 주어지면 `.parse` 메서드를 호출하여 유효한 `데이터`인지 확인할 수 있습니다. 만약 데이터가 유효하다면, 전체 유형 정보와 함께 값이 반환됩니다! 그렇지 않으면 오류가 발생합니다.

>중요: `.parse`에서 반환된 값은 전달한 변수의 전체 복제본(deep clone) 입니다.

```ts
const stringSchema = z.string();

stringSchema.parse("fish"); // => returns "fish"
stringSchema.parse(12); // throws error
```
## .parseAsync
`.parseAsync(data:unknown): Promise<T>`

비동기 세분화 또는 트랜스폼을 사용하는 경우(나중에 자세히 설명합니다) `.parseAsync`를 사용해야 합니다.

```ts
const stringSchema = z.string().refine(async (val) => val.length <= 8);

await stringSchema.parseAsync("hello"); // => returns "hello"
await stringSchema.parseAsync("hello world"); // => throws error
```

## .safeParse
`.safeParse(data:unknown): { success: true; data: T; } | { success: false; error: ZodError; }`

검증이 실패할 때 Zod가 오류를 발생시키는 것을 원하지 않는다면 `.safeParse`를 사용합니다. 이 메소드는 성공적으로 구문 분석된 데이터 또는 검증 오류 원인에 대한 자세한 정보가 포함된 ZodError 인스턴스를 포함하는 객체를 반환합니다.

```ts
stringSchema.safeParse(12);
// => { success: false; error: ZodError }

stringSchema.safeParse("billie");
// => { success: true; data: 'billie' }
```

결과는 판별 유니언이므로 오류를 매우 편리하게 처리할 수 있습니다.

```ts
const result = stringSchema.safeParse("billie");
if (!result.success) {
  // handle error then return
  result.error;
} else {
  // do something
  result.data;
}
```

## .safeParseAsync

> 약칭:`.spa`

`safeParse`의 비동기 버전입니다.

```ts
await stringSchema.safeParseAsync("billie");
```

편의상 다음과 같이 별칭 `.spa`로 지정되었습니다.

```ts
await stringSchema.spa("billie");
```

## .refine
`.refine(validator: (data:T)=>any, params?: RefineParams)`

Zod를 사용하면 세분화(refinements)를 통해 사용자 지정 유효성 검사 로직을 제공할 수 있습니다. (여러 이슈 생성 및 오류 코드 사용자 지정과 같은 고급 기능은 `.superRefine`을 참조하세요.)

Zod는 TypeScript를 최대한 가깝게 미러링하도록 설계되었습니다. 그러나 TypeScript의 유형 시스템에서 표현할 수 없는 소위 '세분화 유형'을 확인해야 하는 경우가 많이 있습니다. 예를 들어 숫자가 정수인지 또는 문자열이 유효한 이메일 주소인지 확인하는 것이 그 예입니다.

예를 들어 `.refine` 메서드를 사용하여 Zod 스키마에 대한 사용자 정의 유효성 검사를 정의할 수 있습니다.

```ts
const myString = z.string().refine((val) => val.length <= 255, {
  message: "String can't be more than 255 characters",
});
```

> ⚠️ 세분화 함수는 던져서는 안 됩니다. 대신 실패를 알리는 거짓 값(a falsy value)을 반환해야 합니다.

**인수**
보시다시피 `.refine` 메서드는 두 가지 인수를 갖습니다.

1. 첫 번째 인수는 검증 함수 입니다. 이 함수는 하나의 입력(유형 T, 즉 추론된 스키마 유형)을 가져와서 `any`를 반환합니다. 모든 진실한 값(truthy value)은 유효성 검사를 통과합니다. ( zod@1.6.2 이전에는 유효성 검사 함수가 불리언 값을 반환해야 했습니다.)
2. 두 번째 인수는 몇 가지 옵션을 허용합니다. 이를 사용하여 특정 오류 처리 동작을 사용자 지정할 수 있습니다:

```ts
type RefineParams = {
  // override error message
  message?: string;

  // appended to error path
  path?: (string | number)[];

  // params object you can use to customize message
  // in error map
  params?: object;
};
```

고급 사례의 경우 두 번째 인수는 `RefineParams`를 반환하는 함수일 수도 있습니다.

```ts
const longString = z.string().refine(
  (val) => val.length > 10,
  (val) => ({ message: `${val} is not more than 10 characters` })
);
```

**오류 경로 사용자 정의**

```ts
const passwordForm = z
  .object({
    password: z.string(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

passwordForm.parse({ password: "asdf", confirm: "qwer" });
```

`path` 매개변수를 제공했기 때문에 결과 오류는 다음과 같습니다.

```ts
ZodError {
  issues: [{
    "code": "custom",
    "path": [ "confirm" ],
    "message": "Passwords don't match"
  }]
}
```

**Asynchronous refinements**

비동기 세분화(refinements)도 가능합니다.

```ts
const userId = z.string().refine(async (id) => {
  // verify that ID exists in database
  return true;
});
```

⚠️ 비동기 세분화(refinements)를 사용하는 경우 데이터를 구문 분석할 때 `.parseAsync` 메서드를 사용해야 합니다! 그렇지 않으면 Zod가 오류를 발생시킵니다.

**변환(transforms)과의 관계**

변환(transforms) 및 세분화(refinements)는 인터리브될 수 있습니다.

```ts
z.string()
  .transform((val) => val.length)
  .refine((val) => val > 25);
```

## .superRefine
`.refine` 메서드는 실제로는 `superRefine`이라는 더 다재다능하고 장황한 메서드 위에 문법적 설탕(syntactic sugar)을 얹은 것입니다. 다음은 예시입니다:

```ts
const Strings = z.array(z.string()).superRefine((val, ctx) => {
  if (val.length > 3) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      maximum: 3,
      type: "array",
      inclusive: true,
      message: "Too many items 😡",
    });
  }

  if (val.length !== new Set(val).size) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `No duplicates allowed.`,
    });
  }
});
```

원하는 만큼 이슈를 추가할 수 있습니다. 함수 실행 중에 `ctx.addIssue`가 호출되지 않으면 유효성 검사가 통과됩니다.

일반적으로는 세분화(refinements)하면 항상 `ZodIssueCode.custom` 오류 코드가 포함된 이슈가 생성되지만, `superRefine`을 사용하면 모든 `ZodIssueCode`의 이슈를 던질 수 있습니다. 각 이슈 코드는 오류 처리 가이드에 자세히 설명되어 있습니다: ERROR_HANDLING.md.

**조기 중단**
기본적으로 구문 분석은 세분화 검사에 실패한 후에도 계속됩니다. 예를 들어, 여러 개의 세분화 검사를 함께 연결하면 모두 실행됩니다. 그러나 나중에 세분화가 실행되지 않도록 조기에 중단하는 것이 바람직할 수 있습니다. 이렇게 하려면 `fatal` 플래그를 ctx.addIssue에 전달하고 `z.NEVER`를 반환하세요.

```ts
const schema = z.number().superRefine((val, ctx) => {
  if (val < 10) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "should be >= 10",
      fatal: true,
    });

    return z.NEVER;
  }

  if (val !== 12) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "should be twelve",
    });
  }
});
```

**유형 세분화**
`refine()` 또는 `.superRefine()`에 유형 술어(type predicate)를 제공하면 결과 유형이 술어의 유형으로 좁혀집니다. 이 기능은 여러 개의 연쇄적인 세분화와 변환을 혼합하는 경우에 유용합니다:

```ts
const schema = z
  .object({
    first: z.string(),
    second: z.number(),
  })
  .nullable()
  .superRefine((arg, ctx): arg is { first: string; second: number } => {
    if (!arg) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom, // customize your issue
        message: "object should exist",
      });
    }

    return z.NEVER; // The return value is not used, but we need to return something to satisfy the typing
  })
  // here, TS knows that arg is not null
  .refine((arg) => arg.first === "bob", "`first` is not `bob`!");
  ```

⚠️ 유효성 검사 통과 여부를 표시하려면 불리언 값을 반환하는 대신 `ctx.addIssue()`를 사용해야 합니다. 함수를 실행하는 동안 `ctx.addIssue`가 호출되지 않으면 유효성 검사는 통과합니다.

`🎃notice`
> [타입스크립트의 type narrowing과 type predicates](https://velog.io/@devshk447/TIL-typescript-type-guard%EC%99%80-type-predicates)


## .transform
구문 분석 후 데이터를 변환하려면 `transform`메서드를 사용합니다.

```ts
const stringToNumber = z.string().transform((val) => val.length);

stringToNumber.parse("string"); // => 6
```

**연결 순서**
위의 stringToNumber는 `ZodEffects` 서브클래스의 인스턴스입니다. `ZodString`의 인스턴스가 아닙니다. `ZodString`의 내장 메서드(예: .email())를 사용하려면 **변환 전에** 해당 메서드를 적용해야 합니다.

```ts
const emailToDomain = z
  .string()
  .email()
  .transform((val) => val.split("@")[1]);

emailToDomain.parse("colinhacks@example.com"); // => example.com
```

**변환 중 유효성 검사**
`.transform` 메서드는 값의 유효성 검사와 변환을 동시에 수행할 수 있습니다. 이는 종종 변환(transform)과 세분화(refine)를 연쇄적으로 사용하는 것보다 더 간단하고 중복이 적습니다.

`.superRefine`과 마찬가지로 `transform` 함수는 유효성 검사 이슈를 등록하는 데 사용할 수 있는 `addIssue` 메서드가 있는 ctx 객체를 받습니다.

```ts
const numberInString = z.string().transform((val, ctx) => {
  const parsed = parseInt(val);
  if (isNaN(parsed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Not a number",
    });

    // This is a special symbol you can use to
    // return early from the transform function.
    // It has type `never` so it does not affect the
    // inferred return type.
    return z.NEVER;
  }
  return parsed;
});
```

**세분화에 대한 관계**
변환과 세분화는 인터리브될 수 있습니다. 선언된 순서대로 실행됩니다.

> 인터리브(interleaved) : 교차해서,계속적으로 수행가능

```ts
const nameToGreeting = z
  .string()
  .transform((val) => val.toUpperCase())
  .refine((val) => val.length > 15)
  .transform((val) => `Hello ${val}`)
  .refine((val) => val.indexOf("!") === -1);
```

**비동기 변환(Async transforms)**
비동기 변환도 가능합니다.

```ts
const IdToUser = z
  .string()
  .uuid()
  .transform(async (id) => {
    return await getUserById(id);
  });
```
⚠️ 스키마에 비동기 변환이 포함된 경우 `.parseAsync()` 또는 `.safeParseAsync()`를 사용하여 데이터를 구문 분석해야 합니다. 그렇지 않으면 Zod에서 오류가 발생합니다.

## .default
트랜스폼을 사용하여 Zod에서 '기본값'이라는 개념을 구현할 수 있습니다.

```ts
const stringWithDefault = z.string().default("tuna");

stringWithDefault.parse(undefined); // => "tuna"
```

선택적으로 기본값을 생성해야 할 때마다 다시 실행되는 함수를 `.default`에 전달할 수 있습니다:

```ts
const numberWithRandomDefault = z.number().default(Math.random);

numberWithRandomDefault.parse(undefined); // => 0.4413456736055323
numberWithRandomDefault.parse(undefined); // => 0.1871840107401901
numberWithRandomDefault.parse(undefined); // => 0.7223408162401552
```

개념적으로 Zod가 기본값을 처리하는 방법은 다음과 같습니다.

1. 입력이 `undefined`이면 기본값이 반환됩니다.
2. 그렇지 않으면 기본 스키마를 사용하여 데이터가 구문 분석됩니다.

## .describe
`.describe()`를 사용하여 결과 스키마에 설명 속성을 추가합니다.

```ts
const documentedString = z
  .string()
  .describe("A useful bit of text, if you know what to do with it.");
documentedString.description; // A useful bit of text…
```
이는 예를 들어 `zod-to-json-schema`와 같은 라이브러리를 사용하여 JSON 스키마에서 필드를 문서화하는 데 유용할 수 있습니다.

## .catch
.catch()를 사용하여 구문 분석 오류 발생 시 반환할 "catch 값"을 제공하세요.

```ts
const numberWithCatch = z.number().catch(42);

numberWithCatch.parse(5); // => 5
numberWithCatch.parse("tuna"); // => 42
```

선택적으로 기본값을 생성해야 할 때마다 다시 실행되는 함수를 `.catch`에 전달할 수 있습니다. 이 함수에는 캐치된 오류가 포함된 ctx 객체가 전달됩니다.

```ts
const numberWithRandomCatch = z.number().catch((ctx) => {
  ctx.error; // the caught ZodError
  return Math.random();
});

numberWithRandomCatch.parse("sup"); // => 0.4413456736055323
numberWithRandomCatch.parse("sup"); // => 0.1871840107401901
numberWithRandomCatch.parse("sup"); // => 0.7223408162401552
```

개념적으로 Zod가 "catch value"를 처리하는 방법은 다음과 같습니다.

1. 데이터는 기본 스키마를 사용하여 구문 분석됩니다.
2. 구문 분석에 실패하면 "catch value"가 반환됩니다.

## .optional
스키마의 선택적 버전을 반환하는 편의 메서드입니다.

```ts
const optionalString = z.string().optional(); // string | undefined

// equivalent to
z.optional(z.string());
```

## .nullable
스키마의 null 허용 버전을 반환하는 편의 메서드입니다.

```ts
const nullableString = z.string().nullable(); // string | null

// equivalent to
z.nullable(z.string());
```

## .nullish
스키마의 "null" 버전을 반환하는 편의 메서드입니다. `Nullish` 스키마는 정의되지 않은 스키마와 null을 모두 허용합니다. TypeScript 3.7 릴리스 노트에서 "nullish"의 개념에 대해 자세히 알아보세요.

```ts
const nullishString = z.string().nullish(); // string | null | undefined

// equivalent to
z.string().nullable().optional();
```

## .array
지정된 유형에 대한 배열 스키마를 반환하는 편의 메서드입니다.

```ts
const stringArray = z.string().array(); // string[]

// equivalent to
z.array(z.string());
```

## .promise
Promise 유형에 대한 편의 메서드입니다.

```ts
const stringPromise = z.string().promise(); // Promise<string>

// equivalent to
z.promise(z.string());
```

## .or
**유니언 타입**에 대한 편의 메서드입니다.

```ts
const stringOrNumber = z.string().or(z.number()); // string | number

// equivalent to
z.union([z.string(), z.number()]);
```

## .and
교차 유형을 생성하는 편의 메서드입니다.

```ts
const nameAndAge = z
  .object({ name: z.string() })
  .and(z.object({ age: z.number() })); // { name: string } & { age: number }

// equivalent to
z.intersection(z.object({ name: z.string() }), z.object({ age: z.number() }));
```
## .brand
`.brand<T>() => ZodBranded<this, B>`

TypeScript의 타입 시스템은 구조적이어서 구조적으로 동일한 두 타입은 모두 동일한 것으로 간주합니다.

```ts
type Cat = { name: string };
type Dog = { name: string };

const petCat = (cat: Cat) => {};
const fido: Dog = { name: "fido" };
petCat(fido); // works fine
```
`🎃notice`
[[Typescript] 덕 타이핑, 구조적 타이핑, 명목적 타이핑
](https://velog.io/@jasmine0714/%EB%8D%95%ED%83%80%EC%9D%B4%ED%95%91vs%EA%B5%AC%EC%A1%B0%EC%A0%81%ED%83%80%EC%9D%B4%ED%95%91)

어떤 경우에는 타입스크립트 내에서 명목적 타이핑을 시뮬레이션하는 것이 바람직할 수 있습니다. 예를 들어 Zod에서 유효성이 검사된 입력만 받아들이는 함수를 작성하고 싶을 수 있습니다. 이는 브랜드 타입(일명 불투명 타입)으로 구현할 수 있습니다.

```ts
const Cat = z.object({ name: z.string() }).brand<"Cat">();
type Cat = z.infer<typeof Cat>;

const petCat = (cat: Cat) => {};

// this works
const simba = Cat.parse({ name: "simba" });
petCat(simba);

// this doesn't
petCat({ name: "fido" });
```

내부적으로는 교차 유형을 사용하여 추론된 유형에 '브랜드'를 붙이는 방식으로 작동합니다. 이렇게 하면 일반/브랜드가 없는 데이터 구조는 더 이상 추론된 스키마 유형에 할당할 수 없습니다.

```ts
const Cat = z.object({ name: z.string() }).brand<"Cat">();
type Cat = z.infer<typeof Cat>;
// {name: string} & {[symbol]: "Cat"}
```

브랜디드 유형은 .parse의 런타임 결과에 영향을 주지 않습니다. 정적 전용(static-only) 구조입니다.

## .readonly
`.readonly() => ZodReadonly<this>`

이 메서드는 기본 스키마를 사용하여 입력을 구문 분석한 다음 결과에 대해 `Object.freeze()`를 호출하는 `ZodReadOnly` 스키마 인스턴스를 반환합니다. 추론된 유형도 읽기 전용(readonly)으로 표시됩니다.

```ts
const schema = z.object({ name: string }).readonly();
type schema = z.infer<typeof schema>;
// Readonly<{name: string}>

const result = schema.parse({ name: "fido" });
result.name = "simba"; // error
```

추론된 유형은 관련성이 있는 경우 TypeScript의 빌트인 readonly 유형을 사용합니다.

```ts
z.array(z.string()).readonly();
// readonly string[]

z.tuple([z.string(), z.number()]).readonly();
// readonly [string, number]

z.map(z.string(), z.date()).readonly();
// ReadonlyMap<string, Date>

z.set(z.string()).readonly();
// ReadonlySet<Promise<string>>
```

## .pipe
스키마를 유효성 검사 "파이프라인"으로 연결할 수 있습니다. `.transform()` 이후의 결과를 쉽게 유효성 검사할 때 유용합니다:

```ts
z.string()
  .transform((val) => val.length)
  .pipe(z.number().min(5));
```

이 `.pipe()`메서드는 `ZodPipeline`인스턴스를 반환합니다.

## .pipe()를 사용하여 z.coerce의 일반적인 문제를 해결할 수 있습니다.
선택한 강제(coercion) 유형으로 원활히 동작하게 입력을 제한할 수 있습니다. 그런 다음 `.pipe()`를 사용하여 강제 형변환(coercion)를 적용합니다.

입력 제약 없는 경우:
```ts
const toDate = z.coerce.date();

// works intuitively
console.log(toDate.safeParse("2023-01-01").success); // true

// might not be what you want
console.log(toDate.safeParse(null).success); // true
```

제한된 입력의 경우:
```ts
const datelike = z.union([z.number(), z.string(), z.date()]);
const datelikeToDate = datelike.pipe(z.coerce.date());

// still works intuitively
console.log(datelikeToDate.safeParse("2023-01-01").success); // true

// more likely what you want
console.log(datelikeToDate.safeParse(null).success); // false
```

이 기술을 사용하여 잡히지 않은 오류를 발생시키는 강제(coercion)를 피할 수도 있습니다.

입력 제약 없는 경우:

```ts
const toBigInt = z.coerce.bigint();

// works intuitively
console.log(toBigInt.safeParse("42")); // true

// probably not what you want
console.log(toBigInt.safeParse(null)); // throws uncaught error
```

제한된 입력의 경우:

```ts
const toNumber = z.number().or(z.string()).pipe(z.coerce.number());
const toBigInt = z.bigint().or(toNumber).pipe(z.coerce.bigint());

// still works intuitively
console.log(toBigInt.safeParse("42").success); // true

// error handled by zod, more likely what you want
console.log(toBigInt.safeParse(null).success); // false
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