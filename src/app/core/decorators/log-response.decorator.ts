export function logResponse(methodName?: string) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    console.log(` ===> Début execution de la méthode ${methodName}`);
    descriptor.value = async function (...args: any) {
      let start = window.performance.now();
      originalMethod.apply(this, args);
      let end = window.performance.now();
      console.log(` <=== Fin execution de la méthode ${methodName} : ${end - start} ms`);
    }
  }
}
