interface Condition {
	(x: string): boolean;
}

function RequiredFieldMessage(name: string) {
	return `${name} is a mandatory field`;
}
export class RequiredInputValid {
	private nameOfInput: string;
	private inputValue: string;
	private isValid: boolean = true;
	private message: string = "";

	constructor(inputValue: string, nameOfInput: string) {
		this.inputValue = inputValue;
		this.nameOfInput = nameOfInput;
	}
	Because(condition: Condition, message: string): RequiredInputValid {
		if (this.isValid == false) {
			return this; // because if one is false then the whole input is invalid
		}
		if (this.inputValue == undefined) {
			this.isValid = false;
			this.message = RequiredFieldMessage(this.nameOfInput);
			return this;
		}
		if (!condition(this.inputValue)) {
			this.isValid = false;
			this.message = `${this.nameOfInput} ${message}`;
		}
		return this;
	}
	Check(): IsValid {
		return {
			isValid: this.isValid,
			message: this.message,
		};
	}
}

export type IsValid = {
	isValid: boolean;
	message: string;
};
export type NewLoginRequestValidation = {
	name: IsValid;
	url: IsValid;
	username: IsValid;
	password: IsValid;
	notes: IsValid
};

export type AccountLoginValidation = {
	username: IsValid;
	email: IsValid;
	password: IsValid;
};

export type AccountRegisterValidation = {
	username: IsValid;
	email: IsValid;
	password: IsValid;
	validationPassword: IsValid;
};
