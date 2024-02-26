import { boolean, z } from "zod";

const User = z.object({
  username: z.string(),
});

User.parse({ username: "Ludwig" });

// extract the inferred type
type User = z.infer<typeof User>;
// { username: string }


const test = z.object({
  props1 : z.string(),
  props2 : z.number()
})

const test2 = test.nullable()
type inferredType = z.infer<typeof test2>

const testEnum = z.enum(['test1','test2','test3'])
console.log("🚀 ~ test3.enum:", testEnum.enum.test1)
console.log("🚀 ~ test3.enum:", typeof testEnum.enum.test1)

// const stringOrNumberOrBoolean = z.union([z.string(),z.number(),z.boolean()])
const stringOrNumberOrBoolean = z.string().or(z.number()).or(z.boolean())


const testArray = ['string',1,true]
// const testArray = ['string',1,null] //Throw error
for (let index = 0; index < testArray.length; index++) {
console.log("🚀 ~ stringOrNumberOrBoolean:", stringOrNumberOrBoolean.parse(testArray[index]))
}
const myUnion = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), data: z.string() }),
  z.object({ status: z.literal("failed"), error: z.instanceof(Error) }),
]);

const testObj = { status: "failed", data: "yippie ki yay" };
myUnion.parse(testObj);
console.log("🚀 ~ myUnion.parse(testObj):", myUnion.parse(testObj))
