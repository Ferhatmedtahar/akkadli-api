/*
https://refine.dev/blog/typescript-decorators/#introduction
https://www.typescriptlang.org/docs/handbook/decorators.html

!What are TypeScript Decorators?

*Think of decorators like special stickers
 you can attach to your classes or functions 
 decorators allow you to add extra features or behavior without changing their code directly.
 

*A decorator is a special kind of declaration 
attached to a class, method, property, or parameter.
 It’s essentially a function that allows you to :
 add metadata, modify behavior, or replace the target it’s applied to.


!Types of Decorators
Class Decorators - Applied to classes.
Method Decorators - Applied to class methods.
Property Decorators - Applied to class properties.
Parameter Decorators - Applied to a method's parameters.


!Key Takeaways
Decorators = Metadata: Think of decorators as a way to attach metadata to code.
Execution Order: Decorators are executed when the class or method is defined, not when the application is running.
Customizability: NestJS provides built-in decorators but allows creating custom ones for specialized tasks.
Simplifies Development: Decorators in NestJS eliminate boilerplate code by leveraging dependency injection and modularity.

 */

function MyDecorator(target: any) {
  console.log("Target:", target); // This is the class or method being decorated
}

function Func(target: Function) {
  console.log("function", target);
}
@MyDecorator
class Test {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  @Func
  public hiName() {
    console.log(` hi ${this.name}`);
  }
}

const test = new Test("ferhat");
test.hiName();
