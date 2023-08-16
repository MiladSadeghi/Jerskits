import * as yup from "yup";

const editProfileSchema = yup.object().shape({
	firstName: yup
		.string()
		.test("min", "Too Short!", (val) => !val || val.length >= 3)
		.test("max", "Too Long!", (val) => !val || val.length <= 15)
		.nullable()
		.defined(),
	lastName: yup
		.string()
		.test("min", "Too Short!", (val) => !val || val.length >= 3)
		.test("max", "Too Long!", (val) => !val || val.length <= 15)
		.nullable()
		.defined(),
	avatar: yup
		.mixed()
		.nullable()
		.default(null)
		.test("fileSize", "File Size is too large", (value) => {
			if (!value || typeof value === "string") {
				return true;
			}
			console.log(value);
			return (value as File).size <= 1000000;
		})
		.test("fileFormat", "Invalid file format", (value) => {
			if (!value || typeof value === "string") {
				return true;
			}
			const validTypes = ["image/png", "image/jpeg", "image/jpg"];
			return validTypes.includes((value as File).type);
		}),

	contactEmail: yup.string().email("Invalid email").nullable().defined(),

	phoneNumber: yup
		.string()
		.test(
			"phone",
			"Phone number is not valid!",
			(val) => !val || /^(\+\d{1,3}[- ]?)?\d{10}$/.test(val)
		)
		.nullable()
		.defined(),
	saveAddress: yup.boolean().default(false),
	shippingAddress: yup
		.object()
		.shape({
			address: yup.string().default(""),
			country: yup.string().default(""),
			state: yup.string().default(""),
			city: yup.string().default(""),
			postalCode: yup.number().default(null),
		})
		.when("saveAddress", {
			is: true,
			then: () =>
				yup.object().shape({
					address: yup.string().required("required"),
					country: yup.string().required("required"),
					state: yup.string().notRequired(),
					city: yup.string().notRequired(),
					postalCode: yup.number().required("required"),
				}),
			otherwise: () => yup.object().strip(),
		}),
});

export default editProfileSchema;
