import { z } from "zod";

export const functions = ()=> {

  // const myFunction = z.function();

  // type myFunction = z.infer<typeof myFunction>;
  // // => ()=>unknown

  const myFunction = z
  .function()
  .args(z.string(), z.number()) // accepts an arbitrary number of arguments
  .returns(z.boolean());

type myFunction = z.infer<typeof myFunction>;
// => (arg0: string, arg1: number)=>boolean

try {
  const test = myFunction.parse(()=>{})
  console.log("🚀 ~ functions ~ test:", test)
} catch (error) {
  console.log("🚀 ~ functions ~ error:", error)
}
}
