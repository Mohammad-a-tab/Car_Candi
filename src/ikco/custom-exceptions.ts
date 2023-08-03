import { BadRequestException } from '@nestjs/common';

export class IkcoNotFoundException extends BadRequestException {
  constructor(message: string) {
    super(`Ikco not found: ${message}`);
  }
}

export class InvalidFieldNameException extends BadRequestException {
  constructor() {
    super('Invalid fieldName');
  }
}

export class CreateIkcoFailedException extends BadRequestException {
    constructor(message: string) {
      super(`Failed to create Ikco: ${message}`);
    }
}
export class UpdateFailedException extends BadRequestException {
  constructor() {
    super('Update Failed');
  }
}
