
import { SharedService } from '../service/shared.service';
export function getIpAddressDeco() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any) {
      const _this = this as { sharedService: SharedService };
      if (!_this.sharedService) {
        console.error('SharedService is not injected into the class');
        return;
      }
      _this.sharedService.ipAddressAction()
      return originalMethod.apply(this, args);
    };
  };
}
