
import { Annonce } from '../model/annonce.type';
import { SharedService } from '../service/shared.service';
export function getIpAddressDeco() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any) {
      /* const _this = this as { sharedService: SharedService };
      if (!_this.sharedService) {
        console.error('SharedService is not injected into the class');
        return;
      }
      _this.sharedService.ipAddressAction() */
      SharedService.ipAddressAction()
      return originalMethod.apply(this, args);
    };
  };
}

export function trackAnnonceDeco() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any) {
     
      console.log(...args)
      
     
      return originalMethod.apply(this, args);
    };
  };
}


export function traceDeco() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any) {
     
      if ('data' in this) {
        const values=this as TypeData
        const {id,agence_id}=values.data
        SharedService.updateCounterAction(id,agence_id)
      } 
     
      return originalMethod.apply(this, args);
    };
  };
}

interface TypeData {
  data: {
    id: number; // Adjust the type as necessary
    agence_id: number; // Adjust the type as necessary
  };
}